<script setup>
import { useRoute } from "vue-router";
import { useRestaurantsStore } from "../stores/restaurants";
import { useFavoritesStore } from "../stores/favorites";
import { storeToRefs } from "pinia";
const restaurantsStore = useRestaurantsStore();
const favoritesStore = useFavoritesStore();
const route = useRoute();
const { singleRestaurant, searchChoice } = storeToRefs(restaurantsStore);

restaurantsStore.getSingleRestaurantDetails(route.params.id);
</script>

<template>
  <div>
    <h1 class="p-4 m-4">{{ singleRestaurant.name }}</h1>

    <img
      class="px-4 max-h-[400px] rounded"
      :src="`https://source.unsplash.com/random/?${singleRestaurant.name},${searchChoice}`"
    />
    <div class="p-4 m-4 border bg-green-50 border-vueGreen rounded">
      <h2>Details</h2>
      <p class="text-lg">{{ singleRestaurant.formatted_address }}</p>
      <p class="text-lg">{{ singleRestaurant.formatted_phone_number }}</p>
    </div>
    <div class="flex justify-between p-4 m-4">
      <h3 class="text-lg">Rating: {{ singleRestaurant.rating }}</h3>
      <button
        @click="
          favoritesStore.addToFavorites(
            singleRestaurant.name,
            route.params.id,
            singleRestaurant.formatted_address,
            singleRestaurant.formatted_phone_number
          )
        "
        class="button button-secondary"
      >
        Add to Favorites ❤️
      </button>
    </div>
    <h3 class="p-4 m-4">Reviews</h3>
    <div
      class="flex border border-gray-100 p-4 m-4 shadow-sm"
      v-for="review in singleRestaurant.reviews"
      :key="review.text"
    >
      <p>{{ review.text }}</p>
      <p class="font-bold">{{ review.rating }}</p>
    </div>
  </div>
</template>

<style scoped></style>
