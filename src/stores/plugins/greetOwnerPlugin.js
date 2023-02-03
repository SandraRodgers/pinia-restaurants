// we could use subscribe to do something when a certain state change occurs, such as a specific user logs in
export function greetOwnerPlugin(context) {
  context &&
    context.store.$subscribe((mutation, state) => {
      if (mutation.storeId === "auth") {
        console.log(context);
        if (state.user && state.user.username === "srodg") {
          alert("The owner is logged in.");
        }
      }
    });
}
