<script setup>
import { usePlacesStore } from "../stores/places";
const placesStore = usePlacesStore();
</script>
<template>
  <div class="grid grid-cols-3 gap-10 mt-10">
    <div
      class="shadow-xl w-80 border-2 border-gray-100"
      v-for="restaurant in placesStore.placeDetails"
      :key="restaurant.name"
    >
      <RouterLink :to="`/restaurant/${restaurant.place_id}`">
        <h3 class="p-4 h-16">{{ restaurant.name }}</h3>

        <img
          class="w-80 h-56 rounded"
          :src="`https://source.unsplash.com/random/?${restaurant.name},${placesStore.searchChoice}`"
        />
        <div class="p-4">
          <p>{{ restaurant.formatted_address }}</p>
          <p>{{ restaurant.formatted_phone_number }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
