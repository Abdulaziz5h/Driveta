import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "offer/";
export const getAll = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "getAll"), cb);
};
export const getById = (id, cb) => {
  api.get(formatApiEndPoint(END_POINT, "getById", { id }), cb);
};
export const add = (payload, cb) => {
  api.post(formatApiEndPoint(END_POINT, "add"), payload, cb);
};
export const modify = (payload, cb) => {
  api.post(formatApiEndPoint(END_POINT, "modify"), payload, cb);
};
export const stop = (id, cb) => {
  api.post(formatApiEndPoint(END_POINT, "modify", { id }), undefined, cb);
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