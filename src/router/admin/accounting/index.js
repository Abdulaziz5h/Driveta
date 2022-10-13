// import { nullGuid } from "@core/util/global/index.js";
import { Admin } from "@/router";
export default [
  {
    path: "invoices/drivers",
    name: "admin drivers invoices group",
    components: {
      default: () => import("@/views/admin/accounting/drivers"),
      action: () =>
        import("@/views/admin/accounting/components/action"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "invoices",
          active: true,
        },
        {
          text: "drivers",
          active: true,
        },
      ],
    }),
  },
  {
    path: "invoices/owners",
    name: "admin owners invoices group",
    components: {
      default: () => import("@/views/admin/accounting/owners"),
      action: () =>
        import("@/views/admin/accounting/components/action"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "invoices",
          active: true,
        },
        {
          text: "owners",
          active: true,
        },
      ],
    }),
  },
]