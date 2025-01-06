import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'

import CpuPage from '@/views/CpuPage.vue'
import CpuDetails from '@/views/CpuDetails.vue'
import RamPage from '@/views/RamPage.vue'
import RamDetails from '@/views/RamDetails.vue'
import MotherboardPage from '@/views/MotherboardPage.vue'
import MotherboardDetails from '@/views/MotherboardDetails.vue'
import SsdPage from '@/views/SsdPage.vue'
import SsdDetails from '@/views/SsdDetails.vue'
import VideoCardPage from '@/views/VideoCardPage.vue'
import VideoCardDetails from '@/views/VideoCardDetails.vue'
import PsuPage from '@/views/PsuPage.vue'
import PsuDetails from '@/views/PsuDetails.vue'
import LaptopPage from '@/views/LaptopPage.vue'
import LaptopDetails from '@/views/LaptopDetails.vue'

import AdminPanel from '@/views/admin/AdminPanel.vue'
import AdminCpuPage from '@/views/admin/AdminCpuPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
  },

  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('@/views/CatalogLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      { path: 'cpu', name: 'CatalogCpu', component: CpuPage },
      { path: 'cpu/:id', name: 'CatalogCpuDetails', component: CpuDetails, props: true },
      { path: 'ram', name: 'CatalogRam', component: RamPage },
      { path: 'ram/:id', name: 'CatalogRamDetails', component: RamDetails, props: true },
      { path: 'motherboard', name: 'CatalogMotherboards', component: MotherboardPage },
      {
        path: 'motherboard/:id',
        name: 'CatalogMotherboardDetails',
        component: MotherboardDetails,
        props: true,
      },
      { path: 'ssd', name: 'CatalogSsd', component: SsdPage },
      { path: 'ssd/:id', name: 'CatalogSsdDetails', component: SsdDetails, props: true },
      { path: 'videocard', name: 'CatalogVideoCards', component: VideoCardPage },
      {
        path: 'videocard/:id',
        name: 'CatalogVideoCardDetails',
        component: VideoCardDetails,
        props: true,
      },
      { path: 'psu', name: 'CatalogPsu', component: PsuPage },
      { path: 'psu/:id', name: 'CatalogPsuDetails', component: PsuDetails, props: true },
      { path: 'laptop', name: 'CatalogLaptops', component: LaptopPage },
      { path: 'laptop/:id', name: 'CatalogLaptopDetails', component: LaptopDetails, props: true },
    ],
  },

  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'cpus',
        name: 'AdminCpuPage',
        component: AdminCpuPage,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.loading) {
    await authStore.initializeSession();
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'Login' });
  }

  if (to.meta.requiresAdmin && (!authStore.isLoggedIn || !authStore.isAdmin)) {
    return next({ name: 'Home' });
  }

  if (to.meta.requiresGuest && authStore.isLoggedIn) {
    return next({ name: 'Home' });
  }

  next();
});

export default router
