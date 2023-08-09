const container = document.querySelector('.container');
const choicesBox = document.querySelector('.choices');
const questionBox = document.querySelector('.question');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// make an array of objects that stores questions, choices of question and answer
const quiz = [
     {
          question: "Q. Which of the following is not a CSS box model property?",
          choices: ["margin","padding","border-radius","border-collapse"],
          answer: "border-collapse"
     },
     {
          question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
          choices: ["function myFunction() {}","let myFunction = function() {}","myFunction: function() {}","const myFunction = () => {};"],
          answer: "myFunction: function() {}"
     },
     {
          question: "Q. Which of the following is not a JavaScript data type?",
          choices: ["string","boolean","object","float"],
          answer: "float"
     },
     {
          question: "Q. What is the purpose of the this keyword in JavaScript?",
          choices: ["It refers to the current function.","It refers to the current object.","It refers to the parent object.","It is used for comments."],
          answer: "It refers to the current object."
     }
];
// making variables
let currentQuestionIndex=0;
let score=0;
let quizOver=false;
let timeleft=15;
let timerId=null;
// Arrow function to show questions
const showQuestion = () => {
   const questionDetails=quiz[currentQuestionIndex];
   questionBox.textContent=questionDetails.question;
   choicesBox.textContent="";
   for(let i=0;i<questionDetails.choices.length;i++){
      const currentChoice=questionDetails.choices[i];
      const choiceDiv = document.createElement('div');
      choiceDiv.textContent=currentChoice;
      choiceDiv.classList.add('choice');
      choicesBox.appendChild(choiceDiv);
      choiceDiv.addEventListener('click', ()=>{
          if(choiceDiv.classList.contains('selected')){
               choiceDiv.classList.remove('selected');
          }
          else
          {
               choiceDiv.classList.add('selected');
          }
      })
     }
     if(currentQuestionIndex<quiz.length){
          startTimer();
     }
}
// function to check answer
const checkAnswer = () => {
     const selectedChoice = document.querySelector('.choice.selected');
     if(selectedChoice.textContent===quiz[currentQuestionIndex].answer){
          // alert("corrent answer!");
          displayAlert("corrent answer!");
          score++;
     }
     else{
          // alert("wrong answer!");
          displayAlert(`wrong answer! ${quiz[currentQuestionIndex].answer} is the correct answer`);
     }
     timeleft=15;
     currentQuestionIndex++;
     if(currentQuestionIndex<quiz.length){
          showQuestion();
     }
     else{
          stopTimer();
          showScore();
     }
}
// function to show score
const showScore = () => {
     questionBox.textContent="";
     choicesBox.textContent="";
     scoreCard.textContent=`You Scored ${score} out of ${quiz.length}!`;
     displayAlert("you have completed this quiz!");
     nextBtn.textContent = "Play Again";
     quizOver=true;
     timer.style.display="none";
}
// function to show alert 
const displayAlert = (msg) => {
     alert.style.display="block";
     alert.textContent=msg;
     setTimeout(()=>{
        alert.style.display="none";
     }, 2000);
}
// function to start timer
const startTimer = () => {
     clearInterval(timerId);
     timer.textContent=timeleft;
     const countDown = () => {
          timeleft--;
          timer.textContent=timeleft;
          if(timeleft===0){
             const confirmUser = confirm("time up!! do you want to play the quiz again");
             if(confirmUser){
               timeleft=15;
               startQuiz();
             }
             else{
               startBtn.style.display="block";
               container.style.display="none";
               return;
             }
          }
     }
     timerId=setInterval(countDown, 1000);
}
// function to stop timer
const stopTimer = () => {
   clearInterval(timerId);
}
// function to shuffle question
const shuffleQuestions = () => {
   for(let i=quiz.length-1;i>0;i--){
     const j=Math.floor(Math.random() *(i+1));
     [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
   }
   currentQuestionIndex=0;
   showQuestion();  
}
// function to start quiz
const startQuiz = () => {
     timeleft=15;
     timer.style.display="flex";
     shuffleQuestions();
}
// adding event listener to startbtn
startBtn.addEventListener('click', ()=>{
     startBtn.style.display="none";
     container.style.display="block";
     startQuiz();
})
nextBtn.addEventListener('click', ()=>{
     const selectedChoice = document.querySelector('.choice.selected');
     if(!selectedChoice && nextBtn.textContent=='Next'){
          // alert("select your answer");
          displayAlert("select your answer");
          return;
     }
     if(quizOver){
          nextBtn.textContent="Next";
          scoreCard.textContent="";
          currentQuestionIndex=0;
          quizOver=false;
          score=0;
          startQuiz();
     }
     else{
          checkAnswer();
     }
})
