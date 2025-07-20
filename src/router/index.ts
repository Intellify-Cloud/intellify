import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useAlertStore } from '@/stores/alert'
import { i18n } from '@/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/contact-us',
      name: 'contact-us',
      component: () => import('../views/ContactUs.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/IntellifyHome.vue'),
    },
    {
      path: '/portfolio-websites',
      name: 'portfolio-websites',
      component: () => import('../views/PortfolioWebsites.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicy.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const sessionStore = useSessionStore()

  if (window.location.pathname === '/oauth') {
    return
  }

  try {
    await sessionStore.initialize()
  } catch {
    if (!window.location.pathname.startsWith('/sign-in')) {
      router.push({ path: '/sign-in' })
    }
  }

  if (
    to.fullPath === '/' ||
    to.fullPath === '' ||
    to.fullPath === '/dashboard' ||
    to.fullPath === '/home'
  ) {
    const path = sessionStore.isAuthenticated ? '/dashboard' : '/home'

    if (path !== to.fullPath) {
      router.push({ path: path })
      return true
    }
  }

  if (!!to.meta.permission && !sessionStore.hasPermission(to.meta.permission as string)) {
    useAlertStore().add({
      message: i18n.global.t('exceptions.insufficient-permission'),
      type: 'info',
      name: 'insufficient-permission',
    })

    return false
  }

  if (!!to.meta.authenticated && !sessionStore.isAuthenticated && to.name !== 'signin') {
    return { name: 'signin' }
  }
})

export default router
