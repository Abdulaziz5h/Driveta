import { Admin, Owner, Driver, Store } from "@/router";
import { currentUserId } from "../../core/util/auth";
export default [
  {
    header: "menu",
    roles: [Admin, Owner, Driver, Store],
  },
  {
    title: "home",
    icon: "view-dashboard",
    to: "/admin/home",
    roles: [Admin, Owner, Driver, Store],
  },
  {
    title: "personal-info",
    icon: "account-question",
    to: "/admin/owners/" + currentUserId(),
    roles: [Owner],
  },
  {
    title: "personal-info",
    icon: "account-question",
    to: "/admin/drivers/" + currentUserId(),
    roles: [Driver],
  },
  {
    title: "personal-info",
    icon: "account-question",
    to: "/admin/stores/" + currentUserId(),
    roles: [Store],
  },
  {
    title: "deliveries",
    icon: "car",
    to: "/admin/deliveries",
    roles: [Driver],
  },
  {
    title: "map",
    icon: "map-marker-outline",
    to: "/admin/map",
    roles: [Admin],
  },
  {
    title: "human-resources",
    icon: "account-group",
    roles: [Admin],
    children: [
      {
        title: "owners",
        icon: "account-cowboy-hat",
        to: "/admin/owners",
        roles: [Admin],
      },
      {
        title: "drivers",
        icon: "doctor",
        to: "/admin/drivers",
        roles: [Admin],
      },
      {
        title: "customers",
        icon: "human-male-female-child",
        to: "/admin/customers",
        roles: [Admin],
      },
    ]
  },
  {
    title: "stores",
    icon: "store",
    to: "/admin/stores",
    roles: [Admin],
  },
  {
    title: "products",
    icon: "package",
    to: "/admin/products",
    roles: [Store],
  },
  {
    title: "vehicles",
    icon: "rv-truck",
    to: "/admin/vehicles",
    roles: [Admin],
  },
  {
    title: "advertisements-offers",
    icon: "monitor-dashboard",
    to: "/admin/advertisements",
    roles: [Admin],
  },
  // {
  //   title: "notifications",
  //   icon: "mailbox",
  //   to: "/admin/notifications",
  //   roles: [Admin],
  // },
  {
    title: "support",
    icon: "headphones",
    to: "/admin/support",
    roles: [Admin],
  },
  {
    header: "accounting",
    roles: [Admin, Owner, Driver],
  },
  {
    title: "drivers-invoices",
    icon: "circle mdi-18px",
    to: "/admin/invoices/drivers",
    roles: [Admin],
  },
  {
    title: "owners-invoices",
    icon: "circle mdi-18px",
    to: "/admin/invoices/owners",
    roles: [Admin],
  },
  {
    title: "invoices",
    icon: "receipt",
    to: "/admin/drivers/" + currentUserId() + "/invoices",
    roles: [Driver],
  },
  {
    title: "invoices",
    icon: "receipt",
    to: "/admin/owners/" + currentUserId() + "/invoices",
    roles: [Owner],
  },
  {
    header: "settings",
    roles: [Admin],
  },
  {
    title: "management",
    icon: "account-tie-outline",
    to: "/admin/management",
    roles: [Admin],
  },
  {
    title: "categories",
    icon: "notification-clear-all",
    to: "/admin/categories",
    roles: [Admin],
  },
  {
    title: "settings",
    icon: "cogs",
    to: "/admin/settings",
    roles: [Admin],
  },
];
