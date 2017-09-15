require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/TileLayer",
  "dojo/dom",
  "dojo/on",
  "dojo/domReady!"
], 
function(
    Map, MapView, TileLayer, dom, on
    ){

  var studyArea = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/GL0fWlNkwysZaKeV/arcgis/rest/services/UrbanizeArea/MapServer",
    id: "studyArea",
    opacity: 0.7
  })

  var busStopLyr = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/GL0fWlNkwysZaKeV/arcgis/rest/services/Publish/MapServer",
    id: "busStop",
    opacity: 0.7
  });

  var primaryCareLyr = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/GL0fWlNkwysZaKeV/arcgis/rest/services/Webpage/MapServer",
    id: "primaryCare",
    opacity: 0.7
  })

  var jobCenterLyr = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/GL0fWlNkwysZaKeV/arcgis/rest/services/Job/MapServer",
    id: "jobCenter",
    opacity: 0.7
  })

  var openSpacesLyr = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/GL0fWlNkwysZaKeV/arcgis/rest/services/openSpaces/MapServer",
    id: "openSpaces",
    opacity: 0.7
  })

  var crimeLyr = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/GL0fWlNkwysZaKeV/arcgis/rest/services/Crime/MapServer",
    id: "openSpaces",
    opacity: 0.7
  })



  //creating the new base map
  var map = new Map({
    basemap: "streets"
  });

  map.layers.add(studyArea);
  map.layers.add(busStopLyr);
  busStopLyr.visible = false;
  map.layers.add(primaryCareLyr);
  primaryCareLyr.visible = false;
  map.layers.add(jobCenterLyr);
  jobCenterLyr.visible = false;
  map.layers.add(openSpacesLyr);
  openSpacesLyr.visible=false;
  map.layers.add(crimeLyr);
  crimeLyr.visible=false;

  var view = new MapView({
    container: "viewDiv",  // Reference to the scene div created in step 5
    map: map,  // Reference to the map object created before the scene
    zoom: 13,  // Sets the zoom level based on level of detail (LOD)
    center: [-88.2434, 40.1164]  // Sets the center point of view in lon/lat
  });


  // Create a variable referencing the checkbox node
  var busLyrToggle = dom.byId("busStopCheckBox");

  // Listen to the onchange event for the checkbox
  on(busLyrToggle, "change", function(){
    // When the checkbox is checked (true), set the layer's visibility to true
    busStopLyr.visible = busLyrToggle.checked; 
  });

    // Create a variable referencing the checkbox node
  var primaryToggle = dom.byId("primaryCareCheckBox");

  // Listen to the onchange event for the checkbox
  on(primaryToggle, "change", function(){
    // When the checkbox is checked (true), set the layer's visibility to true
    primaryCareLyr.visible = primaryToggle.checked; 
  });


  var jobCenterToggle = dom.byId("jobCenterCheckBox");

  // Listen to the onchange event for the checkbox
  on(jobCenterToggle, "change", function(){
    // When the checkbox is checked (true), set the layer's visibility to true
    jobCenterLyr.visible = jobCenterToggle.checked; 
  });


  var openSpacesToggle = dom.byId("openSpacesCheckBox");

  // Listen to the onchange event for the checkbox
  on(openSpacesToggle, "change", function(){
    // When the checkbox is checked (true), set the layer's visibility to true
    openSpacesLyr.visible = openSpacesToggle.checked; 
  });

  var crimeToggle = dom.byId("crimeRateCheckBox");

  // Listen to the onchange event for the checkbox
  on(crimeToggle, "change", function(){
    // When the checkbox is checked (true), set the layer's visibility to true
    crimeLyr.visible = crimeToggle.checked; 
  });

});