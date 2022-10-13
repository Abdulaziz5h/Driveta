import jwtDefaultConfig from "./jwtDefaultConfig";
import { currentUserId } from "@core/util/auth";
import router from "@/router";
import store from "@/store";
export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null;

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  // For Refreshing Token
  subscribers = [];

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns;
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      (config) => {
        // Get token from localStorage
        const accessToken = this.getToken();
        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
          config.onUploadProgress = (progressEvent) => {
            let rate = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            store.commit("set_Progress", rate + "%");
            if (rate == 100) {
              setTimeout(() => {
                store.commit("set_Progress", null);
              }, 400);
            }
          };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      (response) => response,
      (error) => {
        // const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;

        // if (status === 401) {
        if (response && response.status === 401) {
          if (this.getRefreshToken()) {
            if (!this.isAlreadyFetchingAccessToken) {
              this.isAlreadyFetchingAccessToken = true;
              this.refreshToken().then((r) => {
                this.isAlreadyFetchingAccessToken = false;

                // Update accessToken in localStorage
                this.setToken(r.data.accessToken);
                this.setRefreshToken(r.data.refreshToken);

                this.onAccessTokenFetched(r.data.accessToken);
              });
            }
            const retryOriginalRequest = new Promise((resolve) => {
              this.addSubscriber((accessToken) => {
                originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
                resolve(this.axiosIns(originalRequest));
              });
            });
            return retryOriginalRequest;
          } else {
            router.replace("/login");
          }
        }
        if (response && response.status === 500) {
          router.push("/server-error");
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setUserData(value) {
    localStorage.setItem(this.jwtConfig.storageUserDataKeyName, value);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args);
  }

  logOut() {
    // Remove userData from localStorage
    // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName);

    // Remove userData from localStorage
    localStorage.removeItem(this.jwtConfig.storageUserDataKeyName);
    localStorage.removeItem('cart');
    window.location = window.location.href;
  }
  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      id: currentUserId(),
      refreshToken: this.getRefreshToken(),
    });
  }
}
