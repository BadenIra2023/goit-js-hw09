const startColor = document.querySelector("[data-start]");
const stopColor = document.querySelector("[data-stop]");
const body = document.querySelector("body");

startColor.addEventListener("click", onButton);
stopColor.addEventListener("click", ofButton);

let timer = null;
stopColor.disabled = true
function onButton(event) {
    
  timer = setInterval(() => {
    startColor.disabled = true;
    stopColor.disabled = false;
    body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }; 
function ofButton(event) {
    clearInterval(timer);
    startColor.disabled = false;
    stopColor.disabled = true;
};
     function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};