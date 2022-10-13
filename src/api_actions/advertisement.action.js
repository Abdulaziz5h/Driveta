import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "Advertisement/";
export const getById = (id, cb) => {
  return api.get(formatApiEndPoint(END_POINT, "GetById", { id }), cb);
};
export const addWithFiles = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "AddWithFiles"), payload, cb);
};
export const modifyWithFiles = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "ModifyWithFiles"), payload, cb);
};
export const deleteWithFiles = (id, cb) => {
  return api.delete(
    formatApiEndPoint(END_POINT, "deleteWithFiles", { id }),
    cb
  );
};
export const multiDeleteWithFiles = (payload, cb) => {
  return api.delete(
    formatApiEndPoint(END_POINT, "multiDeleteWithFiles"),
    cb,
    undefined,
    payload
  );
};
export const fetch = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "fetch"), cb);
};
export const add = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "Add"), payload, cb);
};
export const addWithTranslate = (payload, cb) => {
  return api.post(
    formatApiEndPoint(END_POINT, "AddWithTranslate"),
    payload,
    cb
  );
};
export const update = (payload, cb) => {
  return api.put(formatApiEndPoint(END_POINT, "update"), payload, cb);
};
export const modify = (payload, cb) => {
  return api.put(formatApiEndPoint(END_POINT, "modify"), payload, cb);
};
export const deleteAd = (id, cb) => {
  return api.delete(formatApiEndPoint(END_POINT, "delete", { id }), cb);
};
export const addMulti = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "AddMulti"), payload, cb);
};
export const updateMulti = (payload, cb) => {
  return api.put(formatApiEndPoint(END_POINT, "updateMulti"), payload, cb);
};
export const modifyMulti = (payload, cb) => {
  return api.put(formatApiEndPoint(END_POINT, "modifyMulti"), payload, cb);
};
export const deleteMulti = (payload, cb) => {
  return api.delete(
    formatApiEndPoint(END_POINT, "deleteMulti"),
    cb,
    undefined,
    payload
  );
};
