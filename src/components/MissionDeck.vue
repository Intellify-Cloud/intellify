<template>
    <section id="mission" v-if="site.mission.show" class="py-16 md:py-24 lg:py-32" aria-labelledby="mission-heading">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-sm font-semibold uppercase tracking-widest mb-3  text-primary">
                {{ site.mission.title }}
            </p>
            <h2 id="mission-heading" class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-12">
                {{ site.mission.highlight }}<span class="font-normal">{{ site.mission.subtitle }}</span>
            </h2>

            <div class="mission-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(feature, index) in site.mission.features" :key="feature.label"
                    class="mission-card rounded-2xl border border-stroke-muted p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="mission-heading flex items-center gap-2 text-lg font-semibold mb-3">
                        <span class="inline-flex h-8 w-8 items-center justify-center rounded-full" aria-hidden="true">
                            &#10022;
                        </span>
                        {{ feature.label }}
                    </h3>
                    <div class="mission-copy leading-relaxed">
                        <p>{{ site.mission.paragraphs[index] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import site from '@/assets/site.json'
</script>

<style scoped>
.mission-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    margin-top: 40px;
}

.mission-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 260px;
    padding: 24px;
    border-radius: 18px;
    background: var(--color-surface-soft);
    transition: transform 160ms ease;
}

.mission-card:hover {
    transform: scale(1.02);
}

.mission-card:nth-child(1),
.mission-card:nth-child(4) {
    grid-column: span 4;
}

.mission-card:nth-child(2),
.mission-card:nth-child(3) {
    grid-column: span 8;
}

.mission-heading,
.feature-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 24px;
}

.mission-copy {
    display: grid;
    align-items: center;
    flex: 1;
    padding: 24px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-muted));
    font-weight: 700;
    line-height: 1.6;
}
</style>