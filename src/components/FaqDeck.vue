<template>
    <section v-if="site.faq.show" id="faq" class="py-16 md:py-24 lg:py-32" aria-labelledby="faq-heading">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 md:mb-16">
                <p class="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                    {{ site.faq.kicker }}
                </p>
                <h2 id="faq-heading" class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    {{ site.faq.title }}
                </h2>
                <p class="text-lg">
                    {{ site.faq.subtitle }}
                </p>
            </div>

            <div class="space-y-4">
                <div v-for="(item, index) in site.faq.items" :key="item.question"
                    class="faq-item rounded-xl border border-stroke bg-surface-muted px-6 py-4"
                    :class="{ 'is-open': openIndex === index }">
                    <button type="button"
                        class="flex w-full items-center justify-between gap-4 cursor-pointer font-semibold"
                        :aria-expanded="openIndex === index" :aria-controls="`faq-panel-${index}`"
                        @click="toggle(index)">
                        <span>{{ item.question }}</span>
                        <span class="faq-icon" aria-hidden="true"></span>
                    </button>

                    <div :id="`faq-panel-${index}`" class="faq-panel" role="region">
                        <div class="faq-panel-inner">
                            <p class="mt-3 leading-relaxed">
                                {{ item.answer }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import site from '@/assets/site.json'
import { useHead } from '@unhead/vue'

const openIndex = ref(0)

const toggle = (index: number) => {
    openIndex.value = openIndex.value === index ? -1 : index
}

useHead({
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: site.faq.items.map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer,
                    },
                })),
            }),
        } as any,
    ],
})
</script>

<style scoped>
.faq-icon {
    position: relative;
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--color-surface-soft);
}

.faq-icon::before,
.faq-icon::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    border-radius: 999px;
    background: var(--color-primary);
    transform: translate(-50%, -50%);
}

.faq-icon::after {
    transform: translate(-50%, -50%) rotate(90deg);
    transition: transform 160ms ease;
}

.faq-item.is-open .faq-icon::after {
    transform: translate(-50%, -50%) rotate(0deg);
}

.faq-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 300ms ease;
}

.faq-item.is-open .faq-panel {
    grid-template-rows: 1fr;
}

.faq-panel-inner {
    overflow: hidden;
}
</style>