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
    questionElement.style.color = "#001e4d";
    nextButton.innerHTML = "next";
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
    //questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
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