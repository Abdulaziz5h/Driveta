import { GetByUserId, getAll } from "@actions/notification.action";
import { resetState } from "@core/util/global";

const initState = () => ({
  mails: [],
  notifications: [],
});
export default {
  state: initState(),
  mutations: {
    Reset_Notifications(state) {
      resetState(state, initState);
    },
    Get_Notifications(state, data) {
      state.mails = data.allNotifications;
    },
    Get_Notifications_User_By_Id(state, data) {
      state.mails = data.allNotifications;
      state.notifications = data.todayNotifications;
    },
  },
  actions: {
    getNotifications({ commit }, id) {
      commit("Set_Main_Loading", true);
      getAll(id, ({ data }) => {
        commit("Get_Notifications", data);
        commit("Set_Main_Loading", false);
      });
    },
    getNotificationsUserById({ commit }, id) {
      commit("Set_Main_Loading", true);
      GetByUserId(id, ({ data }) => {
        commit("Get_Notifications_User_By_Id", data);
        commit("Set_Main_Loading", false);
      });
    },
  },
};
