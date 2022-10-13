import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "notification/";
export const getAll = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "getAll"), cb);
};
export const GetByUserId = (userId, cb) => {
  api.get(formatApiEndPoint(END_POINT, "getByUserId", { userId }), cb);
};
export const add = (payload, cb) => {
  api.post(formatApiEndPoint(END_POINT, "add"), payload, cb);
};
export const remove = (id, cb) => {
  api.delete(formatApiEndPoint(END_POINT, "remove", { id }), cb);
};
export const removeRange = (payload, cb) => {
  return api.delete(
    formatApiEndPoint(END_POINT, "removeRange"),
    cb,
    undefined,
    payload
  );
};
export const read = (notificationId, userId, cb) => {
  api.put(
    formatApiEndPoint(END_POINT, "read", { notificationId, userId }),
    undefined,
    cb
  );
};
