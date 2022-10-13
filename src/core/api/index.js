import axiosIns from "@axios";
import { toast } from "@/libs/vue-toast.js";
import Swal from "sweetalert2";

export default {
  post: (
    path,
    body,
    callback = () => {},
    message = { success: "تم بنجاح", error: "حدث خطأ غير متوقع يرحى المحاولة مجددا", callback: () => {} },
    config = {}
  ) => {
    axiosIns
      .post(path, body, config)
      .then((data) => {
        if (data.status == 200) {
          toast.open({
            message: message.success,
            type: "success",
            duration: 2000,
            dismissible: true,
          });
        }
        callback(data);
      })
      .catch((err) => {
        toast.open({
          message: err.response.data,
          type: "error",
          duration: 2000,
          dismissible: true,
        });
        message.callback(err)
      });
  },
  put: (
    path,
    body,
    callback = () => {},
    message = { success: "تم بنجاح", error: "حدث خطأ غير متوقع يرحى المحاولة مجددا" },
    config = {}
  ) => {
    axiosIns
      .put(path, body, config)
      .then((data) => {
        if (data.status == 200) {
          toast.open({
            message: message.success,
            type: "success",
            duration: 2000,
            dismissible: true,
          });
        }
        callback(data);
      })
      .catch((err) => {
        console.log(err.message);
        toast.open({
          message: err.response.data,
          type: "error",
          duration: 2000,
          dismissible: true,
        });
      });
  },
  get: (
    path,
    callback = () => {},
    message = { error: "خطأ في جلب البيانات" }
  ) => {
    axiosIns
      .get(path)
      .then((data) => {
        callback(data);
      })
      .catch(() => {
        toast.open({
          message: message.error,
          type: "error",
          duration: 2000,
          dismissible: true,
        });
      });
  },
  delete: (
    path,
    callback = () => {},
    message = {
      confirm: "سيتم حذف هذا العنصر هل انت متأكد",
      success: "تم بنجاح", error: "حدث خطأ غير متوقع يرحى المحاولة مجددا"
    },
    body = {},
    header = {}
  ) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "تنبيه!",
        text: message.confirm,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.value) {
          axiosIns
            .delete(path, { header, data: body })
            .then((data) => {
              if (data.status == 200) {
                toast.open({
                  message: message.success,
                  type: "success",
                  duration: 2000,
                  dismissible: true,
                });
              }
              callback(data);
            })
            .catch((err) => {
              toast.open({
                message: err.response.data,
                type: "error",
                duration: 2000,
                dismissible: true,
              });
            });
        }
      });
  },
};
