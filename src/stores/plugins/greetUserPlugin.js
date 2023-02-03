// // We could use $onAction in a plugin to watch for certain state changes, then perform a side effect

export function greetUserPlugin({ store, options }) {
  if (options.greeting && options.greeting.enabled) {
    store.$onAction(({ name, after }) => {
      if (store.$id === "auth") {
        switch (name) {
          case "login":
            after(() => {
              alert("Welcome back to Pinia Restaurants!");
            });
            break;
          case "logout":
            after(() => {
              alert("Hope you enjoyed Pinia Restaurants!");
            });
            break;
          case "register":
            after(() => {
              alert("Welcome to Pinia Restaurants!");
            });
            break;
        }
      }
    });
  }
}
