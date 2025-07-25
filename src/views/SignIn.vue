<template>
  <div class="b-form b-form--sm px-5 pt-6 my-32">
    <b-title :title="$t('sign-in')" class="border-b"></b-title>
    <div class="h-2"></div>
    <v-alert v-if="fetchingOAuthProviders" :text="t('messages.fetching-oauth-providers')"
      class="align-middle text-center"></v-alert>
    <div class="flex flex-col gap-2 justify-start" v-if="oauthProviders.length > 0">
      <v-btn v-for="oauthProvider in oauthProviders" v-bind:key="oauthProvider.name" :alt="`${oauthProvider.name} logo`"
        class="py-8 px-4 flex flex-row justify-center items-center gap-2 w-full"
        @click="oauthAuthenticate(oauthProvider.name)">
        <div v-if="oauthProvider.svg" v-html="oauthProvider.svg" class="v-icon__svg w-8 h-8 mr-4"></div>
        <span>{{ oauthProvider.name }}</span>
      </v-btn>
    </div>
    <v-alert v-if="showOAuthError" type="error" :text="t('exceptions.oauth-provider-error')"></v-alert>
  </div>
</template>

<script setup lang="ts">
import { accessApi } from "@/api";
import configuration from "@/configuration";
import { useAlertStore } from "@/stores/alert";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: 'global' });

type OAuthProvider = {
  name: string;
  svg: string;
}

const busy = ref(false);
const showOAuthError = ref(false);
const fetchingOAuthProviders = ref(false);
const oauthProviders = ref<OAuthProvider[]>([]);

const oauthAuthenticate = async (name: string) => {
  busy.value = true;

  try {
    const redirectUri = encodeURIComponent(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/oauth`)
    const response = await accessApi.get(`v1/oauth/authenticate/${name}?redirectUri=${redirectUri}`)

    window.location.replace(response?.data?.authorizationUrl);
  } finally {
    busy.value = false;
  }
}

const refreshOAuthProviders = async () => {
  fetchingOAuthProviders.value = true;

  try {
    const response = await accessApi.get("v1/oauth/providers")

    oauthProviders.value = response?.data;

    showOAuthError.value = oauthProviders.value.length == 0;
  } catch {
    useAlertStore().add(
      {
        message: t('exceptions.oauth-providers'),
        type: 'error',
        name: 'oauth-provider-error',
      })
  } finally {
    fetchingOAuthProviders.value = false;
  }
}

onMounted(async () => {
  if (!configuration.isOk()) {
    return;
  }

  await refreshOAuthProviders();
})
</script>
