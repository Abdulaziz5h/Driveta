import { All, Customer } from "..";

export default [
  {
    path: "",
    component: () => import("@/views/website/pages"),
    children: [
      {
        path: "",
        name: "website home",
        component: () => import("@/views/website/pages/home"),
        meta: () => ({
          title: "dravita",
          roles: [All],
        }),
      },
      {
        path: "about-us",
        name: "website about us",
        component: () => import("@/views/website/pages/about-us"),
        meta: () => ({
          title: "about-us",
          roles: [All],
        }),
      },
      {
        path: "stores",
        name: "website stores",
        component: () => import("@/views/website/pages/stores/index"),
        meta: () => ({
          title: "stores",
          roles: [All],
        }),
      },
      {
        path: "stores/:id",
        name: "website store details",
        props: true,
        component: () =>
          import("@/views/website/pages/stores/store-details.vue"),
        meta: () => ({
          title: "stores details",
          roles: [All],
        }),
      },
      {
        path: "/profile/:id",
        name: "profile",
        props: true,
        component: () => import("@/views/auth/profile.vue"),
        meta: () => ({
          title: "user profile",
          roles: [Customer],
        }),
      },
      {
        path: "/cart",
        name: "user cart",
        component: () => import("@/views/website/pages/stores/cart"),
        meta: () => ({
          title: "user cart",
          roles: [Customer],
        }),
      },
    ],
  },
];
