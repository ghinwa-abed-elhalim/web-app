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
    

    const loginEmail = document.querySelector(".login-email").value;
    const loginPassword = document.querySelector(".login-password").value;
    const storedUsers = localStorage.getItem("users");
    const userArray = storedUsers ? JSON.parse(storedUsers) : [];

    if (loginEmail === "admin@quiz.com" && loginPassword === "admin123") {
        const adminUser = { name: "Admin", email: loginEmail };
        localStorage.setItem("currentUser", JSON.stringify(adminUser));
        window.location.href = "dashboard.html";
        return;
    }
    
    const foundUser = usersArray.find(function (user) {
        return user.email === loginEmail && user.password === loginPassword;
    });

    if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        window.location.href = "home.html";
      } else {
        messageParagraph.innerText = "Invalid credentials! Please try again.";
      }
    });
    
    
    registerFormElement.addEventListener("submit", function (event) {
      event.preventDefault();
      
      const registerName = document.querySelector(".register-name").value;
      const registerEmail = document.querySelector(".register-email").value;
      const registerPassword = document.querySelector(".register-password").value;


      const storedUsers = localStorage.getItem("users");
      const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
    
      const userExists = usersArray.some(function (user) {
        return user.email === registerEmail;
      });
    
      if (userExists) {
        messageParagraph.innerText = "User already exists with this email!";
        return;
      }

      const newUser = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        scores: []
      };

      usersArray.push(newUser);
      localStorage.setItem("users", JSON.stringify(usersArray));

      
      messageParagraph.innerText = "Registration successful! You can log in now.";
      registerFormElement.classList.add("hidden");
      loginFormElement.classList.remove("hidden");
    });