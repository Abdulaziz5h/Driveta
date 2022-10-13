import { Admin, Customer, Driver, Owner, Store } from "..";
import { nullGuid } from "@core/util/global/index.js";
import accounts from "./accounts";
import accounting from "./accounting";
import settings from "./settings";
export default [
  {
    path: "",
    redirect: "/admin/home",
  },
  {
    path: "home",
    name: "admin home",
    component: () => import("@/views/admin/home"),
    meta: () => ({
      roles: [Admin, Owner, Driver, Store],
      layout: "vertical",
      breadcrumb: [
        {
          text: "home",
          active: true,
        },
      ],
    }),
  },
  {
    path: "products",
    name: "admin products",
    components: {
      default: () => import("@/views/admin/products"),
      action: () => import("@/views/admin/products/components/action"),
    },
    meta: () => ({
      roles: [Store],
      layout: "vertical",
      breadcrumb: [
        {
          text: "products",
          active: true,
        },
      ],
    }),
  },
  {
    path: "products/:id",
    name: "admin product details",
    component: () => import("@/views/admin/products/pages/form"),
    props: true,
    meta: (route) => {
      if (route.params && route.params.id == nullGuid) {
        return {
          roles: [Store],
          layout: "vertical",
          breadcrumb: [
            {
              text: "products",
              to: "/admin/products",
              active: false,
            },
            {
              text: "add-products",
              active: true,
            },
          ],
        };
      } else {
        return {
          roles: [Admin, Store],
          layout: "vertical",
          breadcrumb: [
            {
              text: "products",
              to: "/admin/products",
              active: false,
            },
            {
              text: "edit-product",
              active: true,
            },
          ],
        };
      }
    },
  },
  {
    path: "map",
    name: "admin map",
    components: {
      default: () => import("@/views/admin/map"),
      action: () => import("@/views/admin/map/components/actions"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "map",
          active: true,
        },
      ],
    }),
  },
  ...accounting,
  ...accounts,
  {
    path: "vehicles",
    name: "admin vehicles",
    components: {
      default: () => import("@/views/admin/vehicles"),
      action: () => import("@/views/admin/vehicles/components/vehicles-action"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "vehicles",
          active: true,
        },
      ],
    }),
  },
  {
    path: "vehicles/:id",
    name: "admin vehicle details",
    props: true,
    component: () => import("@/views/admin/vehicles/pages/vehicle-form"),
    meta: (route) => {
      if (route.params && route.params.id == nullGuid) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "vehicles",
              active: false,
              to: "/admin/vehicles",
            },
            {
              text: "add-vehicle",
              active: true,
            },
          ],
        };
      } else {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "vehicles",
              active: false,
              to: "/admin/vehicles",
            },
            {
              text: "vehicle-details",
              active: true,
            },
          ],
        };
      }
    },
  },
  {
    path: "deliveries",
    name: "admin deliveries",
    components: {
      default: () => import("@/views/admin/deliveries")
    },
    meta: () => ({
      roles: [Driver],
      layout: "vertical",
      breadcrumb: [
        {
          text: "deliveries",
          active: true,
        },
      ],
    }),
  },
  {
    path: "deliveries/:id",
    name: "admin deliveries details",
    props: true,
    component: () => import("@/views/admin/deliveries/pages/details"),
    meta: () => ({
      roles: [Admin, Customer, Driver],
      layout: "vertical",
      breadcrumb: [
        {
          text: "deliveries",
          active: true
        },
        {
          text: "deliveries-details",
          active: true,
        },
      ],
    })
  },
  {
    path: "advertisements",
    name: "admin advertisements",
    components: {
      default: () => import("@/views/admin/advertisements-offers/index.vue"),
      action: () =>
        import(
          "@/views/admin/advertisements-offers/components/advertisement-activaitor"
        ),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "advertisements",
          active: true,
        },
      ],
    }),
  },
  {
    path: "advertisements/:id",
    name: "admin advertisement details",
    component: () =>
      import("@/views/admin/advertisements-offers/pages/advertisement-form"),
    props: true,
    meta: (route) => {
      if (route.params && route.params.id == nullGuid) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "advertisements",
              to: "/admin/advertisements",
              active: false,
            },
            {
              text: "advertisement-add",
              active: true,
            },
          ],
        };
      } else {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "advertisements",
              to: "/admin/advertisements",
              active: false,
            },
            {
              text: "advertisement-details",
              active: true,
            },
          ],
        };
      }
    },
  },
  {
    path: "notifications",
    name: "admin notifications",
    components: {
      default: () => import("@/views/admin/notifications/index.vue"),
      // action: () =>
      //   import(
      //     "@/views/admin/advertisements-offers/components/advertisement-activaitor"
      //   ),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "notifications",
          active: true,
        },
      ],
    }),
  },
  {
    path: "support",
    name: "admin support",
    components: {
      default: () => import("@/views/admin/support/index.vue"),
      action: () =>
        import(
          "@/views/admin/support/components/action.vue"
        ),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "support",
          active: true,
        },
      ],
    }),
  },

  ...settings,
];
