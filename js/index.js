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
    search();

}

function displayuniversities(uni) {
    var universitiesHtml = "";
    uni.forEach(function(un, index){
        var name = un.name;
        var acronym = un.acronym;
        var phone = un.phoneNumber;
        var reg = un.reg_no;
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

function displayuniversitiesMarker(uni){
  var bounds = new google.maps.LatLngBounds();
  uni.forEach(function(un,index){
    var latlng = new google.maps.LatLng(
      un.coordinates.latitude,
      un.coordinates.longitude);
      var name = un.name;
      var adress = un.address;
      var phoneNumber = un.phoneNumber;
      var acronym = un.acronym;
      var website = un.website;
      bounds.extend(latlng);
      createMarker(latlng,name,adress,phoneNumber,acronym,website)
  })
  map.fitBounds(bounds);
}
function createMarker(latlng, name, address,phoneNumber,acronym,website) {
  var html = `
  <div class="info-window">
    <div class="info-name">${name}</div>
    <div class="info-acronym">(${acronym})</div>
    <div class="info-website">
     <div class = "circle">
        <i class="fa fa-internet-explorer" aria-hidden="true" href="${website}"></i>
      </div><a href="${website}">${website}</a>
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

function search() {
  var found = [];
  var search = document.getElementById('uni-search').value;
  if (search) {
    universities.forEach(function(uni){
      if(search.toUpperCase()===uni.region.toUpperCase()){
        found.push(uni);
      }else if (search.toUpperCase()===uni.name.toUpperCase()){
        found.push(uni);
      }else if (search===uni.reg_no){
        found.push(uni);
      } 
    })
  } else{
    found=universities
  }
  clearLocations()
  displayuniversities(found);
  displayuniversitiesMarker(found);
  setOnClickListener();
}

function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}


function setOnClickListener() {
  var Elements = document.querySelectorAll('.adress-container');
  Elements.forEach(function(elem, index){
      elem.addEventListener('click', function(){
          google.maps.event.trigger(markers[index], 'click');
      })
  });
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

