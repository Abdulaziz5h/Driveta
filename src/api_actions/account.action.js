import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "account/";
export const login = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "Login"), payload, cb);
};
export const signin = (payload, cb, _catch) => {
  return api.post(formatApiEndPoint(END_POINT, "signin"), payload, cb, {
    success: "مرحبا بعودتكم",
    error: "حاول مجدداً حدث خطأ غير متوقع",
    callback: _catch,
  });
};
export const refreshToken = (payload, cb) => {
  return api.post(
    formatApiEndPoint(END_POINT, "refreshToken"),
    undefined,
    cb,
    undefined,
    { header: payload }
  );
};
export const getAllDashboard = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getAllDashboard"), cb);
};
export const create = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "create"), payload, cb);
};
export const update = (payload, cb) => {
  return api.put(formatApiEndPoint(END_POINT, "update"), payload, cb);
};
export const deleteAccount = (id, cb) => {
  return api.delete(formatApiEndPoint(END_POINT, "delete/" + id), cb);
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
  return api.put(formatApiEndPoint(END_POINT, "block/" + id), cb);
};
export const details = (id, cb) => {
  return api.get(formatApiEndPoint(END_POINT, "details/" + id), cb);
};
