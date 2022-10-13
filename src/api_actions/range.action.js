import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "range/";
export const fetch = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "fetch"), cb);
};
export const getById = (id, cb) => {
  api.get(formatApiEndPoint(END_POINT, "getById", { id }), cb);
};
export const add = (payload, cb) => {
  api.post(formatApiEndPoint(END_POINT, "add"), payload, cb);
};
export const addWithTranslate = (payload, cb) => {
  api.post(formatApiEndPoint(END_POINT, "addWithTranslate"), payload, cb);
};
export const update = (payload, cb) => {
  api.put(formatApiEndPoint(END_POINT, "update"), payload, cb);
};
export const modify = (payload, cb) => {
  api.put(formatApiEndPoint(END_POINT, "modify"), payload, cb);
};
export const deleteRange = (id, cb) => {
  api.delete(formatApiEndPoint(END_POINT, "delete", { id }), cb);
};
export const addMulti = (payload, cb) => {
  api.post(formatApiEndPoint(END_POINT, "addMulti"), payload, cb);
};
export const updateMulti = (payload, cb) => {
  api.put(formatApiEndPoint(END_POINT, "updateMulti"), payload, cb);
};
export const modifyMulti = (payload, cb) => {
  api.put(formatApiEndPoint(END_POINT, "modifyMulti"), payload, cb);
};
export const deleteMultiRange = (payload, cb) => {
  return api.delete(
    formatApiEndPoint(END_POINT, "deleteMulti"),
    cb,
    undefined,
    payload
  );
};