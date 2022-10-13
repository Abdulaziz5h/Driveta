import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "CustomerApp/";
export const getDeliveries = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "GetDeliveries"), cb);
};
export const GetVehicleTypes = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "GetVehicleTypes"), cb);
};