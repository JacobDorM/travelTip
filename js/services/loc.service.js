import { saveToStorage, loadFromStorage } from "./storage.service.js"

const STORAGE_KEY = "locsDB"

export const locService = {
  getLocs,
  addNewLoc,
  deleteLoc,
}

const locs = [
  {
    id: 0,
    name: "Greatplace",
    lat: 32.047104,
    lng: 34.832384,
    weather: "42🔥",
    createdAt: showTime(Date.now()),
    updatedAt: Date.now(),
  },
  {
    id: 1,
    name: "ramat gan",
    lat: 32.047201,
    lng: 34.832581,
    weather: "-10⛄",
    createdAt: showTime(Date.now()),
    updatedAt: Date.now(),
  },
  {
    id: 2,
    name: "sea",
    lat: 32.557201,
    lng: 34.832581,
    weather: "25🌞",
    createdAt: showTime(Date.now()),
    updatedAt: Date.now(),
  },
  {
    id: 3,
    name: "Neverland",
    lat: 37.557201,
    lng: 36.835681,
    weather: "15☔",
    createdAt: showTime(Date.now()),
    updatedAt: Date.now(),
  },
]

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}
function deleteLoc(locId) {
  locs.splice(locId, 1)
  console.log(locs)
}


function addNewLoc(newLoc){
  const location = {
    id:rand(1,50),
    name:newLoc.name,
    lat:newLoc.lat,
    lng:newLoc.lng,
    weather:rand(-20,40)+"🌈",
    createdAt:showTime(Date.now()),
    updatedAt:Date.now(),
  }
  locs.push(location)
  
  saveToStorage(STORAGE_KEY, locs)

}


saveToStorage(STORAGE_KEY, locs)



function rand(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function showTime(time) {
  var date = new Date(time)
  date = date.toString()
  //'Wed Jun 01 2022 15:10:52 GMT+0300 (Israel Daylight Time)'
  date = date.split(" ")
  //(9) ['Wed', 'Jun', '01', '2022', '15:10:52', 'GMT+0300', '(Israel', 'Daylight', 'Time)']
  date = date.splice(1, 4)
  //(5) ['Wed', 'Jun', '01', '2022', '15:10:52']

  return date
}
