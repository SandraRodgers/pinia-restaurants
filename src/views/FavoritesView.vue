<script setup>
import { useFavoritesStore } from "../stores/favorites";
import { storeToRefs } from "pinia";
import FavoritesList from "../components/FavoritesList.vue";
import piniaLogo from "../assets/images/pinia-logo.svg";
import { useAuthStore } from "../stores/auth.js";
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();
const { userFavorites } = storeToRefs(favoritesStore);

favoritesStore.getFavorites();
</script>

<template>
  <main class="flex flex-col items-center pb-40">
    <div class="flex">
      <h1>{{ authStore.userFirstName }}'s Favorites</h1>
      <img class="logo" :src="piniaLogo" />
    </div>
    <FavoritesList />
  </main>
</template>

<style scoped>
.logo {
  height: 100px;
  padding: 0 20px;
}
</style>
