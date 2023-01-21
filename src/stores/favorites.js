import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import myFetch from "../helpers/myFetch";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    userFavorites: [],
  }),
  actions: {
    async getFavorites() {
      const authStore = useAuthStore();

      myFetch("favorites").then((res) => {
        const userFav = res.response.value.favorites.filter((x) => {
          return x.user === authStore.user.username; // user from authStore
        });

        this.userFavorites = userFav;
      });
    },

    async addToFavorites(restaurant_name, place_id, address, phone_number) {
      const authStore = useAuthStore();
      const username = authStore.user.username;
      if (!username) {
        alert("Please log in to save favorites");
      }
      const body = {
        user: username,
        restaurant_name,
        place_id,
        address,
        phone_number,
      };

      myFetch("favorites", "POST", body).then((res) => {
        alert("Your favorite has been added");
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
