import { ref } from "vue";
import { defineStore } from "pinia";
import useFetch from "../composables/useFetch";
import { useGeoLocationStore } from "./geolocation";
import { storeToRefs } from "pinia";

export const usePlacesStore = defineStore("places", () => {
  const locationStore = useGeoLocationStore(); // This has to be inside the setup function
  const { coords, latitude, longitude } = storeToRefs(locationStore);
  const searchChoice = ref("");
  const placeDetails = ref([]);
  const singlePlace = ref({});
  const textSearchResults = ref([]);
  const loading = ref(false);

  // get list of relevant places
  async function getPlaces() {
    loading.value = true;
    placeDetails.value = []; // reset to empty

    const lat = latitude.value || coords.value.latitude;
    const long = longitude.value || coords.value.longitude;
    const search = searchChoice.value;
    const body = { lat, long, search };

    useFetch("find-place", "POST", body) // composable
      .then((res) => {
        loading.value = false;
        textSearchResults.value = res.response.value;
        return res;
      })
      .then((result) => {
        for (let i = 0; i < result.response.value.results.length; i++) {
          const place = result.response.value.results[i];
          getPlaceDetails(place.place_id);
        }
      });
  }

  // get rating, reviews, other info about each place (using Google Maps place_id)
  async function getPlaceDetails(place_id) {
    const body = { place_id };
    useFetch("place-details", "POST", body).then((res) => {
      placeDetails.value.push(res.response.value.result);
    });
  }

  // get single place for individual restaurant page
  function getSinglePlaceDetails(place_id) {
    if (placeDetails.value.length) {
      const foundPlace = placeDetails.value.find((x) => {
        return x.place_id === place_id;
      });
      if (foundPlace) {
        singlePlace.value = foundPlace;
      } else {
        const body = { place_id };
        useFetch("place-details", "POST", body).then((res) => {
          singlePlace.value = res.response.value.result;
        });
      }
    } else {
      const body = { place_id };
      useFetch("place-details", "POST", body).then((res) => {
        singlePlace.value = res.response.value.result;
      });
    }
  }

  function resetPlacesStore() {
    searchChoice.value = "";
    placeDetails.value = [];
    singlePlace.value = {};
    textSearchResults.value = [];
    loading.value = false;
  }

  return {
    searchChoice,
    getPlaces,
    textSearchResults,
    placeDetails,
    getSinglePlaceDetails,
    singlePlace,
    getPlaceDetails,
    loading,
    resetPlacesStore,
  };
});
