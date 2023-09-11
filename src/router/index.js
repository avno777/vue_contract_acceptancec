import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContractView from "../views/Contracts/ViewContract.vue";
import ContractNew from "../views/Contracts/NewContract.vue";
import ContractDetail from "../views/Contracts/DetailContract.vue";
import ContractUpdate from "../views/Contracts/UpdateContract.vue";
import AcceptanceView from "../views/Acceptances/ViewAcceptance.vue";
import AcceptanceNew from "../views/Acceptances/NewAcceptance.vue";
import AcceptanceDetail from "../views/Acceptances/DetailAcceptance.vue";
import AcceptanceUpdate from "../views/Acceptances/UpdateAcceptance.vue";
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
    {
      path: "/acceptances/new",
      name: "new acceptance",
      component: AcceptanceNew,
    },
    {
      path: "/acceptances/:id",
      name: "detail acceptance",
      component: AcceptanceDetail,
      props: true,
    },
    {
      path: "/acceptances/update/:id",
      name: "update acceptance",
      component: AcceptanceUpdate,
      props: true,
    },
  ],
});

export default router;
