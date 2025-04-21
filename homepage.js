const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const welcomeMessage = document.querySelector(".welcome-message");
const quizListContainer = document.querySelector(".quiz-list");
const logoutButton = document.querySelector(".logout-btn");

if (!currentUser) {
    window.location.href = "index.html";
  }
  
  welcomeMessage.innerText = `Welcome, ${currentUser.name}! 🌸`;


  const initialQuizzes = [
    {
      title: "General Knowledge",
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Paris", "Rome"],
          answer: "Paris"
        },
        {
          question: "How many continents are there?",
          options: ["5", "6", "7"],
          answer: "7"
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Mars", "Jupiter", "Saturn"],
          answer: "Mars"
        }
      ]
    },
    {
      title: "Math Quiz",
      questions: [
        {
          question: "What is 10 + 5?",
          options: ["10", "15", "20"],
          answer: "15"
        },
        {
          question: "What is 7 x 3?",
          options: ["21", "14", "24"],
          answer: "21"
        },
        {
          question: "What is the square root of 64?",
          options: ["6", "8", "10"],
          answer: "8"
        }
      ]
    }
  ];
  