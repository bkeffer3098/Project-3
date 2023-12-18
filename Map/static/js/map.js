// Creating the map object
let myMap = L.map("map", {
    center: [50, -50],
    zoom: 3
  });
  
// Adding the tile layer
let canvas = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  
// Load the JSON data.
let both = "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/all_sexes.json";
let female = "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/female.json";
let male = "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/male.json";
  
let countryMarkers = [];
let countryMale = [];
let countryFemale = [];
let countryLocation = [];

let greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let violetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

d3.json(both).then(function (data) {
  console.log(data);

  // Initial Map Layer
  for (let i = 0; i < data.length; i++) {
    try {
      if (data[i].Sex) {
        countryLocation.push([Number(data[i].Latitude), Number(data[i].Longitude)]);
        countryMarkers.push(
        L.marker(countryLocation[i],{icon: greenIcon}).bindPopup("<h1>" + data[i].Country + "</h1>" + "<h3>" + "Average years to live after age 60: </h3>" + "<h3>" + data[i]["Age Expectancy"] + " years </h3>")
      );}
      }
    catch(err){}
  }
  
  d3.json(male).then(function (data) {
    console.log(data);
  
    // Male Map Layer
    for (let i = 0; i < data.length; i++) {
      try {
        if (data[i].Sex) {
          countryLocation.push([Number(data[i].Latitude), Number(data[i].Longitude)]);
          countryMale.push(
          L.marker(countryLocation[i],{icon: redIcon}).bindPopup("<h1>" + data[i].Country + "</h1>" + "<h3>" + "Average years to live after age 60: </h3>" + "<h3>" + data[i]["Age Expectancy"] + " years </h3>")
        );}
        }
      catch(err){}
    }
    
    let maleLayer = L.layerGroup(countryMale);

    d3.json(female).then(function (data) {
      console.log(data);
    
      // Male Map Layer
      for (let i = 0; i < data.length; i++) {
        try {
          if (data[i].Sex) {
            countryLocation.push([Number(data[i].Latitude), Number(data[i].Longitude)]);
            countryFemale.push(
            L.marker(countryLocation[i],{icon: violetIcon}).bindPopup("<h1>" + data[i].Country + "</h1>" + "<h3>" + "Average years to live after age 60: </h3>" + "<h3>" + data[i]["Age Expectancy"] + " years </h3>")
          );}
          }
        catch(err){}
      }
      
      let femaleLayer = L.layerGroup(countryFemale);
      let maleLayer = L.layerGroup(countryMale);
      let bothLayer = L.layerGroup(countryMarkers);

      let baseMaps = {
        "Original View": canvas
      };
      
      // Overlays that can be toggled on or off
      let overlayMaps = {
        "Both Sexes": bothLayer,
        "Male" : maleLayer,
        "Female" : femaleLayer
      };
      
      L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
    });
  });
});