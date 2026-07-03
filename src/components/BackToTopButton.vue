<template>
    <button type="button"
        class="back-to-top inline-flex min-h-11 items-center gap-2 rounded-full border border-stroke bg-surface px-4.5 py-2.5 text-sm font-extrabold text-fg transition-[opacity,transform] duration-150 ease-out hover:bg-fg hover:text-fg"
        :class="isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'" @click="scrollToTop">
        <span aria-hidden="true">&#8593;</span>
        <span>Back to top</span>
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
    isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // set correct initial state on mount (e.g. if page loads mid-scroll or on refresh)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>