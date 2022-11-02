'use strict';

{
  const daysWords = ['день', 'дня', 'дней'];
  const hoursWords = ['час', 'часа', 'часов'];
  const minutesWords = ['минута', 'минуты', 'минут'];
  const secondsWords = ['секунда', 'секунды', 'секунд'];

  const declinationWork = (num, words) => {
    let index;
    const num10 = num % 10;
    const num100 = num % 100;

    switch (true) {
      case num100 >= 10 && num100 <= 20: index = 2; break;
      case num10 === 1: index = 0; break;
      case num10 && num10 < 5: index = 1; break;
      default:
        index = 2;
    }

    return ` ${words[index]}`;
  };

const timer = deadline => {
  const timerBlockDay = document.querySelector('.time__text_day');
  const timerNumberDay = document.querySelector('.time__number_day');
  const timerBlockHour = document.querySelector('.time__text_hour');
  const timerNumberHour = document.querySelector('.time__number_hour');
  const timerBlockMin = document.querySelector('.time__text_min');
  const timerNumberMin = document.querySelector('.time__number_min');
  const timerBlockSec = document.querySelector('.time__text_sec');
  const timerNumberSec = document.querySelector('.time__number_sec');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dataTimeZone = new Date(deadline).getTimezoneOffset();
    // console.log('dat', dataTimeZone);
    // console.log('dat разница', dataTimeZone + 180);
    // console.log('dateStop', dateStop - ((dataTimeZone + 180) * 60 * 1000));
    const dateStopNew = dateStop - ((dataTimeZone + 180) * 60 * 1000);

    const dateNow = Date.now();
    const timeRemaining = dateStopNew - dateNow;

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {timeRemaining, seconds, minutes, hours, days}
  };

  // const createTimer = (obj, atr) => {
  //   const timerContainer = document.querySelectorAll(atr);
  //   console.log(timerContainer);
  //   timerContainer.innerHTML = `
  //     <p class="time__text time__text_day"><span class="time__number time__number_day">${obj.day}</span> ${obj.dayWord}</p>
  //     <p class="time__text time__text_hour"><span class="time__number time__number_hour">${obj.hour}</span> ${obj.hourWord}</p>
  //     <p class="time__text time__text_min"><span class="time__number time__number_min">${obj.min}</span> ${obj.minuteWord}</p>
  //     <p class="time__text time__text_sec visually-hidden"><span class="time__number time__number_sec">${obj.sec}</span> ${obj.secondWord}</p>`
  // }

  const twoNumbers = (num) => ((num < 10) ? '0' + num : num);

  const start = () => {
    const timer = getTimeRemaining();

    timerNumberDay.textContent = timer.days;
    timerBlockDay.innerHTML = timerNumberDay.outerHTML + declinationWork(timer.days, daysWords);

    timerNumberHour.textContent = twoNumbers(timer.hours);
    timerBlockHour.innerHTML = declinationWork(timer.hours, hoursWords);

    timerNumberMin.textContent = twoNumbers(timer.minutes);
    timerBlockMin.innerHTML = timerNumberMin.outerHTML + declinationWork(timer.minutes, minutesWords);

    timerNumberSec.textContent = twoNumbers(timer.seconds);
    timerBlockSec.innerHTML = timerNumberSec.outerHTML + declinationWork(timer.seconds, secondsWords);

    let intervalID;
    if (timer.days < 1) {
      intervalID = setTimeout(start, 1000);
      timerBlockDay.classList.add('visually-hidden');
      timerBlockSec.classList.remove('visually-hidden');
    } else {
      intervalID = setTimeout(start, 60000);
    };

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalID);
      timerNumberDay.textContent = '00';
      timerNumberHour.textContent = '00';
      timerNumberMin.textContent = '00';
      timerNumberSec.textContent = '00';
      const period = document.querySelector('.period');
      period.classList.add('visually-hidden');
    };

    // return {
    //
    // }

  };

  // const times = start();
  // createTimer(times, '[data-deadline]');
};

const deadline = document.querySelector('.time');
timer(deadline.getAttribute('data-deadline'));

}
