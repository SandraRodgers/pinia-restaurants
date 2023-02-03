// create a method that can be used in the stores
export function pluginTwo(context) {
  return {
    logContext: function () {
      console.log(context);
    },
  };
}
