/* eslint-disable prettier/prettier */
export default [
  {
    path: "/admin/dashboard", // route
    name: "dashboard", // name of the views page
    component: () => import("./views/Dashboard.vue"), // directory of vue file path
    meta: {
      type: "protected",
      transitionName: "slide",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/homepage", // route
    name: "homepage", // name of the views page
    component: () => import("../admin/views/Home.vue"), // directory of vue file path
    meta: {
      type: "protected",
      transitionName: "slide",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/account", // route
    name: "Account", // name of the views page
    component: () => import("./views/Account.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/add", // route
    name: "Add account", // name of the views page
    component: () => import("./views/AddAccount.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/edit", // route
    name: "Edit account", // name of the views page
    component: () => import("./views/EditAccount.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/saving", // route
    name: "Saving", // name of the views page
    component: () => import("./views/SavingAndLoans.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/loan", // route
    name: "Loans", // name of the views page
    component: () => import("./views/Loans.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/transaction", // route
    name: "Transaction", // name of the views page
    component: () => import("./views/Transaction.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/home", // route
    name: "Homepage", // name of the views page
    component: () => import("../customer/views/Homepage.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/saving/details", // route
    name: "Saving Details", // name of the views page
    component: () => import("./views/SavingDetails.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/logs/edit", // route
    name: "Transaction Details", // name of the views page
    component: () => import("./views/TransactionDetail.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },

  {
    path: "/admin/loans/details", // route
    name: "Loans Details", // name of the views page
    component: () => import("./views/LoansDetail.vue"), // directory of vue file path
    meta: {
      type: "protected",
      requiresAuth: true,
    },
  },
]
