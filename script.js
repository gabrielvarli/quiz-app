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
        question: 'Hur många invånare bor det i Sverige ?' ,
        answers: [
            {text: '8 miljoner', correct: false},
            {text: '10 miljoner', correct: true},
            {text: '9 miljoner', correct: false},
            {text: '11 miljoner', correct: false},
        ]
    },
]

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

// vad gör denna kod ?
let currentQuestionIndex = 0;
let score = 0;

// vad gör denna ?
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// antar att fråge funktioner körs här 
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // antar att svar funktionen körs här 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
    })
}

function resetState(){
    nextButton.style.display = "none"; 
     while(answerButtons.firstChild){
        answerButtons.removeChild(answerButton.firstChild)
     }
}

startQuiz();


// darkmode func

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