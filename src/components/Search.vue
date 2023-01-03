<script setup>
import { watch } from "vue";
import { useGeoLocationStore } from "../stores/geolocation";
import { usePlacesStore } from "../stores/places";
import { storeToRefs } from "pinia";
import { useDebounceFn } from "@vueuse/core";

const geoLocationStore = useGeoLocationStore();
const placesStore = usePlacesStore();
const { city, loadingMessage } = storeToRefs(geoLocationStore);
const { searchChoice, placeDetails } = storeToRefs(placesStore);

const debouncedFn = useDebounceFn((newValue) => {
  placesStore.getPlaces();
}, 1000);

function placeSearch() {
  debouncedFn();
}

watch(city, (newVal) => {
  if (newVal) {
    placesStore.$patch({
      placeDetails: [],
      searchChoice: "",
    });
  }
});

// watch(city, (newVal) => {
//   if (newVal) {
//     placeDetails.value = [];
//     searchChoice.value = "";
//   }
// });

watch(searchChoice, (newVal) => {
  if (newVal || !searchChoice.value) {
    placeDetails.value = [];
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
        @input="placeSearch"
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
