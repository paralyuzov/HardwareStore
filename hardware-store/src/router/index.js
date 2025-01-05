
import CpuDetails from "@/views/CpuDetails.vue";
import CpuPage from "@/views/CpuPage.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import RamDetails from "@/views/RamDetails.vue";
import RamPage from "@/views/RamPage.vue";
import Register from "@/views/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path:"/",
    name:"Home",
    component:Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/catalog/cpu",
    name: "CPU",
    component: CpuPage,
  },
  {
    path: "/catalog/cpu/:id",
    name: "CpuDetails",
    component: CpuDetails,
    props: true,
  },
  {
    path: "/catalog/ram",
    name: "RAM",
    component: RamPage,
  },
  {
    path: "/catalog/ram/:id",
    name: "RamDetails",
    component: RamDetails,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
