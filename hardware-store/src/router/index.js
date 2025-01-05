
import CpuDetails from "@/views/CpuDetails.vue";
import CpuPage from "@/views/CpuPage.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import MotherboardDetails from "@/views/MotherboardDetails.vue";
import MotherboardPage from "@/views/MotherboardPage.vue";
import RamDetails from "@/views/RamDetails.vue";
import RamPage from "@/views/RamPage.vue";
import Register from "@/views/Register.vue";
import SsdDetails from "@/views/SsdDetails.vue";
import SsdPage from "@/views/SsdPage.vue";
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
  {
    path: "/catalog/motherboard",
    name: "Motherboards",
    component: MotherboardPage,
  },
  {
    path: "/catalog/motherboard/:id",
    name: "MotherboardsDetails",
    component: MotherboardDetails,
  },
  {
    path: "/catalog/ssd",
    name: "SSD",
    component: SsdPage,
  },
  {
    path: "/catalog/ssd/:id",
    name: "SsdDetails",
    component: SsdDetails,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
