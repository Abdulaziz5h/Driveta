import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "user/";
export const getSupports = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "getSupports"), cb);
};
export const getSupportsById = (payload, cb) => {
  api.get(formatApiEndPoint(END_POINT, "getSupportById", { id: payload.id }), cb);
};
export const getAllUser = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "getAllUser"), cb);
};
export const create = (payload, cb) => {
  api.post(formatApiEndPoint(END_POINT, "create"), payload, cb);
};
export const update = (payload, cb) => {
  api.put(formatApiEndPoint(END_POINT, "update"), payload, cb);
};
export const deleteUser = (id, cb) => {
  api.delete(formatApiEndPoint(END_POINT, "delete", { id }), cb);
};
export const deleteRange = (payload, cb) => {
  return api.delete(
    formatApiEndPoint(END_POINT, "deleteRange"),
    cb,
    undefined,
    payload
  );
};
export const block = (id, cb) => {
  api.put(formatApiEndPoint(END_POINT, "block/" + id), {}, cb);
};
export const active = (id, cb) => {
  api.put(formatApiEndPoint(END_POINT, "active/" + id), {}, cb);
};
export const details = (id, cb) => {
  api.get(formatApiEndPoint(END_POINT, "details/" + id), cb);
};
