import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "customer/";
export const getAll = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getAll"), cb);
};
export const getById = (id, cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getById", { id }), cb);
};
export const add = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "add"), payload, cb);
};
export const modify = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "modify"), payload, cb);
};
export const remove = (id, cb) => {
  return api.delete(formatApiEndPoint(END_POINT, "remove", { id }), cb);
};
export const removeRange = (payload, cb) => {
  return api.delete(
    formatApiEndPoint(END_POINT, "removeRange"),
    cb,
    undefined,
    payload
  );
};
