<template>
  <div class="mt-32 section">
    <div v-if="status === 'sent'"
      class="flex flex-col justify-center items-center h-32 text-2xl font-bold text-green-500 border rounded w-2/5 mb-4">
      <span>Thank you! Your message has been sent successfully.</span>
    </div>
    <div v-else-if="status === 'error'"
      class="flex flex-col justify-center items-center h-32 text-2xl border rounded w-2/5 mb-4">
      <span class="font-bold text-red-500">Oops! Something went wrong. Please try again later.</span>
      <span class="text-xl">You are welcome to e-mail us at <a
          href="mailto:support@example.com">support@example.com</a></span>
    </div>
    <v-form v-if="!busy" @submit.prevent="handleSubmit" class="w-2/5">
      <div style=" position: absolute; left: -9999px;" aria-hidden="true">
        <label>Location</label>
        <input v-model="state.location" type="text" tabindex="-1" autocomplete="off" />
      </div>
      <v-text-field v-model="state.name" label="Name" :error-messages="validation.message('name')" required />
      <v-text-field v-model="state.emailAddress" label="Email Address" type="email"
        :error-messages="validation.message('emailAddress')" required />
      <v-text-field v-model="state.phoneNumber" label="Phone Number (optional)" />
      <v-textarea v-model="state.content" label="Message" auto-grow :error-messages="validation.message('content')"
        required />
      <v-btn type="submit" color="primary" class="mt-4">
        Send Message
      </v-btn>
    </v-form>
    <div v-else class="flex flex-col justify-center items-center h-32 border rounded w-2/5">
      <v-progress-circular indeterminate color="primary" size="40" width="5" />
      <p class="text-lg font-bold pt-4">Sending your message...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { broadsheetApi } from '@/api';
import { required, email } from '@vuelidate/validators'
import { useValidation } from "@/composables/Validation"
import type { Message } from '@/types/broadsheet';
import type { Reactive } from 'vue';

const busy = ref(false);
const status = ref('');

const initialState: Message = {
  name: '',
  emailAddress: '',
  phoneNumber: '',
  location: '',
  content: '',
}

const state: Reactive<Message> = reactive({
  name: '',
  emailAddress: '',
  phoneNumber: '',
  location: '', // Honeypot
  content: '',
})

const rules = computed(() => {
  return {
    name: { required },
    emailAddress: { required, email },
    content: { required }
  }
})

const validation = useValidation(rules, state);

async function handleSubmit() {
  const errors = await validation.errors();

  if (errors.length) {
    return;
  }

  busy.value = true;
  status.value = '';

  try {
    const body: Message = {
      name: state.name,
      emailAddress: state.emailAddress,
      phoneNumber: state.phoneNumber,
      location: state.location, // Honeypot
      content: state.content
    };

    await broadsheetApi.post('/v1/messages', body);

    Object.assign(state, initialState);

    validation.v$.value.$reset();

    status.value = 'sent';
  } catch {
    status.value = 'error';
  } finally {
    busy.value = false;
  }
}
</script>
