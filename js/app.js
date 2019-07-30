let questions = [{
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
];

const question = document.getElementById("question"),
    choices = Array.from(document.getElementsByClassName("aws")),
    progress = document.querySelector(".progress"),
    scoreText = document.querySelector(".score"),
    progressText = document.querySelector(".progress-text");

const MAX_QUESTION = 3,
    CORRECT_BONUS = 10;

let currentQuestion = {},
    avaliableQuestions = [],
    questionRemainig = MAX_QUESTION,
    score = 0,
    acceptingAnswer = false;


startGame = () => {
    avaliableQuestions = [...questions];
    questionRemainig = MAX_QUESTION;
    score = 0;
    acceptingAnswer = false;
    getNextQuestion();
}

getNextQuestion = () => {
    const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion[`choice${number}`];
    });

    avaliableQuestions.splice(questionIndex, 1);

    --questionRemainig;
    updateProgress(MAX_QUESTION, questionRemainig);
    acceptingAnswer = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return;
        const selectedChoice = e.target.dataset["number"];
        const classToApply = selectedChoice == currentQuestion.answer ? "is-correct" : "is-incorrect";
        if(classToApply === "is-correct") updateScore(CORRECT_BONUS);
        e.target.classList.add(classToApply);
        score.innerText = score;
        setTimeout(() => {
            e.target.classList.remove(classToApply);
            if (questionRemainig == 0) quizEnd();
            else getNextQuestion();
        }, 1000);
    })
})


updateScore = (bonus) => {
    score+=bonus;
    scoreText.innerText = score;
}

updateProgress = (max_question, questionRemainig) => {
    let text;
    const currentProgress = ((max_question-questionRemainig)/max_question) * 100;

    if(questionRemainig <= 5) text = `Almost there, ${questionRemainig} question(s) remaining`;
    else if(questionRemainig <= 10) text = `keep goinging, ${questionRemainig} question(s) remaining`;
    else text = `A long way to go, about ${questionRemainig} question(s) remaining`;

    progressText.innerText = text;
    progress.style.width = `${currentProgress}%`;
}


quizEnd = () => {
    setTimeout(() => {
        return window.location.assign("./highscore.html");
    }, 1000);
}

startGame();