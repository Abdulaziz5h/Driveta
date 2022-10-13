// import { nullGuid } from "@core/util/global/index.js";
import { Admin } from "@/router";
export default [
  {
    path: "categories",
    name: "admin categories",
    components: {
      default: () => import("@/views/admin/categories"),
      action: () =>
        import("@/views/admin/categories/components/categories-form"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "categories",
          active: true,
        },
      ],
    }),
  },
  {
    path: "settings",
    name: "admin settings",
    components: {
      default: () => import("@/views/admin/settings"),
      action: () => import("@/views/admin/settings/components/search"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "settings",
          active: true,
        },
      ],
    }),
  },
];
