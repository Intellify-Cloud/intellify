// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import { i18n } from '@/i18n'

// Types
import type { App } from 'vue'

// Components
import IntellifyNavbar from '@/components/IntellifyNavbar.vue'

document.querySelector('html')?.setAttribute('lang', i18n.global.locale.value)

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia).use(i18n)

  app.component('i-navbar', IntellifyNavbar)
}
