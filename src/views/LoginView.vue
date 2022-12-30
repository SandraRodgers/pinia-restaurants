<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const username = ref("");
const password = ref("");
</script>

<template>
  <div class="m-auto mt-40 w-80 border-slate-500 border rounded-sm pb-4">
    <form @submit.prevent="authStore.login(username, password)">
      <h1
        class="text-2xl mb-4 bg-slate-200 border-b-slate-500 border px-4 py-1"
      >
        Login
      </h1>
      <div class="flex flex-col px-4">
        <label class="mb-4" for="User Name"> User Name: </label>
        <input
          class="mb-4"
          v-model="username"
          type="username"
          name="username"
          value
        />
        <label class="mb-4" for="password"> Password: </label>
        <input
          class="mb-4"
          v-model="password"
          type="password"
          name="password"
          value
        />
        <button class="mb-4 button button-primary" name="button">
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
