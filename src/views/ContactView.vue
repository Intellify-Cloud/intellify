<template>
    <div>
        <section class="contact-section py-16 md:py-24" id="contact">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12 md:mb-16 text-center">
                    <div class="text-sm font-semibold uppercase tracking-widest text-primary">{{ site.contact.eyebrow }}
                    </div>
                    <h1 class="text-4xl md:text-5xl font-bold tracking-tight mt-2">
                        {{ site.contact.title_prefix }} <span class="gradient-text">{{ site.contact.title_highlight
                            }}</span>
                    </h1>
                    <p class="text-lg mt-4">{{ site.contact.intro }}</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
                    <aside class="rounded-2xl border border-stroke bg-surface-muted p-8 flex flex-col justify-between">
                        <div>
                            <p class="text-sm font-extrabold uppercase tracking-widest text-fg-muted">Start Here</p>
                            <h2 class="text-4xl font-bold tracking-tight mt-2">Tell us where your business is headed.
                            </h2>
                            <p class="mt-4 leading-relaxed text-fg-muted">
                                Share what you do, what you need your website to achieve, and how soon you want to go
                                live. We will help you choose a monthly plan that fits.
                            </p>
                        </div>

                        <div class="mt-8 space-y-4">
                            <a class="flex flex-col gap-1 rounded-xl border border-stroke px-4 py-3 bg-surface-soft"
                                :href="`mailto:${site.email}?subject=Intellify Website Enquiry`">
                                <span aria-hidden="true"
                                    class="text-xs font-semibold uppercase tracking-widest text-primary">Email</span>
                                <strong>{{ site.email }}</strong>
                            </a>

                            <a class="flex flex-col gap-1 rounded-xl border border-stroke px-4 py-3 bg-surface-soft"
                                :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener noreferrer">
                                <span aria-hidden="true"
                                    class="text-xs font-semibold uppercase tracking-widest text-primary">WhatsApp</span>
                                <strong>Message us directly</strong>
                            </a>
                        </div>
                    </aside>

                    <form class="rounded-2xl border border-stroke p-8 space-y-6 bg-surface-muted"
                        @submit.prevent="handleSubmit">
                        <div class="absolute left-[-9999px]" aria-hidden="true">
                            <label for="location">{{ site.contact.fields.location }}</label>
                            <input id="location" v-model="form.location" name="location" type="text" tabindex="-1"
                                autocomplete="off">
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div class="field">
                                <label for="name" class="block text-sm font-semibold mb-1">{{ site.contact.fields.name
                                    }} *</label>
                                <input id="name" v-model="form.name" name="name" type="text" autocomplete="name"
                                    required class="w-full rounded-lg border border-stroke px-4 py-2.5 bg-surface-soft">
                            </div>

                            <div class="field">
                                <label for="phoneNumber" class="block text-sm font-semibold mb-1">{{
                                    site.contact.fields.phone }}</label>
                                <input id="phoneNumber" v-model="form.phoneNumber" name="phoneNumber" type="tel"
                                    autocomplete="tel"
                                    class="w-full rounded-lg border border-stroke px-4 py-2.5 bg-surface-soft">
                            </div>
                        </div>

                        <div class="field">
                            <label for="emailAddress" class="block text-sm font-semibold mb-1">{{
                                site.contact.fields.email }} *</label>
                            <input id="emailAddress" v-model="form.emailAddress" name="emailAddress" type="email"
                                autocomplete="email" required
                                class="w-full rounded-lg border border-stroke px-4 py-2.5 bg-surface-soft">
                        </div>

                        <div class="field">
                            <label for="content" class="block text-sm font-semibold mb-1">{{ site.contact.fields.message
                                }} *</label>
                            <textarea id="content" v-model="form.content" name="content" rows="6"
                                placeholder="Tell us about your business, the kind of site you need, and which plan you are considering."
                                required
                                class="w-full rounded-lg border border-stroke px-4 py-2.5 bg-surface-soft"></textarea>
                        </div>

                        <button type="submit" :disabled="status === 'sending'"
                            class="bg-action-surface text-action-fg mx-auto inline-flex items-end gap-2 rounded-full border border-stroke px-6 py-3 text-sm font-extrabold disabled:opacity-60 disabled:cursor-not-allowed">
                            {{ site.contact.submit }} <span aria-hidden="true">&rarr;</span>
                        </button>

                        <div v-if="statusMessage" class="form-status text-sm" aria-live="polite">
                            {{ statusMessage }}
                        </div>

                        <p class="text-sm">
                            No upfront build cost. Domain, hosting, code management, and ongoing support are handled
                            through your monthly subscription.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import site from '@/assets/site.json'

