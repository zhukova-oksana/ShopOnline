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
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {timeRemaining, seconds, minutes, hours, days}
  }
  const start = () => {
    const timer = getTimeRemaining();

    timerNumberDay.textContent = timer.days + declinationWork(timer.days, daysWords);
    // timerNumberDay.after(declinationWork(timer.days, daysWords));
    timerNumberHour.textContent = timer.hours + declinationWork(timer.hours, hoursWords);
    // timerNumberHour.after(declinationWork(timer.hours, hoursWords));
    timerNumberMin.textContent = timer.minutes + declinationWork(timer.minutes, minutesWords);
    // timerNumberMin.after(declinationWork(timer.minutes, minutesWords));
    timerNumberSec.textContent = timer.seconds + declinationWork(timer.seconds, secondsWords);
    // timerNumberSec.after(declinationWork(timer.seconds, secondsWords));

    let intervalID;
    if (timer.days < 1) {
      intervalID = setTimeout(start, 1000);
      timerBlockDay.style.display = 'none';
      timerBlockSec.style.display = 'block';
    } else {
      intervalID = setTimeout(start, 60000);
    }
    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalID);
      timerNumberDay.textContent = '0';
      timerNumberHour.textContent = '00';
      timerNumberMin.textContent = '00';
      timerNumberSec.textContent = '00';
    }
  };

  start();

};
timer('2022/11/29 21:47');
}
