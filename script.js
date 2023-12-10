const questions = [
    {
        question: 'Vad är Sveriges Huvudstad ?' ,
        answers: [
            {text: 'Göteborg', correct: false},
            {text: 'Stockholm', correct: true},
            {text: 'Malmö', correct: false},
            {text: 'Örebro', correct: false},
        ]
    },
    {
        question: 'vart bor det mest invånare i Sverige ?' ,
        answers: [
            {text: 'Göteborg', correct: false},
            {text: 'Stockholm', correct: true},
            {text: 'Malmö', correct: false},
            {text: 'Örebro', correct: false},
        ]
    },
    {
        question: 'Hur många invånare bor det i Stockholm ?' ,
        answers: [
            {text: '500 tusen', correct: false},
            {text: '1,6 miljoner', correct: true},
            {text: '1 miljon', correct: false},
            {text: '2 miljoner', correct: false},
        ]
    },
    {
        question: 'Vem är Sveries genom tiderna bästa fotbollsspelare ?' ,
        answers: [
            {text: 'Henrik Larsson', correct: false},
            {text: 'Zlatan Ibrahimovic', correct: true},
            {text: 'Martin Mutumba', correct: false},
            {text: 'John Gudetti', correct: false},
        ]
    },
    {
        question: 'Vilka färger är med i Sveriges flagga ?' ,
        answers: [
            {text: 'Röd', correct: false},
            {text: 'Blå', correct: true},
            {text: 'Gul', correct: true},
            {text: 'Lila', correct: false},
        ]
    },
    {
        question: 'Hur många invånare bor det i Sverige ?' ,
        answers: [
            {text: '8 miljoner', correct: false},
            {text: '10 miljoner', correct: true},
            {text: '9 miljoner', correct: false},
            {text: '11 miljoner', correct: false},
        ]
    },
    {
        question: 'Hur många invånare bor det i Sverige ?' ,
        answers: [
            {text: '8 miljoner', correct: false},
            {text: '10 miljoner', correct: true},
            {text: '9 miljoner', correct: false},
            {text: '11 miljoner', correct: false},
        ]
    },
    {
        question: 'Hur många invånare bor det i Sverige ?' ,
        answers: [
            {text: '8 miljoner', correct: false},
            {text: '10 miljoner', correct: true},
            {text: '9 miljoner', correct: false},
            {text: '11 miljoner', correct: false},
        ]
    },
    {
        question: 'Hur många invånare bor det i Sverige ?' ,
        answers: [
            {text: '8 miljoner', correct: false},
            {text: '10 miljoner', correct: true},
            {text: '9 miljoner', correct: false},
            {text: '11 miljoner', correct: false},
        ]
    },
    {
        question: 'Hur många invånare bor det i Sverige ?' ,
        answers: [
            {text: '8 miljoner', correct: false},
            {text: '10 miljoner', correct: true},
            {text: '9 miljoner', correct: false},
            {text: '11 miljoner', correct: false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionElement.style.color = "var(--color-fg)";
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestionIndex.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click",selectAnswer);
    }) 
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    // Display the user's score
    const scoreElement = document.getElementById("question");
    if (score < 5) {
        scoreElement.style.color = "#ff0000"; // red
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! Failure`;
    } else if (score >= 5 && score <= 7) {
        scoreElement.style.color = "#ffaa00"; // yellow/orange
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! You did Alright`;
    } else {
        scoreElement.style.color = "#00aa00"; // green
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! Well Done`;
    } 
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton () {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else (
        startQuiz()
    )
})

startQuiz();

/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }
  
  /**
  * Utility function to update the button text and aria-label.
  */
  function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "Change to light theme" : "Change to dark theme";
    // use an aria-label if you are omitting text on the button
    // and using a sun/moon icon, for example
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
  }
  
  /**
  * Utility function to update the theme setting on the html tag
  */
  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
  
  
  /**
  * On page load:
  */
  
  /**
  * 1. Grab what we need from the DOM and system settings on page load
  */
  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  /**
  * 2. Work out the current site settings
  */
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
  /**
  * 3. Update the theme setting and button text accoridng to current settings
  */
  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
  
  /**
  * 4. Add an event listener to toggle the theme
  */
  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  }); 