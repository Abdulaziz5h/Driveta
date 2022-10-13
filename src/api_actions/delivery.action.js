import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "Delivery/";
export const getDeliveriesByUserId = (payload, cb) => {
  api.get(formatApiEndPoint(END_POINT, "GetAllById", payload), cb);
};
export const getDeliveriesById = (id, cb) => {
  api.get(formatApiEndPoint(END_POINT, "GetById", { id }), cb);
};
export const getDriverCurrentDelivery = (id, cb) => {
  api.get(formatApiEndPoint(END_POINT, "getDriverCurrentDelivery", { id }), cb);
};
