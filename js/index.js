var markers = [];
var infoWindow;
function initMap() {
    // Create the map.
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: -6.7924, lng: 39.2083},
    });
    infoWindow = new google.maps.InfoWindow;
    showStoresMarkers();
    displayStores();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Your Location');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);

    
}
function createMarker(latlng, name, address) {
    var html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}

function displayStores() {
    var storesHtml = "";
    stores.forEach(function(store, index){
        var address = store.addressLines;
        var phone = store.phoneNumber;
        storesHtml += `
        <div class="adress-container">
            <div class="store-adress">
                <div class="adress-info">
                    <span>${address[0]}</span>
                    <span>${address[1]}</span>
                    </div>
                <div class="adress-pnumber">${phone}</div>
            </div>
            <div class="store-index">${index+1}</div>
        
        </div>
        `
    });
    document.querySelector('.adress-list').innerHTML = storesHtml;
}


