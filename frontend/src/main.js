import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(router) // Use the router for navigation

app.mount('#app')   // Mount the Vue app to the DOM
