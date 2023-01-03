import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router";
import useFetch from "../composables/useFetch";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    message: ref(""),
  }),
  getters: {
    userFirstName: (state) => {
      if (state.user) {
        return (
          state.user.name.charAt(0).toUpperCase() + state.user.name.slice(1)
        );
      }
    },
  },
  actions: {
    async register(createdName, createdUserName, createdPassword) {
      // TODO: add logic to check if account already exists
      const body = { createdName, createdUserName, createdPassword };
      useFetch("register", "POST", body).then((res) => {
        if (res.response.value.message) {
          this.message = res.response.value.message;
        } else {
          this.user = res.response.value;
          localStorage.setItem("user", JSON.stringify(this.user));
          router.push("/");
        }
      });
    },

    async login(username, password) {
      const body = { username, password };
      useFetch("login", "POST", body).then((res) => {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(res.response.value.user));
        this.user = JSON.parse(localStorage.getItem("user"));
        // redirect to home page
        router.push("/");
      });
    },
    logout() {
      // reset store to original state
      localStorage.removeItem("user");
      this.reset();
    },
    reset() {
      this.$reset();
      router.push("/");
    },
  },
});
