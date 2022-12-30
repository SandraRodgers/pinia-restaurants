import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useGeolocation } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import useFetch from "../composables/useFetch";

const { coords } = useGeolocation();

export const useGeoLocationStore = defineStore("geolocation", () => {
  const city = ref("");
  const state = ref("");
  const zipcode = ref("");
  const latitude = ref("");
  const longitude = ref("");

  // Load user location automatically
  watch(
    () => coords.value,
    (newValue) => {
      if (newValue && !latitude.value) {
        getLocation(coords.value.latitude, coords.value.longitude);
      }
    }
  );
  // update to plugin like in https://github.com/posva/pinia-plugin-debounce
  const debouncedFn = useDebounceFn((newValue) => {
    getLatLong(newValue);
  }, 1000);

  // When user location entered manually
  watch(
    () => city.value,
    (newValue) => {
      if (newValue) {
        // need to debounce - don't make API call until after one second
        debouncedFn(newValue);
      }
    }
  );

  // getters
  const loadingMessage = computed(() => {
    if (!city.value) {
      return "Loading your city...";
    }
  });

  // actions

  //get latitude/longitude when text city name entered
  async function getLatLong(location) {
    const body = { location };
    useFetch("lat-long", "POST", body).then((res) => {
      latitude.value = res.response.value.results[0].geometry.location.lat;
      longitude.value = res.response.value.results[0].geometry.location.lng;
      getLocation(latitude.value, longitude.value);
    });
  }

  // get city/location information when latitude/longitude entered
  async function getLocation(latitude, longitude) {
    const body = { latitude, longitude };
    useFetch("geolocation", "POST", body).then((res) => {
      getCity(res.response.value.results);
    });
  }

  function getCity(results) {
    results.forEach((element) => {
      element.address_components.forEach((element2) => {
        element2.types.forEach((element3) => {
          switch (element3) {
            case "postal_code":
              zipcode.value = element2.long_name;
              break;
            case "administrative_area_level_1":
              state.value = element2.long_name;
              break;
            case "locality":
              city.value = element2.long_name;
              localStorage.setItem(
                "location",
                JSON.stringify({
                  city: city.value,
                  state: state.value,
                  zipcode: zipcode.value,
                })
              );
              break;
          }
        });
      });
    });
  }

  // in setup store, need to return the values to see them in devtools
  return {
    getLocation,
    loadingMessage,
    city,
    state,
    zipcode,
    coords,
    latitude,
    longitude,
  };
});
