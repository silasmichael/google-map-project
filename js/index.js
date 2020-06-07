var markers = [];
var infoWindow;
var map;
function initMap() {
    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6.5,
        center: {lat: -6.3690, lng: 34.8888},
    });
    infoWindow = new google.maps.InfoWindow;
    displayuniversities();
    displayuniversitiesMarker();
}

function displayuniversities() {
    var universitiesHtml = "";
    universities.forEach(function(universities, index){
        var name = universities.name;
        var acronym = universities.acronym;
        var phone = universities.phoneNumber;
        var reg = universities.reg_no;
        universitiesHtml += `
        <div class="adress-container">
            <div class="universities-adress">
                <div class="adress-info">
                    <span>${name}</span>
                    <span>(${acronym})</span>
                    </div>
                <div class="adress-pnumber">${phone}</div>
            </div>
            <div class="universities-index">${reg}</div>
        
        </div>
        `
    });
    document.querySelector('.adress-list').innerHTML = universitiesHtml;
;     
}

function displayuniversitiesMarker(){
  universities.forEach(function(university,index){
    var latlng = new google.maps.LatLng(
      university.coordinates.latitude,
      university.coordinates.longitude);
      var name = university.name;
      var adress = university.address;
      var phoneNumber = university.phoneNumber;
      var acronym = university.acronym;
      var website = university.website;
      createMarker(latlng,name,adress,phoneNumber,acronym,website)
  })
}
function createMarker(latlng, name, address,phoneNumber,acronym,website) {
  var html = `
  <div class="info-window">
    <div class="info-name">${name}</div>
    <div class="info-acronym">(${acronym})</div>
    <div class="info-website">
     <div class = "circle">
        <i class="fa fa-internet-explorer" aria-hidden="true"></i>
      </div>${website}
    </div>
    <div class="info-phone">
      <div class = "circle">
        <i class="fa fa-phone" aria-hidden="true"></i></div>${phoneNumber}
    </div>
    <div class="info-adress">
      <div class = "circle">
        <i class="fa fa-location-arrow" aria-hidden="true"></i></div>${address}
  </div>
  `;
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

function yourLocation() {
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

