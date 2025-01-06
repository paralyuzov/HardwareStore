import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'


const app = createApp(App)
app.use(createPinia());
app.use(router);
const authStore = useAuthStore();

authStore.initializeSession().finally(() => {
  app.mount("#app");
});


