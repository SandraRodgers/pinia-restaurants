import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import { pluginOne } from "./stores/plugins/pluginOne";
import { pluginTwo } from "./stores/plugins/pluginTwo";
import { greetOwnerPlugin } from "./stores/plugins/greetOwnerPlugin";
import { greetUserPlugin } from "./stores/plugins/greetUserPlugin";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// PLUGINS

// if we setup the plugin as an option, it can be enabled in the store. This could be useful if we make an open source plugin, so I could write this logic in my plugin package. Users could install it and bring it in to use it, and enable it in their store
// pinia.use(({ options, store }) => {
//   if (options.greeting) {
//     store.$onAction((action) => {
//       switch (action.name) {
//         case "login":
//           alert("Welcome back to Pinia Restaurants!");
//           break;
//         case "logout":
//           alert("Hope you enjoyed Pinia Restaurants!");
//           break;
//         case "register":
//           alert("Welcome to Pinia Restaurants!");
//           break;
//       }
//     });
//   }
// });

pinia.use(pluginOne);
pinia.use(pluginTwo);
pinia.use(greetOwnerPlugin);
pinia.use(greetUserPlugin);
app.mount("#app");
