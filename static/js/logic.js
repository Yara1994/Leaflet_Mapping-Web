
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// read the Geojson file

d3.json(queryUrl, function(data){
   ///store coordinates, magnitudes of each earthquake
   
   console.log(data.features)


    // create map

    var myMap = L.map("map", {
        center: [40.7608, -111.8910],
        zoom: 4
    });
  
    // add tile layer (light map) 

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    }).addTo(myMap);

    for (var i = 0; i < data.features.length; i++) {
        if (data.features[i].properties.mag >= 5) {
            quakeColor = "#f76848"
        }
        else if (data.features[i].properties.mag >= 4) {
            quakeColor = "#ffac40"
        }
        else if (data.features[i].properties.mag >= 3) {
            quakeColor = "#e8cc6f"
        }
        else if (data.features[i].properties.mag >= 2) {
            quakeColor = "#e8e86f"
        }
        else if (data.features[i].properties.mag >= 1) {
            quakeColor = "#b5de7c"
        }
        else {
            quakeColor = "#aef571"
        };


    L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: "black",
        weight: 0.5,
        fillColor: quakeColor,
        radius: data.features[i].properties.mag * 35000
      }).bindPopup("<h1>" + data.features[i].properties.place +
      "</h1><hr><h2>" + new Date(data.features[i].properties.time)  +      
      "  Magnitude : " +   data.features[i].properties.mag + "</h2>").addTo(myMap);
    }
  

    // Legend 

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
    
        var div = L.DomUtil.create('div', 'info legend'),
            magnitudes = [0, 1, 2, 3, 4, 5];
            colors = ["#aef571", "#b5de7c", "#e8e86f", "#e8cc6f", "#ffac40", "#f76848"]

        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +=
                '<i style=" background:' + colors[i] + '"></i>' 
        + magnitudes[i]+ (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
        }
    
        return div;
    };
    
    legend.addTo(myMap);
 

})