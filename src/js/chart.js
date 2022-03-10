const WIDTH = 600;
const HEIGHT = 200;

function chart(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';

}

chart(document.getElementById('view'))
