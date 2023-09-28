function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let interval;

startBtnEl.addEventListener('click', onStart);
stopBtnEl.addEventListener('click', onStop);

function onStart(e) {
  interval = setInterval(callback, 1000);
  function callback() {
    e.target.disabled = true;
    stopBtnEl.disabled = false;
    bodyEl.style.backgroundColor = getRandomHexColor();
  }
}

function onStop(e) {
  e.target.disabled = true;
  startBtnEl.disabled = false;
  clearInterval(interval);
}
