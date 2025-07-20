<template>
  <v-app>
    <v-layout>
      <i-navbar />
      <v-main ref="main">
        <RouterView />
        <v-btn v-if="showScrollToTop" class="fixed bottom-0 right-0 m-4 z-100" :icon="mdiArrowUp" @click="backToTop()">
        </v-btn>
        <div class="footer">
          <div class="flex flex-row justify-between w-full md:w-2/3 mx-auto">
            <p>Copyright &copy; 2023 Intellify. All rights reserved.</p>
            <router-link to="/privacy-policy" class="text-accent underline hover:text-highlight">Privacy
              Policy</router-link>
          </div>
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { mdiArrowUp } from '@mdi/js';
import { useMessageBus } from './stores/message-bus';

const main = useTemplateRef("main");
let navbar: HTMLElement | null = null;

const showScrollToTop = ref(false)

const backToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 0;

  useMessageBus().on("goto-top", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('navbar-initialized', (payload: unknown) => {
    navbar = payload as HTMLElement;
  });

  useMessageBus().on("scroll-to", (payload?: unknown) => {
    const options = payload as { position?: number, offset?: number };

    if (!options || (!options.position && !options.offset)) {
      return;
    }

    if (options.offset) {
      if (!navbar || !main.value) {
        return
      }

      const containerTop = main.value.$el.getBoundingClientRect().top;
      const scrollOffset = options.offset - containerTop - navbar.getBoundingClientRect().height;
      window.scrollTo({ top: scrollOffset, behavior: 'smooth' })
    }

    if (options.position) {
      window.scrollTo({ top: options.position, behavior: 'smooth' });
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
