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
        question: 'Vart bor det mest invånare i Sverige ?' ,
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
        question: 'Vilket är Sveriges nationaldjur? ?' ,
        answers: [
            {text: 'Hjort', correct: false},
            {text: 'Räv', correct: false},
            {text: 'Älg', correct: true},
            {text: 'Björn', correct: false},
        ]
    },
    {
        question: 'Vilket år gick Sverige med i EU??' ,
        answers: [
            {text: '1952', correct: false},
            {text: '1995', correct: true},
            {text: '1999', correct: false},
            {text: '2001', correct: false},
        ]
    },
    {
        question: 'Vem var Sveriges första kung? ?' ,
        answers: [
            {text: 'Olof Skötkonung', correct: true},
            {text: 'Magnus Ladulås', correct: false},
            {text: 'Birger Jarl', correct: false},
            {text: 'Harald Blåtand', correct: false},
        ]
    },
    {
        question: 'Vad heter Sveriges största sjö ?' ,
        answers: [
            {text: 'Siljan', correct: false},
            {text: 'Mälaren', correct: false},
            {text: 'Vättern', correct: false},
            {text: 'Vänern', correct: true},
        ]
    },
    {
        question: 'Vilken husregel är mest "helig" i Sverige?' ,
        answers: [
            {text: 'Alla har sin bestämda plats vid matbordet', correct: false},
            {text: 'Inget ätande framför TV:n', correct: false},
            {text: 'Alla måste städa/diska efter sig', correct: false},
            {text: 'Ta av skorna inomhus', correct: true},
        ]
    },
    {
        question: 'Hur stor del av Sveriges yta täcks av träd ?' ,
        answers: [
            {text: '2/4', correct: false},
            {text: '1/3', correct: false},
            {text: '2/3', correct: true},
            {text: '1/4', correct: false},
        ]
    },
]

// hämtar id från html 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById('next-btn');

// antal frågor och poäng
let currentQuestionIndex = 0;
let score = 0;
// denna kod körs i början av quizen och slutet, när den börjar om.
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionElement.style.color = "var(--color-fg)";
    nextButton.innerHTML = "Next";
    showQuestion();
}
// den visar upp vilken fråga du är på 
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // denna visar svaren (texten)
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
// den tar bort gamla frågan och svar
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// denna kod kollar om man har svarat rätt eller fel 
// denna ger dig poäng när du svarat rätt 
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // denna disablar svars alternativ efter du har valt ditt svar
    // visar även next button för att ta dig till nästa fråga
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
// denna visar hur många rätta svar du har fått
// samt bedömmer dig med färg o text om du har fått godkänd. 
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

// tar dig till nästa fråga eller tar dig till score sidan.
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

// darkmode modellen
// den tar localstorage ( den jag har använt tidigare)  
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }
  
  // denna byter texten på knappen darkmode
  function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "Change to light theme" : "Change to dark theme";
    
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
  }
  
  // hämtar tema från html o css
  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
  
  
  // variabler på knapp och olika tema
  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  // variabel ser vad de är för färg på sidan o sparar den
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
 // läser knappens tidagre färg 
  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
  
  // här byter den färg från ljus till mörk
  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  }); 


