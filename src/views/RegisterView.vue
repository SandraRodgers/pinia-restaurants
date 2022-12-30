<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const createdName = ref("");
const createdUserName = ref("");
const createdPassword = ref("");
const { message } = storeToRefs(authStore);
</script>

<template>
  <div class="m-auto mt-40 w-80 border-slate-500 border rounded-sm pb-4">
    <form
      @submit.prevent="
        authStore.register(createdName, createdUserName, createdPassword)
      "
    >
      <h1
        class="text-2xl mb-4 bg-slate-200 border-b-slate-500 border px-4 py-1"
      >
        Register
      </h1>
      <div class="flex flex-col px-4">
        <label class="mb-4" for="Create User Name"> First Name: </label>
        <input
          class="mb-4"
          v-model="createdName"
          type="text"
          name="createdName"
          value
        />
        <label class="mb-4" for="Create User Name"> Create User Name: </label>
        <input
          class="mb-4"
          v-model="createdUserName"
          type="username"
          name="createdUserName"
          value
        />
        <label class="mb-4" for="Create Password"> Create Password: </label>
        <input
          class="mb-4"
          v-model="createdPassword"
          type="password"
          name="createdPassword"
          value
        />
        <button type="submit" class="mb-4 button button-primary" name="button">
          Register
        </button>
      </div>
    </form>
  </div>
  <div class="flex justify-center mt-10 text-red-500" v-if="message">
    {{ message }}
  </div>
</template>

<style scoped></style>
