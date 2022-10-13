import { getDeliveriesByUserId, getDeliveriesById, getDriverCurrentDelivery } from "@actions/delivery.action";

const initState = () => ({
  deliveries: {
    accept: [],
    arriveToUser: [],
    endTrip: [],
    startTrip: [],
    waiting: []
  },
  deliveryStatue: {
    0: 'إنتظار',
    1: 'قبول',
    2: 'وصول للمستخدم',
    3: 'توصيلات حالية',
    4: 'توصيلات منتهية'
  },
  deliveryType: {
    0: 'شخص',
    1: 'بضائع'
  },
  deliveryStatueEn: {
    0: 'waiting',
    1: 'accept',
    2: 'arrive To User',
    3: 'start Trip',
    4: 'end Trip'
  }
});
export default {
  state: initState(),
  mutations: {
    Get_Deliveries_By_UserId(state, data) {
      Object.assign(state.deliveries, data);
    }
  },
  actions: {
    getDeliveriesByUserId({ commit }, payload) {
      commit('Set_Main_Loading', true)
      getDeliveriesByUserId({
        id: payload.id,
        type: payload.type
      }, ({ data }) => {
        commit('Get_Deliveries_By_UserId', data)
        commit('Set_Main_Loading', false)
      })
    },
    getDeliveriesById({ commit }, payload) {
      commit('Set_Main_Loading', true)
      getDeliveriesById(payload.id, payload.callback)
    },
    getDriverCurrentDelivery(ctx, payload) {
      getDriverCurrentDelivery(payload.id, payload.callback)
    },
  },
};
