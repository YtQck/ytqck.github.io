if('serviceWorker' in navigator){
  navigator.serviceWorker
  .register("./scripts/serviceworker.js")
  .then(function(registration) {
    console.log("success!");
  })
  .catch(function(err){
    console.error("Installing the worker failed!:");
  })
}
