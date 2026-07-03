<template>
    <section v-if="site.offerings.show" id="services" class="py-16 md:py-24 lg:py-32"
        aria-labelledby="services-heading">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                <p class="text-sm font-extrabold uppercase tracking-widest text-primary mb-3">
                    {{ site.offerings.kicker }}
                </p>
                <h2 id="services-heading" class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    {{ site.offerings.title }}
                </h2>
                <p class="text-lg">
                    {{ site.offerings.subtitle }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <article v-for="plan in site.offerings.plans" :key="plan.name"
                    class="relative rounded-2xl border p-8 flex flex-col h-full" :class="plan.featured
                        ? 'border-primary bg-surface-muted shadow-xl scale-100 md:scale-105 ring-1 ring-primary'
                        : 'border-stroke bg-surface-soft shadow-sm'">
                    <div v-if="plan.badge"
                        class="absolute -top-3 left-8 rounded-full px-3 py-1 text-xs font-semibold text-action-fg"
                        :class="plan.featured
                            ? 'bg-primary'
                            : 'bg-action-surface'">
                        {{ plan.badge }}
                    </div>

                    <h3 class="text-xl font-semibold mt-2 mb-2">
                        {{ plan.name }} Website Plan
                    </h3>
                    <p class="mb-6">
                        {{ plan.description }}
                    </p>

                    <div class="flex items-baseline gap-1 mb-6">
                        <span class="text-sm">{{ plan.price_prefix }}</span>
                        <strong class="text-4xl font-bold">
                            {{ getPrice(plan.price_key) }}
                        </strong>
                        <span class="text-sm">{{ plan.price_suffix }}</span>
                    </div>

                    <ul class="space-y-3 mb-8 flex-1">
                        <li v-for="feature in plan.features" :key="feature"
                            class="flex items-start gap-2 text-sm text-fg-muted">
                            <span class="text-primary mt-0.5" aria-hidden="true">&#10003;</span>
                            <span>{{ feature }}</span>
                        </li>
                    </ul>

                    <a :href="site.offerings.button_link" class="text-action-fg inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold
                    transition-colors" :class="plan.featured
                        ? 'bg-primary hover:bg-primary-hover'
                        : 'bg-action-surface hover:bg-action-surface-hover'">
                        {{ plan.cta }} <span aria-hidden="true">&rarr;</span>
                    </a>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import site from '@/assets/site.json'

const getPrice = (key: string) =>
    site.prices[key as keyof typeof site.prices]
</script>