import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import iconError from '/img/error.svg';

const startButton = document.querySelector('button[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
const daysElem = document.querySelector('span[data-days]');
const hoursElem = document.querySelector('span[data-hours]');
const minutesElem = document.querySelector('span[data-minutes]');
const secondsElem = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        timeout: 5000,
        iconUrl: iconError,
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.disabled = true;

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
    startButton.disabled = true;
    dateTimePicker.disabled = true;
  }
});

function startCountdown(endDate) {
  intervalId = setInterval(() => {
    const now = new Date();
    const timeDifference = endDate - now;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimer(0, 0, 0, 0);
      // iziToast.success({
      //   title: 'Success',
      //   message: 'Countdown finished!',
      // });
      dateTimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTimer(days, hours, minutes, seconds) {
  daysElem.textContent = addLeadingZero(days);
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
