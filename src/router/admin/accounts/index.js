import { nullGuid } from "@core/util/global/index.js";
import { Admin, Store, Owner, Driver } from "@/router";
export default [
  {
    path: "stores",
    name: "admin stores",
    components: {
      default: () => import("@/views/admin/accounts/stores"),
      action: () =>
        import("@/views/admin/accounts/stores/components/store-action"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "stores",
          active: true,
        },
      ],
    }),
  },
  {
    path: "stores/:id",
    name: "admin store details",
    props: true,
    component: () => import("@/views/admin/accounts/stores/pages/store-form"),
    meta: (route) => {
      if (route.params && route.params.id == nullGuid) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "stores",
              active: false,
              to: "/admin/stores",
            },
            {
              text: "add-store",
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
              text: "stores",
              active: false,
              to: "/admin/stores",
            },
            {
              text: "store-details",
              active: true,
            },
          ],
        };
      }
    },
  },
  {
    path: "owners",
    name: "admin vehicle owners",
    components: {
      default: () => import("@/views/admin/accounts/owners"),
      action: () =>
        import("@/views/admin/accounts/owners/components/owner-action"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "human-resources",
          active: true,
        },
        {
          text: "owners",
          active: true,
        },
      ],
    }),
  },
  {
    path: "owners/:id",
    name: "admin vehicle owners details",
    component: () => import("@/views/admin/accounts/owners/pages/owner-form"),
    props: true,
    meta: (route) => {
      if (route.params && route.params.id == nullGuid) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            },
            {
              text: "owners",
              active: false,
              to: "/admin/owners",
            },
            {
              text: "add-owners",
              active: true,
            },
          ],
        };
      } else {
        return {
          roles: [Admin, Owner],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            },
            {
              text: "owners",
              active: false,
              to: "/admin/owners",
            },
            {
              text: "owner-details",
              active: true,
            },
          ],
        };
      }
    },
  },
  {
    path: "owners/:id/invoices",
    name: "admin vehicle owners invoices details",
    components: {
      default: () => import("@/views/admin/accounts/owners/pages/invoices"),
      action: () => import("@/views/admin/accounting/components/action")
    },
    props: {
      default: true,
      action: true,
    },
    meta: (route) => ({
      roles: [Admin, Owner],
      layout: "vertical",
      breadcrumb: [
        {
          text: "human-resources",
          active: true,
        },
        {
          text: "owners",
          active: false,
          to: "/admin/owners",
        },
        {
          text: "owner",
          active: false,
          to: "/admin/owners/" + route.params.id,
        },
        {
          text: "invoices",
          active: true,
        },
      ],
    })
  },
  {
    path: "owners/:ownerId/invoices/:id",
    name: "admin owners invoice form",
    component: () => import("@/views/admin/accounting/owners/pages/form.vue"),
    props: true,
    meta: (route) => {
      if (route.params && +route.params.id) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            }, {
              text: "owners",
              active: false,
              to: '/admin/owners'
            }, {
              text: "owner",
              active: false,
              to: '/admin/owners/' + route.params.driverId

            }, {
              text: "invoices",
              active: false,
              to: '/admin/owners/' + route.params.driverId + '/invoices'
            },
            {
              text: "details-invoice",
              active: true,
            },
          ],
        }
      } else {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            }, {
              text: "owners",
              active: false,
              to: '/admin/owners'
            }, {
              text: "owner",
              active: false,
              to: '/admin/owners/' + route.params.driverId

            }, {
              text: "invoices",
              active: false,
              to: '/admin/owners/' + route.params.driverId + '/invoices'
            },
            {
              text: "create-invoice",
              active: true,
            },
          ],
        }
      }
    },
  },
  {
    path: "drivers",
    name: "admin drivers",
    components: {
      default: () => import("@/views/admin/accounts/drivers"),
      action: () =>
        import("@/views/admin/accounts/drivers/components/driver-action"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "human-resources",
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
    path: "drivers/:id",
    name: "admin drivers form",
    component: () => import("@/views/admin/accounts/drivers/pages/driver-form"),
    props: true,
    meta: (route) => {
      if (route.params && route.params.id == nullGuid) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            },
            {
              text: "drivers",
              active: false,
              to: "/admin/drivers",
            },
            {
              text: "add drivers",
              active: true,
            },
          ],
        };
      } else {
        return {
          roles: [Admin, Driver],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            },
            {
              text: "drivers",
              active: false,
              to: "/admin/drivers",
            },
            {
              text: "driver details",
              active: true,
            },
          ],
        };
      }
    },
  },
  {
    path: "drivers/:id/invoices",
    name: "admin drivers invoices",
    components: {
      default: () => import("@/views/admin/accounts/drivers/pages/invoices"),
      action: () => import("@/views/admin/accounting/components/action")
    },
    props: {
      default: true,
      action: true,
    },
    meta: (route) => ({
      roles: [Admin, Driver],
      layout: "vertical",
      breadcrumb: [
        {
          text: "human-resources",
          active: true,
        }, {
          text: "drivers",
          active: false,
          to: '/admin/drivers'
        }, {
          text: "driver",
          active: false,
          to: '/admin/drivers/' + route.params.id

        }, {
          text: "invoices",
          active: true,
        },
      ],
    }),
  },
  {
    path: "drivers/:driverId/invoices/:id",
    name: "admin drivers invoice form",
    component: () => import("@/views/admin/accounting/drivers/pages/form.vue"),
    props: true,
    meta: (route) => {
      if (route.params && +route.params.id) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            }, {
              text: "drivers",
              active: false,
              to: '/admin/drivers'
            }, {
              text: "driver",
              active: false,
              to: '/admin/drivers/' + route.params.driverId

            }, {
              text: "invoices",
              active: false,
              to: '/admin/drivers/' + route.params.driverId + '/invoices'
            },
            {
              text: "details-invoice",
              active: true,
            },
          ],
        }
      } else {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            }, {
              text: "drivers",
              active: false,
              to: '/admin/drivers'
            }, {
              text: "driver",
              active: false,
              to: '/admin/drivers/' + route.params.driverId

            }, {
              text: "invoices",
              active: false,
              to: '/admin/drivers/' + route.params.driverId + '/invoices'
            },
            {
              text: "create-invoice",
              active: true,
            },
          ],
        }
      }
    },
  },
  {
    path: "customers",
    name: "admin customers",
    components: {
      default: () => import("@/views/admin/accounts/customers"),
      action: () =>
        import("@/views/admin/accounts/customers/components/customers-action"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "human-resources",
          active: true,
        },
        {
          text: "customers",
          active: true,
        },
      ],
    }),
  },
  {
    path: "customers/:id",
    name: "admin customers form",
    component: () =>
      import("@/views/admin/accounts/customers/pages/customer-form"),
    props: true,
    meta: (route) => {
      if (route.params && route.params.id == nullGuid) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            },
            {
              text: "customers",
              active: false,
              to: "/admin/customers",
            },
            {
              text: "add-customers",
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
              text: "human-resources",
              active: true,
            },
            {
              text: "customers",
              active: false,
              to: "/admin/customers",
            },
            {
              text: "customers-details",
              active: true,
            },
          ],
        };
      }
    },
  },
  {
    path: "management",
    name: "admin management",
    components: {
      default: () => import("@/views/admin/accounts/management"),
      action: () =>
        import(
          "@/views/admin/accounts/management/components/management-action"
        ),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [
        {
          text: "management",
          active: true,
        },
      ],
    }),
  },
  {
    path: "management/:id",
    name: "admin management details",
    component: () => import("@/views/admin/accounts/management/pages/form"),
    props: true,
    meta: (route) => {
      if (route.params && route.params.id == nullGuid) {
        return {
          roles: [Admin],
          layout: "vertical",
          breadcrumb: [
            {
              text: "human-resources",
              active: true,
            },
            {
              text: "management",
              active: false,
              to: "/admin/management",
            },
            {
              text: "add-manager",
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
              text: "human-resources",
              active: true,
            },
            {
              text: "management",
              active: false,
              to: "/admin/management",
            },
            {
              text: "manager-details",
              active: true,
            },
          ],
        };
      }
    }
  },
];
