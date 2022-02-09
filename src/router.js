import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/metingen",
    name: "metingen",
    component: () => import("./components/MetingenList")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddMetingen")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;