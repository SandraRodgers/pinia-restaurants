<script setup>
import { watch } from "vue";
import { useGeoLocationStore } from "../stores/geolocation";
import { useRestaurantsStore } from "../stores/restaurants";
import { storeToRefs } from "pinia";
import { useDebounceFn } from "@vueuse/core";

const geoLocationStore = useGeoLocationStore();
const restaurantsStore = useRestaurantsStore();
const { city, loadingMessage } = storeToRefs(geoLocationStore);
const { searchChoice, restaurantDetails } = storeToRefs(restaurantsStore);

const debouncedFn = useDebounceFn(() => {
  restaurantsStore.getRestaurants();
}, 1000);

function restaurantSearch() {
  debouncedFn();
}

watch(city, (newVal) => {
  if (newVal) {
    restaurantsStore.$patch({
      restaurantDetails: [],
      searchChoice: "",
    });
  }
});

// watch(city, (newVal) => {
//   if (newVal) {
//     restaurantDetails.value = [];
//     searchChoice.value = "";
//   }
// });

watch(searchChoice, (newVal) => {
  if (newVal || !searchChoice.value) {
    restaurantDetails.value = [];
  }
});
</script>

<template>
  <section class="mt-20">
    <div class="flex items-center">
      <label class="w-20 text-lg font-semibold" for="search-city">City:</label>
      <input
        class="search-input"
        :placeholder="loadingMessage"
        v-model="geoLocationStore.city"
      />
    </div>
    <div class="flex items-center mt-8">
      <label class="w-20 text-lg font-semibold" for="search-choice"
        >Search:</label
      >
      <div v-if="loadingMessage" class="animate-spin">🍔</div>
      <input
        v-if="!loadingMessage"
        v-model="searchChoice"
        @input="restaurantSearch"
        list="search-options"
        id="search-choice"
        name="search-choice"
        placeholder="Location, restaurant, or cuisine"
        class="search-input"
      />
      <datalist id="search-options">
        <option value="Sushi" />
        <option value="Pizza" />
        <option value="Breakfast" />
      </datalist>
    </div>
    <div class="flex justify-center mt-10">
      <button
        v-show="restaurantsStore.restaurantDetails.length > 0"
        @click="restaurantsStore.resetRestaurantsStore()"
        class="button button-primary"
      >
        Clear Search
      </button>
    </div>
  </section>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.search-input {
  @apply w-[20rem] xl:w-[40rem];
}
</style>
