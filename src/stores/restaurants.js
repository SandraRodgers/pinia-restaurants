import { ref } from "vue";
import { defineStore } from "pinia";
import myFetch from "../helpers/myFetch";
import { useGeoLocationStore } from "./geolocation";

export const useRestaurantsStore = defineStore("restaurants", () => {
  const locationStore = useGeoLocationStore(); // This has to be inside the setup function
  const searchChoice = ref("");
  const restaurantDetails = ref([]);
  const singleRestaurant = ref({});
  const textSearchResults = ref([]);
  const loading = ref(false);

  // get list of relevant restaurants
  async function getRestaurants() {
    loading.value = true;
    restaurantDetails.value = []; // reset to empty

    const lat = locationStore.latitude || locationStore.coords.value.latitude;
    const long =
      locationStore.longitude || locationStore.coords.value.longitude;
    const search = searchChoice.value;
    const body = { lat, long, search }; // uses data from locationStore to make this request
    myFetch("find-restaurant", "POST", body)
      .then((res) => {
        loading.value = false;
        textSearchResults.value = res.response.value;
        return res;
      })
      .then((result) => {
        for (let i = 0; i < result.response.value.results.length; i++) {
          const restaurant = result.response.value.results[i];
          getRestaurantDetails(restaurant.place_id);
        }
      });
  }

  // get rating, reviews, other info about each place (using Google Maps place_id)
  async function getRestaurantDetails(place_id) {
    const body = { place_id };
    myFetch("restaurant-details", "POST", body).then((res) => {
      restaurantDetails.value.push(res.response.value.result);
    });
  }

  // get single place for individual restaurant page
  function getSingleRestaurantDetails(place_id) {
    if (restaurantDetails.value.length) {
      const foundPlace = restaurantDetails.value.find((x) => {
        return x.place_id === place_id;
      });
      if (foundPlace) {
        singleRestaurant.value = foundPlace;
      } else {
        const body = { place_id };
        myFetch("restaurant-details", "POST", body).then((res) => {
          singleRestaurant.value = res.response.value.result;
        });
      }
    } else {
      const body = { place_id };
      myFetch("restaurant-details", "POST", body).then((res) => {
        singleRestaurant.value = res.response.value.result;
      });
    }
  }

  function resetRestaurantsStore() {
    searchChoice.value = "";
    restaurantDetails.value = [];
    singleRestaurant.value = {};
    textSearchResults.value = [];
    loading.value = false;
  }

  return {
    searchChoice,
    getRestaurants,
    textSearchResults,
    restaurantDetails,
    getSingleRestaurantDetails,
    singleRestaurant,
    getRestaurantDetails,
    loading,
    resetRestaurantsStore,
  };
});
