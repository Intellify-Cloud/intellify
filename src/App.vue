<template>
    <NavBar />
    <RouterView />
    <FooterDeck />
    <div class="pointer-events-none z-40 right-6 bottom-6 fixed flex flex-row items-center">
        <BackToTopButton class="mr-4" />
        <WhatsAppButton />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterDeck from './components/FooterDeck.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';
import BackToTopButton from './components/BackToTopButton.vue';
</script>
