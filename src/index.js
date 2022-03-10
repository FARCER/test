import './style.css'

const temp = require('./temperature.json');
const precipitation = require('./precipitation.json');

console.log(temp)

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
    let data = temp.splice(0, 1000);
    console.log(db)
    temp.forEach(day => addToStore(day));
  }

  function addToStore(day) {
    const request = db.transaction('temperature', 'readwrite').objectStore('temperature').add(day);

    request.onsuccess = () => {
      console.log(`New student added, email: ${request.result}`);
    }
    request.onerror = (err) => {
      console.error(`Error to add new student: ${err}`)
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


const WIDTH = 600;
const HEIGHT = 200;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;

function chart(canvas, data) {
  const ctx = canvas.getContext('2d');
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  ctx.beginPath();
  for (const [x, y] of data) {
    ctx.lineTo(x, DPI_HEIGHT - y);
    ctx.stroke();
  }

  ctx.closePath();

}

chart(document.getElementById('view'), [[0, 0], [200, 200], [400, 100]])
