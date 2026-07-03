<template>
    <article class="policy-card border border-stroke-muted rounded-2xl">
        <div class="text-4xl font-bold border-b border-b-stroke pb-6 mb-6">{{ site.privacy.title }}</div>
        <p>{{ site.privacy.intro }}</p>

        <template v-for="(section, index) in site.privacy.sections" :key="section.heading">
            <div class="text-xl font-semibold py-4">{{ section.heading }}</div>
            <p>
                {{ section.body }}
                <a v-if="index === site.privacy.sections.length - 1" :href="`mailto:${site.support_email}`"
                    class="text-primary">
                    {{ site.support_email }}
                </a><span v-if="index === site.privacy.sections.length - 1">.</span>
            </p>
        </template>
    </article>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import site from '@/assets/site.json'

useHead({
    title: 'Privacy Policy',
    meta: [
        {
            name: 'description',
            content: "Intellify's Privacy Policy explains how we protect your personal information when building websites for South African businesses.",
        },
        { name: 'robots', content: 'index, follow' },
    ],
})
</script>

<style scoped>
.policy-card {
    max-width: 760px;
    margin: 144px auto 72px;
    padding: 40px;
}

.policy-card h1 {
    padding-bottom: 18px;
    border-bottom: 1px solid var(--line);
    font-size: 42px;
}

.policy-card p {
    color: var(--muted);
    line-height: 1.7;
}

.policy-card a {
    color: var(--accent);
    text-decoration: underline;
}
</style>