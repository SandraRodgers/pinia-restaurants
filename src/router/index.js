import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import { useRestaurantsStore } from "../stores/restaurants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView,
    },
    {
      path: "/restaurant/:id",
      name: "restaurant",
      component: RestaurantView,
      props: true,
    },
  ],
});

// router.beforeEach((to) => {
//   const restaurantsStore = useRestaurantsStore();
//   if (to.name === "home") restaurantsStore.resetRestaurantsStore();
// });

export default router;
