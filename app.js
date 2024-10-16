document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play-button");
    const gameContainer = document.querySelector(".game");
    const gameOverContainer = document.querySelector(".gameover");
    let score = 0;
    let timerId;
    playButton.onclick = () => {
     playButton.style.display ='none';
     gameContainer.style.display ='flex';
     startGame();
    };
  
   
  
    function generateRandomNumbers() {
      const number1 = document.getElementById('number1')
      const number2 = document.getElementById('number2')
      number1.innerHTML = Math.floor(Math.random()*100)
      number2.innerHTML = Math.floor(Math.random()*100)
    }
  
  
  
    function startTimer() {
     
      let time = 5;
      const timer = document.getElementById("timer");
      timer.innerHTML = time;
  
      if (timerId) {
        clearInterval(timerId);
      }
  
      timerId = setInterval(() => {
        time--;
        if (time === 0) {
          endGame();
        }
        timer.innerHTML = time;
      }, 1000);
     
      window.score = score; // Expose score for testing
    }
  
    function startGame() {
      score = 0;
      generateRandomNumbers();
      startTimer();
      window.score = score; // Expose score for testing
    }
  
  
    function endGame() {
      clearInterval(timerId);
      localStorage.setItem("score", score);
      gameContainer.style.display = "none";
      gameOverContainer.style.display = "flex";
      const scoreBoard = document.getElementById("score-board");
      scoreBoard.innerHTML = score;
    }
  
    function resetGame() {
      clearInterval(timerId);
     generateRandomNumbers();
      startTimer();
    }
  // Challenge 3 :- Build Logic for Reset and ending the game. if the user clicks the correct option( > /< or =) they should move to second question and randm numbers should be again generated, score should increase, tmer should reset otherwise the endgameFunction should be invoked
  const greaterThanButton = document.getElementById('greater-than')
  const lesserThanButton = document.getElementById('lesser-than')
  const equalToButton = document.getElementById('equal-to')
  
  function checkAnswer(guess) {
    const number1 = parseInt(document.getElementById('number1').innerHTML)
    const number2 = parseInt(document.getElementById('number2').innerHTML)
  
    if ((guess === '>' && number1 > number2)|| (guess === '<' && number1 < number2)|| (guess === '=' && number1 === number2)) {
      score++
      resetGame()
    }
    else{
      endGame()
    }
  }
  greaterThanButton.onclick= ()=>checkAnswer('>')
  equalToButton.onclick= ()=>checkAnswer('=')
  lesserThanButton.onclick= ()=>checkAnswer('<')
  
  method
  function playAgainHandler() {
    gameOverContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    startGame();
  }
  
  
  const playAgainButton = document.getElementById("play-again-button");
  if (playAgainButton) {
    playAgainButton.onclick = playAgainHandler;
  }
    
   //DOnot edit this code (Expose functions for testing)
    window.startGame = startGame;
    window.endGame = endGame;
    window.resetGame = resetGame;
    window.generateRandomNumbers = generateRandomNumbers;
  });
