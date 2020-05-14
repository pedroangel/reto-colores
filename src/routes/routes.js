import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/colores",
    children: [
      {
        path: "colores",
        name: "Colores",
        component: Dashboard
      },
    ]
  }
];

export default routes;
