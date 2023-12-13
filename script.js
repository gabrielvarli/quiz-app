const questions = [
     {
        question: 'Vad är Sveriges Huvudstad ?' ,
        answers: [
            {text: 'Göteborg', correct: false},
            {text: 'Stockholm', correct: true},
            {text: 'Malmö', correct: false},
            {text: 'Örebro', correct: false},
        ],
        facts: 'Stockholm blev under 1600-talet Sveriges huvudstad i verklig mening. Mellan 1610 och 1680 ökade invånarantalet från 10 000 till 60 000. Statens handelspolitik gynnade systematiskt Stockholm.',
    },
    {
        question: 'Vart bor det mest invånare i Sverige ?' ,
        answers: [
            {text: 'Göteborg', correct: false},
            {text: 'Stockholm', correct: true},
            //{text: 'Malmö', correct: false},
            //{text: 'Örebro', correct: false},
        ],
        facts: 'Stockholm är Sveriges största stad med flest invånare',
    },
    {
        question: 'Hur många invånare bor det i Stockholm ?' ,
        answers: [
            {text: '500 tusen', correct: false},
            {text: '1,6 miljoner', correct: true},
            {text: '1 miljon', correct: false},
            {text: '2 miljoner', correct: false},
        ],
        facts: 'Antalet invånare inom Stockholms kommun är nära 1 miljon, medan det i den kommunöverskridande tätorten finns över 1,6 miljoner.',
    },
    {
        question: 'Vem är Sveries  bästa fotbollsspelare genom tiderna ?' ,
        answers: [
            {text: 'Henrik Larsson', correct: false},
            {text: 'Zlatan Ibrahimovic', correct: true},
            {text: 'Martin Mutumba', correct: false},
            {text: 'John Gudetti', correct: false},
        ],
        facts: 'De flesta håller med om att Zlatan är den främsta svenske fotbollsspelaren genom tiderna. Faktum är att han fortfarande är en av de bästa fotbollsspelarna i hela världen, trots att han har passerat 40. Fantastiskt, eller hur?',
    },
    {
        question: 'Vilket är Sveriges nationaldjur? ?' ,
        answers: [
            {text: 'Hjort', correct: false},
            {text: 'Räv', correct: false},
            {text: 'Älg', correct: true},
            {text: 'Björn', correct: false},
        ],
        facts: 'Älgen nämns oftast som Sveriges nationaldjur, även om det inte är officiellt. Sedan lång tid tillbaka har älgen varit en symbol för Sverige, i synnerhet när det kommer till souvenirer och marknadsföringen av Sverige i utlandet. Det finns omkring 300 000 - 400 000 älgar i Sverige.',
    },
    {
        question: 'Vilket år gick Sverige med i EU??' ,
        answers: [
            //{text: '1952', correct: false},
            {text: '1995', correct: true},
            {text: '1999', correct: false},
            //{text: '2001', correct: false},
        ],
        facts: 'Sverige gick med i EU år 1995 i januari månad efter en folkomröstning 1994 där majoriteten röstade ja till medlemskap i EU. ',
    },
    {
        question: 'Vem var Sveriges första kung? ?' ,
        answers: [
            {text: 'Olof Skötkonung', correct: true},
            {text: 'Magnus Ladulås', correct: false},
            {text: 'Birger Jarl', correct: false},
            {text: 'Harald Blåtand', correct: false},
        ],
        facts: 'Olof Skötkonung brukar tillskrivas titeln som Sveriges första kung. Han var son till Erik Segersäll, som också han var en svensk kung, men inte över ett samlat rike, utan enbart kung över en större del av det som skulle komma att bli det tidigmedeltida Sverige. Olof Skötkonung var även Sveriges första kristna kung och han bidrog till kristnandet av landet. ',
    },
    {
        question: 'Vad heter Sveriges största sjö ?' ,
        answers: [
            {text: 'Siljan', correct: false},
            {text: 'Mälaren', correct: false},
            {text: 'Vättern', correct: false},
            {text: 'Vänern', correct: true},
        ],
        facts: 'Vänern är Sveriges största sjö med en yta på 5 450 km² och en volym på 153 km³, vilket även gör det till Europas tredje största insjö, efter Ladoga och Onega.',
    },
    {
        question: 'Vilken husregel är mest "helig" i Sverige?' ,
        answers: [
            {text: 'Alla har sin bestämda plats vid matbordet', correct: false},
            {text: 'Inget ätande framför TV:n', correct: false},
            {text: 'Alla måste städa/diska efter sig', correct: false},
            {text: 'Ta av skorna inomhus', correct: true},
        ],
        facts: 'Samtliga fyra är relativt vanliga oskrivna husregler i Sverige, men det är en av dem som sticker ut som extra viktig och det är att man alltid ska ta av sig skorna när man kommer hem till någon.',
    },
    {
        question: 'Hur stor del av Sveriges yta täcks av träd ?' ,
        answers: [
            {text: '2/4', correct: false},
            {text: '1/3', correct: false},
            {text: '2/3', correct: true},
            {text: '1/4', correct: false},
        ],
        facts: '2/3 delar av Sveriges yta täcks för närvarande av träd. Det är dock inte urskog det handlar om, utan majoriteten av alla träd står i olika trädplantage med monokultur. ',
    },
]

// hämtar id från html 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById('next-btn');
const faktaElement= document.getElementById("fakta-text");

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
    faktaElement.innerHTML = currentQuestion.facts;

    // denna visar svaren (texten)
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer);
    }) 
}
// den tar bort gamla frågan och svar
function resetState(){
    faktaElement.style.display = "none";
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
    faktaElement.style.display = "block";
    nextButton.style.display = "block";

}
// denna visar hur många rätta svar du har fått
// samt bedömmer dig med färg o text om du har fått godkänd. 
function showScore(){
    resetState();
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


