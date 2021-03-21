const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date(); //이때 Date는 class이다. 일단은 단순하게 object로 생각하자.
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds}`;  //삼항연산자의 사용!@@@
}

function init() {
  getTime();
  setInterval(getTime, 1000); //1000millisecond마다 getTime을 실행한다.@@@
}

init();