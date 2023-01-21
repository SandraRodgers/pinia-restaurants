import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/index.css";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

// PLUGINS

// create a property that can be used in the stores
function pluginOne() {
  return {
    message: "Just a simple string",
  };
}

// create a method that can be used in the stores
function pluginTwo(context) {
  return {
    logContext: function () {
      console.log(context);
    },
  };
}

// we could use subscribe to do something when a certain state change occurs, such as a specific user logs in
function greetOwnerPlugin({ store }) {
  store.$subscribe((mutation, state) => {
    if (mutation.storeId === "auth") {
      if (state.user && state.user.username === "srodg") {
        alert("The owner is logged in.");
      }
    }
  });
}

function greetUserPlugin({ store, options }) {
  if (options.greeting && options.greeting.enabled) {
    store.$onAction((action) => {
      switch (action.name) {
        case "login":
          alert("Welcome back to Pinia Restaurants!");
          break;
        case "logout":
          alert("Hope you enjoyed Pinia Restaurants!");
          break;
        case "register":
          alert("Welcome to Pinia Restaurants!");
          break;
      }
    });
  }
}

// if we setup the plugin as an option, it can be enabled in the store. This could be useful if we make an open source plugin, so I could write this logic in my plugin package. Users could install it and bring it in to use it, and enable it in their store
pinia.use(({ options, store }) => {
  if (options.greeting) {
    store.$onAction((action) => {
      switch (action.name) {
        case "login":
          alert("Welcome back to Pinia Restaurants!");
          break;
        case "logout":
          alert("Hope you enjoyed Pinia Restaurants!");
          break;
        case "register":
          alert("Welcome to Pinia Restaurants!");
          break;
      }
    });
  }
});

pinia.use(pluginOne);
pinia.use(pluginTwo);
pinia.use(greetOwnerPlugin);
pinia.use(greetUserPlugin);

app.mount("#app");
