import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useAlertStore } from '@/stores/alert'
import { i18n } from '@/i18n'
import Home from '../views/IntellifyHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '',
      name: 'home',
      component: Home,
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: () => import('../views/ContactUs.vue'),
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
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignIn.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth', // or 'auto'
        top: 64,
      }
    }

    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  },
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

  if (to.fullPath === '/' || to.fullPath === '' || to.fullPath === '/dashboard') {
    const path = sessionStore.isAuthenticated ? '/dashboard' : '/'

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
