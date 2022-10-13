import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "statistics/";
export const getAdminStatistics = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "GetAdminStatistics"), cb);
};
export const getOwnerStatistics = (id, cb) => {
  return api.get(
    formatApiEndPoint(END_POINT, "GetOwnerStatistics", { id }),
    cb
  );
};
export const getDriverStatistics = (id, cb) => {
  return api.get(
    formatApiEndPoint(END_POINT, "GetDriverStatistics", { id }),
    cb
  );
};
export const getCustomerStatistics = (id, cb) => {
  return api.get(
    formatApiEndPoint(END_POINT, "GetCustomerStatistics", { id }),
    cb
  );
};
export const getStoreStatistics = (id, cb) => {
  return api.get(
    formatApiEndPoint(END_POINT, "GetStoreStatistics", { id }),
    cb
  );
};
