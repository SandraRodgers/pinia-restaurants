import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useGeolocation } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import myFetch from "../helpers/myFetch";

export const useGeoLocationStore = defineStore("geolocation", () => {
  const { coords } = useGeolocation();
  const city = ref("");
  const latitude = ref("");
  const longitude = ref("");

  // Load user location automatically when they land on the page
  watch(
    () => coords.value,
    (newValue) => {
      if (newValue && !latitude.value) {
        // when user's coordinates load, get location data to pull city name
        getLocation(coords.value.latitude, coords.value.longitude);
      }
    }
  );

  // Debounce to wait until user finishes typing
  const debouncedGetLatLong = useDebounceFn((inputedCity) => {
    getLatLong(inputedCity);
  }, 1000);

  // When user city name is entered manually, we need to trigger getLatLong (see debouncedGetLatLong above)
  watch(
    () => city.value,
    (inputedCity) => {
      if (inputedCity) {
        // need to debounce - don't make API call until after one second
        debouncedGetLatLong(inputedCity);
      }
    }
  );

  // actions

  //get latitude/longitude when text city name entered
  async function getLatLong(location) {
    const body = { location };
    myFetch("lat-long", "POST", body).then((res) => {
      latitude.value = res.response.value.results[0].geometry.location.lat;
      longitude.value = res.response.value.results[0].geometry.location.lng;
      getLocation(latitude.value, longitude.value);
    });
  }

  // get city/location information when latitude/longitude entered
  async function getLocation(latitude, longitude) {
    const body = { latitude, longitude };
    // post to server file where request to google maps API is made
    myFetch("geolocation", "POST", body).then((res) => {
      getCity(res.response.value.results);
    });
  }

  function getCity(results) {
    // turn google maps API response into just city name
    results.forEach((element) => {
      element.address_components.forEach((element2) => {
        element2.types.forEach((element3) => {
          if (element3 === "locality") {
            city.value = element2.long_name;
          }
        });
      });
    });
  }

  // getters
  const loadingMessage = computed(() => {
    if (!city.value) {
      return "Loading your city...";
    } else {
      return "";
    }
  });

  // in setup store, we need to return the values
  return {
    getLocation,
    loadingMessage,
    city,
    coords,
    latitude,
    longitude,
  };
});
