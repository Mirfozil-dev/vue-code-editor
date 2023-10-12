import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App)
app.use(naive)
app.use(pinia)

app.mount('#app')
