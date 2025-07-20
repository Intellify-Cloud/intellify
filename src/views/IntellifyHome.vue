<template>
  <div>
    <div class="h-[800px]">
      <v-parallax src="/home.jpg">
        <div class="bg-white/10 backdrop-brightness-70 w-full">
          <div class="flex flex-col justify-center items-center h-[800px] p-4">
            <h2 class="font-bold text-4xl text-white text-shadow-lg text-shadow-gray-500">
              Reach more customers</h2>
            <h1 class="font-bold text-6xl text-gray-200 text-shadow-lg text-shadow-gray-700 my-4 uppercase">
              Go Online. Grow Online.</h1>
            <v-btn class="m-8 h-12 rounded-full">Contact Us Today</v-btn>
          </div>
        </div>
      </v-parallax>
    </div>
    <div class="section">
      <div class="w-1/2 text-center" ref="services">
        <header>Services</header>
        <p>Welcome to Intellify! We understand that starting a website can be overwhelming, from setting up a domain to
          managing the high capital expenses associated with it. That's where we step in to make the process easy and
          hassle-free.</p>
        <p>Our primary mission is to empower small and medium-sized service-based businesses by providing a seamless
          introduction to the online world. We believe that building trust and a strong online presence are crucial for
          fostering growth and success.</p>
        <p>With our services, we cater to your specific needs. Set yourself apart using our affordable subscription
          model,
          which eliminates the heavy upfront costs of website setup and maintenance.</p>
        <p>Let Intellify help you on this exciting journey. Together, we'll unlock your business's full potential and
          start
          elevating your brand matter. Unlock the power of an online profile now!</p>
      </div>
    </div>
    <div class="section">
      <header>Some of our websites</header>
      <div class="mx-auto w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <v-img v-for="site in sites" :key="site.title" :src="site.logo" class="cursor-pointer h-20"
          @click="openSite(site.url)" />
      </div>
    </div>
    <div class="section">
      <header>Included With every Portfolio Website</header>
      <div class="flex flex-col md:flex-row gap-8 ">
        <v-card class="card">
          <v-card-title class="flex flex-col items-center pb-8">
            <v-icon class="text-7xl rounded-full p-2 m-2" :icon="mdiWeb"></v-icon>
            <span class="text-2xl font-bold">Domain Registration</span>
          </v-card-title>
          <v-card-text>
            <p>We register your personalised domain name to start building your online presence.</p>
            <p>Get your dream company name before someone else does.</p>
          </v-card-text>
          <v-card-actions class="justify-center m-4">
            <v-btn class="rounded-full border-4 p-4 h-16 text">Contact us</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="card">
          <v-card-title class="flex flex-col items-center pb-8">
            <v-icon class="text-7xl rounded-full p-2 m-2" :icon="mdiMonitorCellphone"></v-icon>
            <span class="text-2xl font-bold">Responsive Design</span>
          </v-card-title>
          <v-card-text>
            <p>Your micro-site will render correctly not only on desktop-sized screen but also on mobile-sized screens.
            </p>
          </v-card-text>
          <v-card-actions class="justify-center m-4">
            <v-btn class="rounded-full border-4 p-4 h-16 text">Contact us</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="card">
          <v-card-title class="flex flex-col items-center pb-8">
            <v-icon class="text-7xl rounded-full p-2 m-2" :icon="mdiSpeedometer"></v-icon>
            <span class="text-2xl font-bold">Performance</span>
          </v-card-title>
          <v-card-text>
            <p>Nobody likes a slow site, and neither does Google. Our sites are optimised for speed to improve SEO,
              usability and drive conversion.</p>
          </v-card-text>
          <v-card-actions class="justify-center m-4">
            <v-btn class="rounded-full border-4 p-4 h-16 text">Contact us</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessageBus } from '@/stores/message-bus';
import { mdiMonitorCellphone, mdiSpeedometer, mdiWeb } from '@mdi/js';
const services = useTemplateRef("services")

const messageBus = useMessageBus();

const sites = [
  {
    "title": "Oobalink",
    "url": "https://www.oobalink-ns.co.za/",
    "logo": "/clients/oobalink.jpg"
  },
  {
    "title": "Designmodo",
    "url": "https://www.homeloansandbonds.co.za/",
    "logo": "/clients/designmodo.jpg"
  },
  {
    "title": "Themeforest",
    "url": "https://www.evochanellemacey.co.za/",
    "logo": "/clients/themeforest.jpg"
  },
  {
    "title": "Apex Coaching",
    "url": "https://www.apexcoaching.co.za/",
    "logo": "/clients/apexcoaching.jpg"
  }
];

function openSite(url: string) {
  window.open(url, '_blank');
}

onMounted(() => {
  messageBus.emit('goto-top');

  messageBus.on("goto-services", () => {
    if (!services.value) {
      return;
    }

    messageBus.emit("scroll-to", { offset: services.value.getBoundingClientRect().top });
  });
});
</script>
