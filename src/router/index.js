import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContractView from "../views/Contracts/ViewContract.vue";
import ContractNew from "../views/Contracts/NewContract.vue";
import ContractDetail from "../views/Contracts/DetailContract.vue";
import ContractUpdate from "../views/Contracts/UpdateContract.vue";
import AcceptanceView from "../views/Acceptances/ViewAcceptance.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/contracts",
      name: "contracts",
      component: ContractView,
    },
    {
      path: "/contracts/new",
      name: "new contract",
      component: ContractNew,
    },
    {
      path: "/contracts/:id",
      name: "detail contract",
      component: ContractDetail,
      props: true,
    },
    {
      path: "/contracts/update/:id",
      name: "update contract",
      component: ContractUpdate,
      props: true,
    },
    {
      path: "/acceptances",
      name: "acceptances",
      component: AcceptanceView,
    },
  ],
});

export default router;
