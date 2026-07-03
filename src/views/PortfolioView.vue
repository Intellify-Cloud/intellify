<template>
    <div>
        <section class="page-hero py-16 md:py-24">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
                    {{ page.header.title_prefix }}<span class="gradient-text">{{ page.header.title_highlight }}</span>
                </h1>
                <p class="text-lg mt-4">{{ page.header.description }}</p>
            </div>
        </section>

        <section class="py-16 md:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 split-layout">
                <aside class="plan-card">
                    <div class="badge">{{ page.plan.badge }}</div>
                    <div class="price">
                        <span>{{ page.plan.price_prefix }}</span>
                        <strong>{{ planPrice }}</strong>
                        <span>{{ page.plan.price_suffix }}</span>
                    </div>
                    <div class="usp">
                        <strong class="flex items-center justify-center gap-2">
                            <span aria-hidden="true">&#10003;</span> {{ page.plan.usp_title }}
                        </strong>
                        <p class="mt-1">
                            {{ page.plan.usp_description_prefix }}<s>{{ page.plan.usp_description_strikethrough }}</s>{{
                                page.plan.usp_description_suffix }}
                        </p>
                    </div>
                    <p>{{ page.plan.description }}</p>
                    <RouterLink :to="page.plan.button_link"
                        class="inline-flex items-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm font-extrabold mt-4">
                        {{ page.plan.button_text }}
                    </RouterLink>
                </aside>

                <div>
                    <h2 class="text-2xl font-bold tracking-tight mb-6">{{ page.tiers_header }}</h2>
                    <div class="portfolio-tier-grid">
                        <article v-for="tier in page.tiers" :key="tier.name" class="portfolio-tier-card"
                            :class="{ 'is-featured': tier.name === 'Recommended' }">
                            <div class="badge">{{ tier.badge }}</div>
                            <h3>{{ tier.name }}</h3>
                            <div class="tier-price">
                                <strong>{{ getPrice(tier.price_key) }}</strong>
                                <span>{{ tier.suffix }}</span>
                            </div>
                            <p>{{ tier.description }}</p>
                            <ul>
                                <li v-for="feature in tier.features" :key="feature">
                                    <span aria-hidden="true">&#10003;</span> {{ feature }}
                                </li>
                            </ul>
                        </article>
                    </div>

                    <h2 class="text-2xl font-bold tracking-tight mb-6">{{ page.features_header }}</h2>
                    <article v-for="feature in page.features" :key="feature.title" class="feature-detail">
                        <span aria-hidden="true">&#10003;</span>
                        <div>
                            <h3 class="font-semibold text-lg">{{ feature.title }}</h3>
                            <p>{{ feature.description }}</p>
                        </div>
                    </article>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="quote-panel">
                    <h2>{{ page.quote.text }}</h2>
                    <strong>{{ page.quote.author }}</strong>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import site from '@/assets/site.json'

const page = site.portfolio_page

const getPrice = (key: string) =>
    site.prices[key as keyof typeof site.prices] || ''

const planPrice = computed(() => getPrice(page.plan.price_key))

useHead({
    title: 'Website Plans South Africa',
    meta: [
        {
            name: 'description',
            content: 'Managed monthly website subscriptions from Intellify. No upfront costs, domain registration, hosting, SEO and cloud management included. From R150/month.',
        },
        { name: 'robots', content: 'index, follow' },
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: 'Intellify Managed Website Subscription',
                description: 'Professional website with no upfront costs, includes hosting, domain, and SEO optimization',
                brand: {
                    '@type': 'Brand',
                    name: 'Intellify',
                },
                offers: page.tiers.map((tier) => ({
                    '@type': 'Offer',
                    name: `${tier.name} Plan`,
                    price: getPrice(tier.price_key).replace(/^R/, ''),
                    priceCurrency: 'ZAR',
                    description: tier.description,
                })),
            }),
        } as any,
    ],
})
</script>

<style scoped>
.split-layout {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 64px;
    align-items: start;
}

@media (max-width: 1024px) {
    .split-layout {
        grid-template-columns: 1fr;
    }
}

.plan-card {
    position: sticky;
    top: 116px;
    overflow: hidden;
    padding: 36px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(241, 245, 249, 0.74));
    box-shadow: 0 14px 52px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    transition: transform 320ms ease, box-shadow 320ms ease;
}

.plan-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 68px rgba(15, 23, 42, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.plan-card::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 6px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    border-radius: 22px 22px 0 0;
}

.plan-card .badge,
.plan-card h3,
.plan-card strong,
.plan-card p,
.plan-card .price {
    color: #111827;
}

.plan-card p {
    color: #4b5563;
}

.plan-card .price strong {
    color: #0f172a;
}

.price,
.tier-price {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin: 22px 0;
}

.price strong,
.tier-price strong {
    font-size: 48px;
    line-height: 1;
}

.usp {
    padding: 16px;
    margin: 24px 0;
    border: 1px solid rgba(234, 88, 12, 0.25);
    border-radius: 14px;
    background: rgba(234, 88, 12, 0.1);
    text-align: center;
}

.portfolio-tier-grid {
    display: grid;
    gap: 18px;
    margin: 28px 0 56px;
}

.portfolio-tier-card {
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: var(--surface);
    box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);
    transition: transform 320ms ease, box-shadow 320ms ease, border-color 320ms ease;
}

.portfolio-tier-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(15, 23, 42, 0.12);
    border-color: rgba(234, 88, 12, 0.28);
}

.portfolio-tier-card.is-featured {
    border-color: rgba(234, 88, 12, 0.5);
    box-shadow: 0 16px 52px rgba(234, 88, 12, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.portfolio-tier-card.is-featured:hover {
    box-shadow: 0 24px 68px rgba(234, 88, 12, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.16);
    border-color: rgba(234, 88, 12, 0.7);
}

.portfolio-tier-card h3 {
    margin: 16px 0 0;
    font-size: 26px;
    font-weight: 700;
    color: var(--text);
}

.portfolio-tier-card p {
    margin: 0 0 22px;
    color: var(--muted);
    line-height: 1.7;
}

.portfolio-tier-card ul {
    display: grid;
    gap: 10px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.portfolio-tier-card li {
    display: flex;
    gap: 10px;
    color: var(--muted);
    line-height: 1.5;
    font-size: 14px;
}

.feature-detail {
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 18px;
    margin-bottom: 42px;
}

.quote-panel {
    margin-top: 104px;
    padding: clamp(40px, 8vw, 88px);
    overflow: hidden;
    border-radius: 28px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff;
    text-align: center;
    box-shadow: 0 24px 80px rgba(234, 88, 12, 0.22);
}

.quote-panel h2 {
    margin: 0 0 28px;
    font-size: clamp(28px, 5vw, 50px);
    line-height: 1.15;
}
</style>