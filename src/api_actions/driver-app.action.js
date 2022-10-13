import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "DriverApp/";
export const getDeliveries = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "GetDeliveries"), cb);
};