useHead({
    title: 'Contact Us',
    meta: [
        { name: 'description', content: 'Contact Intellify to start your managed portfolio website.' },
        { name: 'robots', content: 'index, follow' },
    ],
})

const API_URL = import.meta.env.VITE_BROADSHEET_API_URL

const form = reactive({
    location: '', // honeypot — must stay empty
    name: '',
    emailAddress: '',
    phoneNumber: '',
    content: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const statusMessage = computed(() => {
    if (status.value === 'sending') return site.contact.sending
    if (status.value === 'sent') return site.contact.sent
    if (status.value === 'error') return `${site.contact.error_prefix} ${site.email}`
    return ''
})

const handleSubmit = async () => {
    // Honeypot tripped — silently pretend success, don't hit the API
    if (form.location) {
        status.value = 'sent'
        return
    }

    status.value = 'sending'

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                emailAddress: form.emailAddress,
                phoneNumber: form.phoneNumber,
                content: form.content,
            }),
        })

        if (!response.ok) throw new Error('Request failed')

        status.value = 'sent'
        form.name = ''
        form.emailAddress = ''
        form.phoneNumber = ''
        form.content = ''
    } catch {
        status.value = 'error'
    }
}
</script>

<style scoped>
.contact-section {
    position: relative;
    padding: 144px 0 96px;
    overflow: hidden;
    background:
        radial-gradient(circle at 20% 12%, rgba(234, 88, 12, 0.16), transparent 30%),
        radial-gradient(circle at 86% 24%, rgba(245, 158, 11, 0.12), transparent 28%),
        linear-gradient(180deg, var(--surface-soft), var(--bg));
}

.dark .contact-section {
    background:
        radial-gradient(circle at 18% 12%, rgba(234, 88, 12, 0.2), transparent 30%),
        radial-gradient(circle at 88% 24%, rgba(245, 158, 11, 0.14), transparent 28%),
        linear-gradient(180deg, #101010, #050505);
}

.contact-section::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.26;
    background-image:
        linear-gradient(var(--line) 1px, transparent 1px),
        linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(circle at center, black, transparent 74%);
    pointer-events: none;
}

.contact-container {
    position: relative;
    z-index: 1;
    width: min(100% - 32px, 1120px);
    margin-inline: auto;
}

.contact-hero {
    max-width: 760px;
    margin: 0 auto 56px;
    text-align: center;
}

.contact-hero h1 {
    margin: 18px 0 22px;
    font-size: clamp(42px, 7vw, 72px);
    line-height: 1.02;
}

.contact-grid {
    display: grid;
    grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
    gap: 28px;
    align-items: stretch;
}

.contact-panel,
.contact-form-card {
    border: 1px solid var(--line);
    border-radius: 22px;
    background: color-mix(in srgb, var(--color-surface) 92%, transparent);
    box-shadow: var(--color-shadow);
    backdrop-filter: blur(16px);
}

.contact-panel {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    padding: 32px;
    overflow: hidden;
}

.contact-panel h2 {
    margin: 0 0 16px;
    font-size: clamp(28px, 4vw, 42px);
    line-height: 1.08;
}

.contact-panel p {
    margin: 0;
    color: var(--muted);
    line-height: 1.7;
}

.contact-detail-list {
    display: grid;
    gap: 12px;
}

.contact-detail {
    display: grid;
    gap: 6px;
    padding: 16px;
    border: 1px solid var(--color-stroke);
    border-radius: 14px;
    background: var(--color-surface-soft);
    transition: border-color 160ms ease, transform 160ms ease;
}

.contact-detail:hover {
    border-color: rgba(234, 88, 12, 0.42);
    transform: translateY(-2px);
}

.contact-detail span {
    color: var(--accent);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
}

.contact-detail strong {
    color: var(--text);
    font-size: 16px;
}

.contact-form-card {
    padding: 32px;
}

.contact-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}

.contact-form-card button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 50px;
    width: 100%;
    padding: 14px 24px;
    border: 0;
    border-radius: 999px;
    background: var(--color-fg);
    color: var(--color-surface);
    font-weight: 800;
    cursor: pointer;
    transition: transform 140ms ease, background 140ms ease;
}

.contact-form-card button:hover:not(:disabled) {
    transform: translateY(-2px);
    background: var(--color-primary);
    color: #fff;
}

.contact-form-card button:disabled {
    cursor: wait;
    opacity: 0.7;
}

.contact-note {
    margin: 18px 0 0;
    color: var(--color-fg-muted);
    font-size: 13px;
    line-height: 1.6;
}

@media (max-width: 860px) {

    .contact-grid,
    .contact-form-grid {
        grid-template-columns: 1fr;
    }

    .contact-section {
        padding-top: 124px;
    }
}
</style>