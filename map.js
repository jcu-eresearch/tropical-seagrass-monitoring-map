/*jslint browser: true */
/*global mapData, google, MarkerWithLabel */
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisArg, t[i], i, t);
    }
  };
}

var map;
function initialize() {
    "use strict";

    var infowindow = new google.maps.InfoWindow(),
        markers = {},
        category,
        mapOptions = {
            backgroundColor: 'white',
            center: new google.maps.LatLng(-19.739091, 144.045868),
            mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
            maxZoom: 8,
            minZoom: 4,
            panControl: false,
            rotateControl: false,
            streetViewControl: false,
            tilt: 0,
            zoom: 5,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
                style: google.maps.ZoomControlStyle.LARGE
            }
        };

    map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

    mapData.forEach(function(item) {
        var marker = new MarkerWithLabel({
            map: map,
            position: new google.maps.LatLng(item.lat, item.lng),
            icon: item.icon,
            title: item.title,
            labelContent: item.title,
            labelAnchor: new google.maps.Point(-20, 25),
            labelClass: 'labels'
        });
        marker.category = item.category;
        google.maps.event.addListener(marker, 'click', function() {
            var description = item.description || '';
            infowindow.setContent('<h2>' + item.title + '</h2>' + description);
            infowindow.open(map, marker);
            // Return to original map centring
            var original_centre = map.getCenter();
            google.maps.event.addListener(infowindow, 'closeclick', function() {
                map.setCenter(original_centre);
            });
        });

        if (markers.hasOwnProperty(marker.category)) {
            markers[marker.category].push(marker);
        } else {
            markers[marker.category] = [marker];
        }
    });

    // Create listing of markers with interactivity
    var markersList, marker_index, marker, listItem, icon, heading;
    var markersDiv = document.createElement('div');
    function createTrigger(marker) {
        return function() {
            google.maps.event.trigger(marker, 'click');
            map.panTo(marker.position);
        };
    }
    markersDiv.className = 'markers';
    for (category in markers) {
        if (markers.hasOwnProperty(category)) {
            heading = document.createElement('h2');
            heading.innerHTML = category;
            markersDiv.appendChild(heading);
            markersList = document.createElement('ul');
            for (marker_index in markers[category]) {
                if (markers[category].hasOwnProperty(marker_index)) {
                    marker = markers[category][marker_index];
                    listItem = document.createElement('li');
                    if (marker.icon) {
                        icon = document.createElement('img');
                        icon.src = marker.icon;
                        listItem.appendChild(icon);
                    }
                    listItem.innerHTML += marker.title;
                    google.maps.event.addDomListener(listItem, 'click', createTrigger(marker));
                    markersList.appendChild(listItem);
                }
            }
            markersDiv.appendChild(markersList);
        }
    }
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(markersDiv);

    // Add map legend
    var legendDiv = document.createElement('div');
    legendDiv.className = 'legend';
    var legendImage = document.createElement('img');
    legendImage.src = 'legend.png';
    legendDiv.appendChild(legendImage);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendDiv);

    // Restrict boundaries to Australia
    var strictBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-44.847430, 120.444497),
        new google.maps.LatLng(-7.361558, 157.729654)
    );
    google.maps.event.addListener(map, 'center_changed', function() {
        if (strictBounds.contains(map.getCenter())) { return; }
        var c = map.getCenter(),
            x = c.lng(),
            y = c.lat(),
            maxX = strictBounds.getNorthEast().lng(),
            maxY = strictBounds.getNorthEast().lat(),
            minX = strictBounds.getSouthWest().lng(),
            minY = strictBounds.getSouthWest().lat();

        if (x < minX) { x = minX; }
        if (x > maxX) { x = maxX; }
        if (y < minY) { y = minY; }
        if (y > maxY) { y = maxY; }

        map.setCenter(new google.maps.LatLng(y, x));
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
