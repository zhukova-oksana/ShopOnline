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
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dataTimeZone = new Date(deadline).getTimezoneOffset();
    const dateStopNew = dateStop - ((dataTimeZone + 180) * 60 * 1000);

    const dateNow = Date.now();
    const timeRemaining = dateStopNew - dateNow;

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {timeRemaining, seconds, minutes, hours, days}
  };

  const createTimer = (obj, timerContainer) => {
    if (obj.day < 1) {
      timerContainer.innerHTML = `
      <p class="period__text">До конца акции:</p>
      <div class="time">
        <p class="time__text time__text_day visually-hidden"><span class="time__number time__number_day">${obj.day}</span> ${obj.dayWord}</p>
        <p class="time__text time__text_hour"><span class="time__number time__number_hour">${obj.hour}</span> ${obj.hourWord}</p>
        <p class="time__text time__text_min"><span class="time__number time__number_min">${obj.minute}</span> ${obj.minuteWord}</p>
        <p class="time__text time__text_sec"><span class="time__number time__number_sec">${obj.second}</span> ${obj.secondWord}</p>
      </div>`;
    } else {
      timerContainer.innerHTML = `
      <p class="period__text">До конца акции:</p>
      <div class="time">
        <p class="time__text time__text_day"><span class="time__number time__number_day">${obj.day}</span> ${obj.dayWord}</p>
        <p class="time__text time__text_hour"><span class="time__number time__number_hour">${obj.hour}</span> ${obj.hourWord}</p>
        <p class="time__text time__text_min"><span class="time__number time__number_min">${obj.minute}</span> ${obj.minuteWord}</p>
        <p class="time__text time__text_sec visually-hidden"><span class="time__number time__number_sec">${obj.second}</span> ${obj.secondWord}</p>
      </div>`;
    }

    return timerContainer;
  }

  const timerContainer = document.querySelectorAll('[data-deadline]');

  const twoNumbers = (num) => ((num < 10) ? '0' + num : num);

  const start = () => {
    const timer = getTimeRemaining();

    let day = timer.days;
    const dayWord = declinationWork(day, daysWords);

    let hour = twoNumbers(timer.hours);
    const hourWord = declinationWork(hour, hoursWords);

    let minute = twoNumbers(timer.minutes);
    const minuteWord = declinationWork(minute, minutesWords);

    let second = twoNumbers(timer.seconds);
    const secondWord = declinationWork(second, secondsWords);

    let timerInfo = {
      day,
      dayWord,
      hour,
      hourWord,
      minute,
      minuteWord,
      second,
      secondWord
    }

    let intervalID;
    if (timerInfo.day < 1) {
      intervalID = setTimeout(start, 1000);
    } else {
      intervalID = setTimeout(start, 60000);
    }

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalID);
      timerInfo.day = '00';
      timerInfo.hour = '00';
      timerInfo.minute = '00';
      timerInfo.second = '00';
      const period = document.querySelector('.period');
      period.classList.add('visually-hidden');
    }

    const time = createTimer(timerInfo, timerContainer);
    const period = document.querySelector('.period');
    period.innerHTML = time.innerHTML;

    return period;
  };

  start();
};

const deadline = document.querySelector('.period');
timer(deadline.getAttribute('data-deadline'));

}
