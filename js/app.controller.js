import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onDeleteLoc = onDeleteLoc
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onCodeAddress = onCodeAddress

window.onCopyGithubPages = onCopyGithubPages
function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
      const params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop) })
      if (params.lat !== null && params.lng !== null) onPanTo(params.lat, params.lng)
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

function onCodeAddress() {
  mapService.codeAddress()
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

function renderLocsTable(locs) {
  Promise.all([...locs]).then((locs) => {
    const strHTMLs = locs.map(
      (loc) =>
        `<tr class="loc-table${loc.id}">
      <td>${loc.id}</td>
      <td>${loc.name}</td>
      <td>${loc.lat}</td>
      <td>${loc.lng}</td>
      <td>${loc.weather}</td>
      <td>${loc.createdAt}</td>
      <td>${loc.updatedAt}</td>
      <td><button onclick="onPanTo('${loc.lat}','${loc.lng}')">GO</button></td>
      <td><button onclick="onDeleteLoc('${loc.id}')">DELETE</button></td>
      </tr>`
    )
    console.log('losc', locs)
    document.querySelector('.loc-table').innerHTML = strHTMLs.join('')
    document.querySelector('.table').style.display = 'inline'
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      onPanTo(pos.coords.latitude, pos.coords.longitude)
      //   document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo(lat, lng) {
  mapService.panTo(lat, lng)
}

function onDeleteLoc(locId) {
  document.querySelector(`.loc-table${locId}`).innerHTML = ''
  locService.deleteLoc(locId)
}

function onCopyGithubPages() {
  navigator.clipboard.writeText('https://jacobdorm.github.io/travelTip?lat=32.557201&lng=34.832581')
}
