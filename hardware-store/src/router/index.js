
import CpuDetails from "@/views/CpuDetails.vue";
import CpuPage from "@/views/CpuPage.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
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

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
