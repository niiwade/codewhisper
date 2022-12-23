import user from "./assets/user.svg";
import code from "./assets/code.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";
  loadInterval = setInterval(() => {
    element.textContent += ",";

    if (element.textContent === "...") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generatedUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp} -${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return (
    `
        <div class="wrapper ${isAi && "ai"}"> 
        <div class="chat">
        <div class="profile">
        <img src="${isAi ? code : user}"
        alt="${isAi ? "code" : "user"}"
        /> 
        </div>
        <div class="message" id= ${uniqueId}>
        ${value}
        </div>
        </div>
        </div>
        `
    )
}


const handleSubmit = async (e) =>{
    e.preventDefault();

    const data = new FormData(form);

    //generate users chatstripe

    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    form.reset();


    // generate code chatstripe

    const uniqueId = generatedUniqueId();

    chatContainer.innerHTML += chatStripe(true,"" ,uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv)
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup',(e) =>{
    if(e.keyCode === 13){
        handleSubmit(e)
    }
})