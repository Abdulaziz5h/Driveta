import { getAll } from "@actions/product.action";
import { resetState } from "@core/util/global";
import { updateCartEvent } from "@/libs/global-event";
import { GetVehicleTypes } from "../../api_actions/customer-app.action";
const CART_STORAGE_KEY = "cart";
export const defaultCartDto = {
  ids: [],
  // items: {[id: GUID]: quantity: number}
  items: {},
};
const initState = () => ({
  cartProducts: [],
  storeCartItems: defaultCartDto,
  vehicleTypes: []
});
export default {
  state: initState(),
  getters: {
    cartProducts({ storeCartItems, cartProducts }) {
      return cartProducts
        .filter((cp) => storeCartItems.ids.indexOf(cp.id) != -1)
        .map((cp) => {
          return {
            ...cp,
            quantity: storeCartItems.items[cp.id],
            total: storeCartItems.items[cp.id] * cp.price,
          };
        }).reduce((group, product) => {
          const { storeId } = product;
          group[storeId] = group[storeId] ?? [];
          group[storeId].push(product);
          return group;
        }, {});
    },
    cartTotalCost({ storeCartItems, cartProducts }) {
      return cartProducts
        .filter((cp) => storeCartItems.ids.indexOf(cp.id) != -1)
        .map((cp) => {
          return {
            ...cp,
            quantity: storeCartItems.items[cp.id],
            total: storeCartItems.items[cp.id] * cp.price,
          };
        })
        .reduce((c, p) => c + p.total, 0);
    },
  },
  mutations: {
    Reset_Cart(state) {
      resetState(state, initState);
    },
    Get_Cart_Products(state, data) {
      state.cartProducts = data;
    },
    Set_Store_Cart_Items(state, data) {
      state.storeCartItems = data;
    },
    Set_Vechile_Types(state, data) {
      state.vehicleTypes = data
    }
  },
  actions: {
    getCartProducts({ commit }, storeId) {
      commit("Set_Main_Loading", true);
      getAll(storeId, ({ data }) => {
        commit("Get_Cart_Products", data);
        commit("Set_Main_Loading", false);
      });
    },
    getCart({ commit }, cb) {
      if (localStorage.getItem(CART_STORAGE_KEY)) {
        cb(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)));
        commit(
          "Set_Store_Cart_Items",
          JSON.parse(localStorage.getItem(CART_STORAGE_KEY))
        );
      } else {
        cb({ ...defaultCartDto });
        commit("Set_Store_Cart_Items", { ...defaultCartDto });
      }
    },
    // cart: { product: product, q: number }
    setCart({ commit, dispatch }, cart) {
      dispatch("getCart", (data) => {
        if (data.ids.indexOf(cart.product.id) == -1)
          data.ids = [...data.ids, cart.product.id];
        data.items = {
          ...data.items,
          [cart.product.id]: cart.q,
        };
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
        updateCartEvent(data);
        commit("Set_Store_Cart_Items", data);
      });
    },
    removeCartItem({ commit, dispatch }, cart) {
      dispatch("getCart", (data) => {
        if (!cart.q) {
          data.ids.splice(
            data.ids.findIndex((i) => i == cart.product.id),
            1
          );
          delete data.items[cart.product.id];
        } else {
          data.items[cart.product.id] = data.items[cart.product.id] - 1;
        }
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
        updateCartEvent(data);
        commit("Set_Store_Cart_Items", data);
      });
    },
    getVehicleTypes({ commit }) {
      commit("Set_Main_Loading", true);
      GetVehicleTypes(({ data }) => {
        commit("Set_Vechile_Types", data);
        commit("Set_Main_Loading", false);
      })
    }
  },
};
