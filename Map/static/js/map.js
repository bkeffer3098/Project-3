// Creating the map object
let myMap = L.map("map", {
    center: [12, -15],
    zoom: 6
  });
  
  // Adding the tile layer
  let canvas = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
// Load the JSON data.
  let url = "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/LifeExpectancy.json";
  
let countryMarkers = [];
let countryLocation = [];

d3.json(url).then(function (data) {

  for (let i = 0; i < data.length; i++) {
    if (data[i].Latitude){
    countryLocation.push([data[i].Latitude, data[i].Longitude]);
    countryMarkers.push(
    L.marker(countryLocation[i]).bindPopup("<h1>" + data[i].Country + "</h1>").addTo(myMap)
      );
     }
// console.log(countryLocation);
    }
let countryLayer = L.layerGroup(countryMarkers);

let baseMaps = {
  "Original View": canvas
};

// Overlays that can be toggled on or off
// let overlayMaps = {
//   Country: countryLayer
// };

L.control.layers(baseMaps).addTo(myMap);

});


