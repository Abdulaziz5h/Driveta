export default {
  // Endpoints
  loginEndpoint: "Account/Login",
  refreshEndpoint: "Account/RefreshToken",

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "AccessToken",
  storageRefreshTokenKeyName: "RefreshToken",
  storageUserDataKeyName: "UserDate"
};

export const userRoleAttrName =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
export const userNameAttrName =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
export const userIdAttrName =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
