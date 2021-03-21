const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

/*function filterFn(toDo) {
    return toDo.id === 1
}//여기에는 toDos의 아이템들이 toDo에 입력되어 id===1인지를 판별하게 될 것이다.
*/ //filter함수의 기능 설명! 아래의 filter함수는 이런 과정을 거쳐간다.
let toDos = [];

function deleteToDo(event) {
    /* console.log(event.target.parentNode);//이벤트가 버튼에서 일어남을 알게 해준다.
    그러나 father를 모른다. 따라서 console.dir을 이용해 어디에 속해있는지 알아내 추가한다. */
    const btn = event.target;//이벤트가 일어난 곳을 특정해준다. <button></button>
    const li = btn.parentNode;//위 btn의 father인 li
    toDoList.removeChild(li);//li만 삭제, HTML에서는 삭제되지x
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);//parseInt는 스트링을 숫자로 바꿈 
    });/*filter()함수는 array의 모든 아이템을 통해
    함수를 실행하고 true인 아이템들만 가지고 새로운 array를 만든다. forEach같이 행동함.
    이떄 toDo는 toDos의 아이템들을 명명한 것. potato로해도 됨*/
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//자바스크립트의 object를 string으로 바꿔주기
}//참고로 JSON은 JavaScript Object Notation의 준말임//이걸 통해 HTML에 toDos값에 입력값 저장

function paintToDo(text) {
    const li = document.createElement("li"); //빈li생성 이름은 아무거나 해도 됨 const potato
    const delBtn = document.createElement("button");//button생성
    const span = document.createElement("span");//span생성
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";//button모양 지정
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;//span에 입력받은 값(todo 항목) 대입
    li.appendChild(delBtn);//delBtn을 li안에 넣기
    li.appendChild(span);//span을 li안에 넣기
    li.id = newId;
    toDoList.appendChild(li);//li를 ul안에 넣기
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;//사용자 입력값
    paintToDo(currentValue);
    toDoInput.value = "";//입력창에서 입력값 자동 지워주기
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);//localStorage로부터 toDos라는 아이템을 가져오게 함
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){ //parsedToDos의 항목들을 toDo로 명명
            paintToDo(toDo.text)
        });  //array에 담긴 것들 각각 한번씩 함수를 실행, 함수를 외부에서 호출해도 됨
    }//비어있으면 그냥 두고싶기 때문에 else를 달 필요가 없다!
}

function init() {
    loadToDos();  //localStorage에 있는 toDos목록들을 창에 띄워준다. 
    toDoForm.addEventListener("submit", handleSubmit);  //submit이 발생하면 처리

}

init();