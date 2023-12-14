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
  let url = "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/LifeExpectancy.json";
  
let countryMarkers = [];
let countryLocation = [];
let countryBoth = [];

d3.json(url).then(function (data) {
  console.log(data);

  // Initial Map Layer
  for (let i = 0; i < data.length; i++) {
    try {
      countryLocation.push([Number(data[i].Latitude), Number(data[i].Longitude)]);
      countryMarkers.push(
      L.marker(countryLocation[i]).bindPopup("<h1>" + data[i].Country + "</h1>").addTo(myMap)
      );}
    catch(err){}
  }
  
  // Layer centered around Both Sexes
  for (let i = 0; i < data.length; i++) {
    if (data[i].HALE == "Healthy life expectancy (HALE) at birth (years)")
    countryBoth.push(
      L.marker(countryLocation[i]).bindPopup("<h1>" + data[i].Country + "</h1>" + "<h2>" + "Age Expectancy:" + data[i]["Age Expectancy"] + "</h2>").addTo(myMap)
    );}

    console.log(countryBoth);
    });
  
// let bothLayer = L.layerGroup(countryBoth);

let baseMaps = {
  "Original View": canvas
};

// Overlays that can be toggled on or off
let overlayMaps = {
  
};

L.control.layers(baseMaps, overlayMaps).addTo(myMap);


