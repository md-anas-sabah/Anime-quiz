const questions = [
  {
    question: 'Who is the author of One Piece',
    answers: [
      { text: 'Akira Toriyama', correct: false },
      { text: 'Masashi Kishimoto', correct: false },
      { text: ' Eiichiro Oda', correct: true },
      { text: 'Tite Kubo', correct: false },
    ],
  },
  {
    question: 'Anime originates from which country',
    answers: [
      { text: 'India', correct: false },
      { text: 'Japan', correct: true },
      { text: 'United States of America', correct: false },
      { text: 'Saudi Arabia', correct: false },
    ],
  },
//   {
//     question:
//       ' As of 2021, what is the highest-grossing anime movies of all time?',
//     answer: [
//       { text: 'Demon Slayer: Mugen Train', correct: true },
//       { text: 'Dragon Ball Super: Broly', correct: false },
//       { text: 'Your Name', correct: false },
//       { text: 'The Boss Baby', correct: false },
//     ],
//   },
//   {
//     question: 'In the anime Fairy Tail, which kind of wizard is Lucy?',
//     answer: [
//       { text: 'Ice Wizard', correct: false },
//       { text: 'Fire Wizard', correct: false },
//       { text: 'Celestial Wizard', correct: true },
//       { text: 'None of the above', correct: false },
//     ],
//   },
];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
