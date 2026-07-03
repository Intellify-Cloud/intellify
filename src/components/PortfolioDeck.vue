<template>
    <section v-if="site.portfolio.show" class="py-16 md:py-24 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    {{ site.portfolio.title }}
                </h2>
                <p class="text-lg">
                    {{ site.portfolio.subtitle }}
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <article v-for="item in site.portfolio.sites" :key="item.url"
                    class="rounded-xl overflow-hidden border border-stroke shadow-sm bg-surface-soft">
                    <div class="flex items-center gap-2 px-3 py-2">
                        <div class="flex gap-1.5">
                            <span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                            <span class="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
                            <span class="h-2.5 w-2.5 rounded-full bg-green-400"></span>
                        </div>
                        <div class="flex-1 truncate rounded-md px-3 py-1 text-xs border-stroke bg-surface-muted/60">
                            {{ cleanUrl(item.url) }}
                        </div>
                    </div>

                    <div class="relative group aspect-video overflow-hidden">
                        <img :src="`https://s0.wp.com/mshots/v1/${encodeURIComponent(item.url)}?w=800`"
                            :alt="`${item.title} - Intellify managed website example`" loading="lazy" width="400"
                            height="225" class="h-full w-full object-cover">
                        <div
                            class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a :href="item.url" target="_blank" rel="noopener noreferrer"
                                class="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-4 py-2 text-sm font-semibold text-fg hover:bg-primary">
                                {{ site.portfolio.visit_label }} <span aria-hidden="true">&#8599;</span>
                            </a>
                        </div>
                    </div>

                    <h3 class="px-4 py-3 text-base font-semibold">
                        {{ item.title }}
                    </h3>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import site from '@/assets/site.json'

const cleanUrl = (url: string) =>
    url.replace(/^https:\/\/(www\.)?/, '')

useHead({
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Intellify Portfolio Websites',
                itemListElement: site.portfolio.sites.map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    url: item.url,
                })),
            }),
        } as any,
    ],
})
</script>