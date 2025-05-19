const questions = [
  {
    question: "Apa ibu kota Indonesia?",
    answers: [
      { text: "Jakarta", correct: true },
      { text: "Surabaya", correct: false },
      { text: "Bandung", correct: false },
      { text: "Medan", correct: false }
    ]
  },
  {
    question: "Siapa presiden pertama Indonesia?",
    answers: [
      { text: "Soekarno", correct: true },
      { text: "Soeharto", correct: false },
      { text: "Habibie", correct: false },
      { text: "Jokowi", correct: false }
    ]
  },
  {
    question: "Planet terbesar di tata surya adalah?",
    answers: [
      { text: "Bumi", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Venus", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  nextButton.innerText = "Selanjutnya";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.style.backgroundColor = "green";
  } else {
    selectedBtn.style.backgroundColor = "red";
  }

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "green";
    }
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionContainer.innerText = "Kuis selesai! Terima kasih telah bermain.";
  nextButton.innerText = "Main Lagi";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();
