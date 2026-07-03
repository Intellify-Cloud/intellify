<template>
    <section v-if="site.hero.show" class="relative overflow-hidden hero" aria-labelledby="hero-heading">
        <div class="relative flex flex-col mx-auto max-w-5xl px-6 py-16 item-center text-center lg:px-8">
            <p v-if="site.hero.subtitle" class="mb-4 text-sm font-semibold uppercase tracking-widest">
                {{ site.hero.subtitle }}
            </p>
            <h1 id="hero-heading" class="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl">
                {{ site.hero.title_line_1_prefix }}
                <span class="bg-linear-to-r from-primary to-primary-muted bg-clip-text text-transparent">{{
                    site.hero.title_line_1_highlight }}</span>
                <br />
                {{ site.hero.title_line_2_prefix }}
                <span class="bg-linear-to-r from-primary to-primary-muted  bg-clip-text text-transparent">{{
                    site.hero.title_line_2_highlight }}</span>
            </h1>
            <h2 class="mx-auto mt-5 max-w-5xl font-medium sm:text-3xl">
                Affordable managed website subscriptions for South African businesses
            </h2>
            <p class="mx-auto mt-4 max-w-3xl text-base leading-relaxed sm:text-xl">
                {{ site.hero.body }}
            </p>
            <div class="mx-auto mt-8 flex flex-wrap justify-center gap-2 max-w-3xl" mx-auto>
                <span v-for="pill in pills" :key="pill"
                    class="rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium shadow-sm">{{
                        pill }}</span>
            </div>
            <div class="mt-10">
                <a :href="site.hero.button_link"
                    class="inline-flex items-center gap-2 rounded-full bg-action-surface px-7 py-3.5 text-sm font-semibold text-action-fg shadow-lg transition hover:bg-action-surface-muted focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-action-outline--focus">
                    {{ site.hero.button_text }}
                    <IconWebTraffic class="w-6 h-6" />
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import site from '@/assets/site.json'
import IconWebTraffic from './icons/IconWebTraffic.vue';

const pills = [...site.hero.marquee_row1, ...site.hero.marquee_row2].slice(0, 9)
</script>

<style scoped>
.hero {
    min-height: 90vh;
    display: grid;
    place-items: center;
    padding: 128px 0 64px;
    background:
        radial-gradient(circle at 20% 20%, rgba(234, 88, 12, 0.18), transparent 30%),
        radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.16), transparent 28%),
        linear-gradient(180deg, var(--color-surface), var(--color-surface));
}

.hero::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.38;
    background-image: linear-gradient(var(--color-stroke-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-stroke-muted) 1px, transparent 1px);
    background-size: 54px 54px;
    -webkit-mask-image: radial-gradient(circle at center, black, transparent 75%);
    mask-image: radial-gradient(circle at center, black, transparent 75%);
    z-index: 0;
}
</style>