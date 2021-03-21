const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",  // Local Storage
    SHOWING_CN = "showing";  

function saveName(text){
    localStorage.setItem(USER_LS, text);
}    

function handleSubmit(event){
    event.preventDefault(); //event의 기본동작(default)를 막는다.
    const currentValue = input.value;
    paintGreeting(currentValue);//여기까지만 하면 저장되지는 않았기에 새로고침시 초기화됨
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName(); //he is not
    } else {
        paintGreeting(currentUser);//he is 
    }
}

function init() {
   loadName();
}

init();