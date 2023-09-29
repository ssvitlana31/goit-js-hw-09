import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let userDate = null;
const onStartTimer = () => {
  if (!userDate) {
    return;
  }
  const startBtnInterval = setInterval(() => {
    const dateDifference = userDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(dateDifference);
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
    startBtnEl.disabled = true;
    if (dateDifference < 1000) {
      clearInterval(startBtnInterval);
      startBtnEl.disabled = false;
      daysEl.textContent = 0;
      hoursEl.textContent = 0;
      minutesEl.textContent = 0;
      secsEl.textContent = 0;
    }
  }, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.now() >= selectedDates[0]) {
      return onDateNotValid();
    }
    startBtnEl.disabled = false;
    userDate = selectedDates[0];
  },
};

flatpickr(inputEl, options);

startBtnEl.disabled = true;

function onDateNotValid() {
  window.alert('The date is not valid. Choose a date in the future please. ');
}

startBtnEl.addEventListener('click', onStartTimer);
