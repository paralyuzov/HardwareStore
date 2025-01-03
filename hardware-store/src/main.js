import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'


const app = createApp(App)
app.use(router)
app.use(createPinia())
const authStore = useAuthStore();

authStore.initializeSession().finally(() => {
  app.mount("#app");
});


