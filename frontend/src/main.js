import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router) // Use the router for navigation
app.use(ElementPlus)

app.mount('#app')   // Mount the Vue app to the DOM
