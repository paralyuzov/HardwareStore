
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

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
