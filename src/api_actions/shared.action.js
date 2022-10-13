import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "shared/";
export const getAll = (enumName, cb) => {
  api.get(formatApiEndPoint(END_POINT, "getEnumSelect", { enumName }), cb);
};
