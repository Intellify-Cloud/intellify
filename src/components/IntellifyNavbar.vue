<template>
  <v-app-bar v-if="sessionStore.isAuthenticated" class="flex flex-row items-center h-32 bg-transparent w-2/3 mx-auto"
    flat :extended="!sessionStore.isAuthenticated">
    <div v-if="!$vuetify.display.mobile && !sessionStore.isAuthenticated"
      class="flex flex-row flex-grow items-center justify-end gap-8 relative">
      <v-btn v-for="item in items" :key="item.title" class="rounded-full font-light" @click="navigateTo(item)">
        {{ item.title }}
      </v-btn>
    </div>
    <template v-slot:title>
      <v-app-bar-title class="cursor-pointer"
        @click="$router.push(`${sessionStore.isAuthenticated ? '/dashboard' : '/'}`)">
        <div class="flex flex-col py-32">
          <div class="text-4xl font-bold">intellify</div>
          <div class="text-sm">Go online. Grow online.</div>
        </div>
      </v-app-bar-title>
    </template>
    <template v-slot:prepend v-if="sessionStore.isAuthenticated || $vuetify.display.mobile">
      <v-app-bar-nav-icon variant="text"
        @click.stop="showNavigationDrawer = !showNavigationDrawer"></v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
      <div class="flex flex-row items-center gap-2">
        <v-switch class="mr-2" v-model="isDarkTheme" :false-icon="mdiWhiteBalanceSunny" :true-icon="mdiWeatherNight"
          hide-details />
        <v-btn v-if="!sessionStore.isAuthenticated" :append-icon="mdiLogin" @click.prevent="signIn">{{ $t("sign-in")
        }}</v-btn>
        <v-btn v-else :icon="mdiDotsVertical" variant="text"
          @click.stop="showProfileDrawer = !showProfileDrawer"></v-btn>
      </div>
    </template>
  </v-app-bar>
  <div v-else
    class="flex flex-row items-center w-full h-32 z-50 fixed transition-all duration-500 ease-in-out bg-surface/50 dark:bg-surface--dark/50"
    ref="navbar">
    <v-btn :icon="mdiMenu" @click.stop="showNavigationDrawer = !showNavigationDrawer" class="block md:hidden ml-4"
      flat></v-btn>
    <div class="flex flex-row items-center justify-between md:justify-center w-full md:w-2/3 mx-auto">
      <div class="flex flex-col cursor-pointer text-accent min-w-40 pl-2 md:pl-0" @click="$router.push('/')">
        <div class="text-4xl font-bold">intellify</div>
        <div class="text-sm">Go online. Grow online.</div>
      </div>
      <div class="hidden md:flex md:flex-row md:flex-grow items-center justify-end gap lg:gap-6 relative ">
        <v-btn v-for="item in items" :key="item.title" variant="text" flat class="rounded-full font-light"
          @click="navigateTo(item)">
          {{ item.title }}
        </v-btn>
      </div>
      <div class="flex flex-row items-center justify-end gap-2 mx-2 lg:ml-8 min-w-40">
        <v-switch class="mr-2" v-model="isDarkTheme" :false-icon="mdiWhiteBalanceSunny" :true-icon="mdiWeatherNight"
          hide-details />
        <v-btn v-if="!sessionStore.isAuthenticated" flat class="rounded-full" :append-icon="mdiLogin" variant="text"
          @click.prevent="signIn">{{ $t("sign-in")
          }}</v-btn>
        <v-btn v-else :icon="mdiDotsVertical" variant="text"
          @click.stop="showProfileDrawer = !showProfileDrawer"></v-btn>
      </div>
    </div>
  </div>

  <v-navigation-drawer disable-resize-watcher v-model="showNavigationDrawer" class="fixed">
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" @click="navigateTo(item)" :title="item.title"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer v-model="showProfileDrawer" location="right" temporary>
    <v-list>
      <v-list-item :title="sessionStore.identityName" class="select-none"></v-list-item>
      <v-divider></v-divider>
      <v-list-item :prepend-icon="mdiLogout" @click.prevent="signOut" :title="t('sign-out')"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import authenticatedNavigationMap from "./authenticated-navigation-map";
import navigationMap from "./anonymous-navigation-map";
import { mdiDotsVertical, mdiLogin, mdiLogout, mdiWhiteBalanceSunny, mdiWeatherNight, mdiMenu } from '@mdi/js';
import { computed, ref, watch } from "vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";
import { useTheme } from 'vuetify';
import type { NavigationItem } from "@/types/app";
import router from "@/router";
import { useMessageBus } from "@/stores/message-bus";
import { useApplicationStore } from "@/stores/application";

const applicationStore = useApplicationStore();
const messageBus = useMessageBus();
const navbarElement = useTemplateRef("navbar")
const sessionStore = useSessionStore();
const theme = useTheme();
const { t } = useI18n({ useScope: 'global' });

const showNavigationDrawer = ref(false);
const showProfileDrawer = ref(false);

const storedTheme = localStorage.getItem('app-theme') || theme.global.name.value;
const isDarkTheme: Ref<boolean> = ref(storedTheme === 'dark');

theme.change(isDarkTheme.value ? 'dark' : 'light');

watch(isDarkTheme, (newValue) => {
  const selectedTheme = newValue ? 'dark' : 'light';
  theme.change(selectedTheme);
  localStorage.setItem('app-theme', selectedTheme);
});

const items = computed(() => {
  const result: NavigationItem[] = [];
  const map = sessionStore.isAuthenticated
    ? authenticatedNavigationMap
    : navigationMap

  map.forEach((item: NavigationItem) => {
    if (!item.permission || sessionStore.hasPermission(item.permission)) {
      result.push({
        title: t(item.title),
        props: {
          to: item.to || "",
          ref: item.ref || ""
        }
      });
    }

    return result.length ? result : [{ title: t("sign-in"), props: { to: "/sign-in" } }];
  });

  return result;
});

const navigateTo = async (item: unknown) => {
  const options = item as { title: string, props: { to?: string, ref?: string } };

  showNavigationDrawer.value = false

  if (options.props.ref) {
    messageBus.emit(`goto-${options.props.ref}`);
  }

  if (options.props.to) {
    await router.push(options.props.to);
  }
}

const signIn = () => {
  router.push({ name: 'sign-in' })
}

const signOut = () => {
  sessionStore.signOut()
  showProfileDrawer.value = false;
  router.push('/home')
}

const handleScroll = () => {
  if (!navbarElement.value) {
    return
  }

  if (window.scrollY > 100) {
    navbarElement.value.classList.add('navbar');
  } else {
    navbarElement.value.classList.remove('navbar');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  applicationStore.addApplicationRef({ name: "navbar", ref: navbarElement });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
