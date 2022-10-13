import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "city/";
export const getDetails = (id, cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getDetails", { id }), cb);
};
export const fetch = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "fetch"), cb);
};
export const getById = (id, cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getById", { id }), cb);
};
export const getByFilter = (countryId = "", cb) => {
  return api.get(
    formatApiEndPoint(END_POINT, "getByFilter", {
      countryId: countryId ? countryId : "",
    }),
    cb
  );
};
export const add = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "add"), payload, cb);
};
export const addWithTranslate = (payload, cb) => {
  return api.post(
    formatApiEndPoint(END_POINT, "addWithTranslate"),
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
export const deleteCity = (id, cb) => {
  return api.delete(formatApiEndPoint(END_POINT, "delete", { id }), cb);
};
export const addMulti = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "addMulti"), payload, cb);
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
