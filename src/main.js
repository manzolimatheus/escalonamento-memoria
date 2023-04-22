import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import { pt } from '@formkit/i18n'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(
  plugin,
  defaultConfig({
    locales: { pt },
    locale: 'pt',
    config: {
      classes: {
        help: 'text-sm text-gray-500 dark:text-gray-400',
        outer: 'mb-4',
        message: 'text-sm text-red-500 dark:text-red-400',
      }
    }
  })
)

app.mount('#app')
