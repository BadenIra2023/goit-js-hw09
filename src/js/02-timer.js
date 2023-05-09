import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTime = document.querySelector("#datetime-picker");
const dateStart = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

dateTime.addEventListener("input", getDate);
dateStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - options.defaultDate > 0) {
      dateStart.disabled = false;
      dateStart.addEventListener("click", buttonStart);
    }
    else {
      dateStart.disabled = true
      Notify.failure('Please choose a date in the future', {
        timeout: 2000,
        width: '500px',
      })
    };
    function buttonStart(event) {
      setInterval(() => { 
       const currentDate = new Date(); 
        if (selectedDates[0] - currentDate > 0) {
      const difDate = selectedDates[0] - currentDate;
          dateStart.disabled = true;
          
    dataDays.textContent = addLeadingZero(convertMs(difDate).days.toString() )
    dataHours.textContent = addLeadingZero(convertMs(difDate).hours.toString() )
    dataMinutes.textContent = addLeadingZero(convertMs(difDate).minutes.toString() )
    dataSeconds.textContent = addLeadingZero(convertMs(difDate).seconds.toString() )
    }  }, 1000 )
    }
  },
};
flatpickr(dateTime, options)

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function getDate(event) {
    
}
 
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
