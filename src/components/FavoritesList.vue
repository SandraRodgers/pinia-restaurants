<script setup>
import { useFavoritesStore } from "../stores/favorites";
const favoritesStore = useFavoritesStore();
</script>
<template>
  <div class="grid grid-cols-3 gap-10 mt-10">
    <div
      class="shadow-xl w-80 border-2 border-gray-100"
      v-for="(restaurant, i) in favoritesStore.userFavorites"
      :key="restaurant.name"
    >
      <RouterLink :to="`/restaurant/${restaurant.place_id}`">
        <div class="flex justify-between items-center">
          <h3 class="p-4 h-16 flex items-center">
            {{ restaurant.restaurant_name }}
          </h3>
          <button
            @click.prevent="favoritesStore.removeFavorite(restaurant.place_id)"
            class="button button-secondary h-8 w-20 mr-4"
          >
            Remove
          </button>
        </div>

        <img
          class="w-80 h-56 rounded"
          :src="`https://source.unsplash.com/random/?${restaurant.name}, ${i}`"
        />
        <div class="p-4">
          <p>{{ restaurant.address }}</p>
          <p>{{ restaurant.phone_number }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
