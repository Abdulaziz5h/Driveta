import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "category/";
export const getAll = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getAll"), cb);
};
export const getById = (parentId, cb) => {
  return api.get(formatApiEndPoint(END_POINT, "GetLevel", { parentId }), cb);
};
export const getTree = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getTree"), cb);
};
export const getTreePaths = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getTreePaths"), cb);
};
export const getTreePathsV2 = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getTreePathsV2"), cb);
};
export const add = (payload, cb) => {
  return api.post(formatApiEndPoint(END_POINT, "add"), payload, cb);
};
export const modify = (payload, cb) => {
  return api.put(formatApiEndPoint(END_POINT, "modify"), payload, cb);
};
export const move = (payload, cb) => {
  return api.put(formatApiEndPoint(END_POINT, "move"), payload, cb);
};
export const remove = (id, cb) => {
  return api.delete(formatApiEndPoint(END_POINT, "remove", { id }), cb);
};
export const getCategorySelect = (cb) => {
  return api.get(formatApiEndPoint(END_POINT, "getCategorySelect"), cb);
};
