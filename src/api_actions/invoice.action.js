import { formatApiEndPoint } from "@core/util/global";
import api from "@api";

const END_POINT = "invoice/";

export const getAllDrivers = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "getAllDrivers"), cb);
};
export const getAllOwners = (cb) => {
  api.get(formatApiEndPoint(END_POINT, "getAllOwners"), cb);
};
export const GetAllCustomersStores = (type, cb) => {
  api.get(formatApiEndPoint(END_POINT, "GetAllCustomersStores", { type }), cb);
};
export const GetDriverOwnerInvoice = (id, cb) => {
  api.post(formatApiEndPoint(END_POINT, "GetDriverOwnerInvoice"), { id }, cb);
};
export const GetCustomerStoreInvoice = (id, cb) => {
  api.post(formatApiEndPoint(END_POINT, "GetCustomerStoreInvoice"), { id }, cb);
};
export const GetLastDriverInvoice = (driverId, cb) => {
  api.get(
    formatApiEndPoint(END_POINT, "GetLastDriverInvoice", { driverId }),
    cb
  );
};
export const GetByIdDriver = (id, cb) => {
  api.get(formatApiEndPoint(END_POINT, "GetByIdDriver", { id }), cb);
};
export const AddDriverOwnerInvoice = (dto, cb) => {
  api.post(formatApiEndPoint(END_POINT, "AddDriverOwnerInvoice"), dto, cb);
};
export const AddCustomerStoreInvoice = (dto, cb) => {
  api.post(formatApiEndPoint(END_POINT, "AddCustomerStoreInvoice"), dto, cb);
};
export const FillDriverOwnerInvoice = (id, type, cb) => {
  api.get(
    formatApiEndPoint(END_POINT, "FillDriverOwnerInvoice", { id, type }),
    cb
  );
};
export const GetDriverOwnerInvoiceById = (id, cb) => {
  api.get(
    formatApiEndPoint(END_POINT, "GetDriverOwnerInvoiceById", { id }),
    cb
  );
};


