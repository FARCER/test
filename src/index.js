import './style.css'
import { chart } from './js/chart';
import { getChartData } from './js/data';

const temp = require('./temperature.json');
const precipitation = require('./precipitation.json');


function init() {
  createYearsOptions();
  initDb()
}

function initDb() {
  let openDb = indexedDB.open('data', 1);
  let db;

  openDb.onupgradeneeded = () => {
    db = openDb.result;

    if (!db.objectStoreNames.contains('temperature')) {
      db.createObjectStore('temperature', {keyPath: 't'});
    }

  }

  openDb.onsuccess = () => {
    db = openDb.result;
    temp.forEach(day => addToStore(day));
    let tx = db.transaction('temperature', 'readonly');
    let store = tx.objectStore('temperature');
    let req = store.getAll()

    req.onsuccess = () => {
      console.log(req.result)
    }

    req.onerror = () => {
      console.log(req.result)
    }
  }

  function addToStore(day) {
    const request = db.transaction('temperature', 'readwrite').objectStore('temperature').add(day);

    request.onsuccess = () => {
    }
    request.onerror = (err) => {
    }
  }

}

function createYearsOptions() {
  const years = Array.from(new Set(temp.map(value => +value.t.split('-')[0])));
  const from = document.getElementById('from');
  const to = document.getElementById('to');
  years.forEach(year => {
    const element = document.createElement('option');
    element.textContent = year;
    element.setAttribute('value', year)
    from.append(element);
  })
  years.forEach(year => {
    const element = document.createElement('option');
    element.textContent = year;
    element.setAttribute('value', year)
    to.append(element);
  })
}

init();
chart(document.getElementById('view'), getChartData())


