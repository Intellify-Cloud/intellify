<template>
    <footer class="bg-surface-muted">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12">
            <div>
                <RouterLink to="/" class="inline-flex items-center gap-2 text-lg font-semibold"
                    :aria-label="`${site.name} home`">
                    <span class="w-2.5 h-2.5 rounded-full bg-orange-500 mr-1"></span>
                    <span>{{ site.nav.logo }}</span>
                </RouterLink>

                <p class="mt-4 text-sm leading-relaxed max-w-sm">
                    {{ site.footer.brand.description }}
                </p>
            </div>

            <nav class="grid grid-cols-2 sm:grid-cols-3 gap-8" aria-label="Footer navigation">
                <div v-for="column in site.footer.columns" :key="column.title">
                    <h2 class="text-sm font-semibold mb-4">
                        {{ column.title }}
                    </h2>
                    <ul class="space-y-3">
                        <li v-for="link in column.links" :key="link.label">
                            <component :is="isExternal(link.href) ? 'a' : 'RouterLink'"
                                v-bind="isExternal(link.href) ? { href: link.href } : { to: link.href }"
                                class="text-sm transition-colors">
                                {{ link.label }}
                            </component>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div
            class="max-w-7xl mx-auto border-t border-stroke sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm">
                &copy; {{ currentYear }} {{ site.name }}. All rights reserved.
            </p>
            <div class="flex gap-6">
                <component :is="isExternal(link.href) ? 'a' : 'RouterLink'" v-for="link in site.footer.links"
                    :key="link.label" v-bind="isExternal(link.href) ? { href: link.href } : { to: link.href }"
                    class="text-sm transition-colors">
                    {{ link.label }}
                </component>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import site from '@/assets/site.json'

const currentYear = new Date().getFullYear()

const isExternal = (href: string) =>
    /^(https?:|mailto:|tel:)/.test(href)
</script>