import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { storeToRefs } from "pinia";
import useFetch from "../composables/useFetch";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    userFavorites: [],
  }),
  actions: {
    async getFavorites() {
      const authStore = useAuthStore();
      const { user } = storeToRefs(authStore);

      useFetch("favorites").then((res) => {
        const userFav = res.response.value.favorites.filter((x) => {
          return x.user === user.value.username;
        });

        this.userFavorites = userFav;
      });
    },

    async addToFavorites(restaurant_name, place_id, address, phone_number) {
      const authStore = useAuthStore();
      const { user } = storeToRefs(authStore);
      const username = user.value.username;
      const body = {
        user: username,
        restaurant_name,
        place_id,
        address,
        phone_number,
      };

      useFetch("favorites", "POST", body).then((res) => {
        return res;
      });
    },

    // currently just removes on client side. Need to remove from db
    async removeFavorite(place_id) {
      const updatedFavorites = this.userFavorites.filter((x) => {
        return x.place_id !== place_id;
      });
      this.userFavorites = updatedFavorites;
    },
  },
});
