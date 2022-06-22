import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    renderLocsTable(locs)
    console.log('Locations:', locs)

  })
}

function renderLocsTable(locs){
  Promise.all([...locs]).then((locs) => {
    
    const strHTMLs = locs.map((loc)=>
      `<tbody>
      <td>${loc.id}</td>
      <td>${loc.name}</td>
      <td>${loc.lat}</td>
      <td>${loc.lng}</td>
      <td>${loc.weather}</td>
      <td>${loc.createdAt}</td>
      <td>${loc.updatedAt}</td>
      <td><button onclick="">GO</button></td>
      <td><button onclick="">DELETE</button></td>
      </tbody>`
      )
      console.log('losc',locs)
      document.querySelector(".locs-table").innerHTML = strHTMLs.join("")
      document.querySelector(".table").style.display = 'inline'
})
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords)
      document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo() {
  console.log('Panning the Map to tokio')
  mapService.panTo(35.6895, 139.6917)
}

