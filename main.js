const loginTabButton = document.querySelector(".login-tab");
const registerTabButton = document.querySelector(".register-tab");
const loginFormElement = document.querySelector(".login-form");
const registerFormElement =  document.querySelector("register-form");
const messageParagraph = document.querySelector(".message");


loginTabButton.addEventListener("click", function(){
    loginFormElement.classList.remove("hidden");
    registerFormElement.classList.add("hidden");
    messageParagraph.innerText = "";
});

registerTabButton.addEventListener("click", function() {
    registerFormElement.classList.remove("hidden");
    loginFormElement.classList.add("hidden");
    messageParagraph.innerText = "";
});

loginFormElement.addEventListener("submit", function (event) {
    event.preventDefault();
})