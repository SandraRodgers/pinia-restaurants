<script setup>
import Search from "../components/Search.vue";
import RestaurantsList from "../components/RestaurantsList.vue";
import piniaLogo from "../assets/images/pinia-logo.svg";
import { usePlacesStore } from "../stores/places";
import { storeToRefs } from "pinia";
const placesStore = usePlacesStore();
const { singlePlace, searchChoice, loading } = storeToRefs(placesStore);
</script>

<template>
  <main class="flex flex-col">
    <div class="flex">
      <h1>Pinia Restaurants</h1>
      <img class="logo" :src="piniaLogo" />
    </div>
    <Search />
    <RestaurantsList />
    <div v-if="loading" class="flex">
      <div class="text-2xl font-semibold pr-4">Loading...</div>
      <div class="animate-spin text-4xl">🍔</div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 100px;
  padding: 0 20px;
}
</style>
