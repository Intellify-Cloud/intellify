<template>
    <nav class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-6xl">
        <div
            class="flex flex-row items-center justify-between gap-4 bg-neutral-100 dark:bg-neutral-900 rounded-full px-4.5 py-2.5 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <!-- Brand -->
            <RouterLink to="/" :aria-label="`${site.name} home`"
                class="cursor-pointer flex flex-row items-center gap-2 hover:opacity-80 transition-opacity">
                <span class="w-2.5 h-2.5 rounded-full bg-orange-500 mr-1"></span>
                <span class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{{ site.nav.logo }}</span>
            </RouterLink>

            <!-- Desktop links -->
            <div class="hidden md:flex item-start gap-2 grow">
                <RouterLink v-for="link in site.nav.links" :key="link.href" :to="link.href || '/'"
                    class="font-semibold text-neutral-500 hover:text-orange-500 px-3 py-1.5">
                    {{ link.label }}
                </RouterLink>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-1 shrink-0">
                <button type="button" @click="toggleTheme"
                    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                    class="cursor-pointer flex items-center justify-center rounded-full p-2 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-base">
                    <IconLightMode v-if="isDark" class="w-4 h-4"></IconLightMode>
                    <IconDarkMode v-else class="w-4 h-4"></IconDarkMode>
                </button>
                <button type="button" @click="menuOpen = !menuOpen" aria-label="Toggle menu"
                    class="w-8 h-8 flex items-center justify-center rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors md:hidden">
                    <span aria-hidden="true" class="text-lg leading-none">{{ menuOpen ? '×' : '☰' }}</span>
                </button>
            </div>

        </div>

        <!-- Mobile menu -->
        <div v-if="menuOpen" class="mt-2 bg-neutral-900 rounded-2xl px-4 py-3 flex flex-col gap-1 md:hidden">
            <a v-for="link in site.nav.links" :key="link.href" :href="link.href"
                class="text-sm text-neutral-300 hover:text-white px-3 py-2 rounded-full hover:bg-white/10 transition-colors"
                @click="menuOpen = false">
                {{ link.label }}
            </a>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import site from '@/assets/site.json'
import IconLightMode from './icons/IconLightMode.vue'
import IconDarkMode from './icons/IconDarkMode.vue'
import { RouterLink } from 'vue-router'

const menuOpen = ref(false)
const isDark = ref(false)

const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem("app-theme", isDark.value ? "dark" : "light");
}

onMounted(() => {
    isDark.value = (localStorage.getItem("app-theme") || "dark") === "dark";
    document.documentElement.classList.toggle("dark", isDark.value);
})
</script>