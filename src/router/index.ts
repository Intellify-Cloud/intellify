import { createRouter, createWebHistory } from "vue-router";
import { useSeoHead } from "@/composables/useSeoHead";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/AppHome.vue"),
      meta: {
        title: "Home",
        description:
          "Managed website subscriptions for South African businesses that want a professional online presence without upfront build costs.",
      },
    },
    // {
    //   path: '/portfolio/',
    //   component: () => import('@/views/PortfolioView.vue'),
    //   meta: {
    //     title: 'Portfolio',
    //     description: 'Take a look at some of the beautiful, high-performing websites we've built for our clients.',
    //   },
    // },
    // {
    //   path: '/contact/',
    //   component: () => import('@/views/ContactView.vue'),
    //   meta: {
    //     title: 'Contact',
    //     description: 'Have a question or ready to get started? Send us a message and we'll get back to you.',
    //   },
    // },
    // {
    //   path: '/privacy-policy/',
    //   component: () => import('@/views/PrivacyView.vue'),
    //   meta: {
    //     title: 'Privacy Policy',
    //     description: 'This Privacy Policy describes how your personal information is collected, used, and shared when you visit Intellify.',
    //   },
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: "smooth" };
  },
});

router.afterEach((to) => {
  useSeoHead({
    title: to.meta.title as string,
    description: to.meta.description as string,
    path: to.path,
  });
});

export default router;
