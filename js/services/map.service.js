import { locService } from "./loc.service.js"

export const mapService = {
  initMap,
  addMarker,
  panTo,
}

var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')

  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })

    //on click map return location
     gMap.addListener('click', (mapsMouseEvent) => {
      const userPosition = mapsMouseEvent.latLng.toJSON()
      const newLocName = prompt('enter your location name...')
      const newLoc = {
        name:newLocName,
        lat : userPosition.lat,
        lng : userPosition.lng,
      }
      
      locService.addNewLoc(newLoc)
    })

    // console.log('locs',locs)
    console.log('Map!', gMap)
  })
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyAVHxe2zbm4vxjtZhAbTmVnhLjbGuGrVK0'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}
