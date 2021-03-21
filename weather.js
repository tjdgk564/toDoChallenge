const weaether = document.querySelector(".js-weather");

const API_KEY = "771c30c7d182b623f0e805ae7c53a654";
const COORDS ='coords';

function getWeather(lat, lng){
    fetch(
       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
       .then(function(response) {
         return response.json();
       }) //then은 서버로부터 데이터가 완전히 넘어오고 난 후 함수를 시행시키고자 할 때 쓴다.
       .then(function(json) {
           const temperature = json.main.temp;
           const place = json.name;
           weaether.innerText = `${temperature} @ ${place}`;
       });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude //longitute: longitude 처럼 객체의 key의 이름과 변수의 이름이 같을 때.
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError) //geolocation은 라이브러리?임
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();