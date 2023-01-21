<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "../src/router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./stores/auth.js";
const authStore = useAuthStore();
const { user, userFirstName } = storeToRefs(authStore);

// function logout() {
//   authStore.$reset();
//   router.push("/");
// }

authStore.$onAction(({ name, store, args }) => {
  console.log(`Start "${name}" with params [${args.join(", ")}].`);
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="flex justify-between mb-10 pt-10">
        <div>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>
        <div class="w-[70vw] flex justify-end">
          <RouterLink :to="`/favorites`"
            ><p
              v-if="user && user.username"
              class="flex items-center mr-4 font-semibold"
            >
              {{ userFirstName }}'s Favorites ❤️
            </p></RouterLink
          >
          <button
            v-if="user && user.username"
            @click="authStore.logout()"
            class="button button-primary"
          >
            Log Out
          </button>
          <RouterLink v-else to="/login" class="button button-primary"
            >Sign In</RouterLink
          >
          <RouterLink
            v-if="!user.username"
            to="/register"
            class="button button-secondary"
            >Register</RouterLink
          >
        </div>
      </nav>
    </div>
  </header>

  <main class="bg-white">
    <RouterView />
  </main>
</template>

<style scoped>
.button {
  @apply mx-4;
}

nav a {
  @apply text-lg font-semibold;
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    padding: 1rem 0;
  }
}
</style>
