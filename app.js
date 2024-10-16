document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("play-button");
  const gameContainer = document.querySelector(".game");
  const gameOverContainer = document.querySelector(".gameover");
  let score = 0;
  let timerId;
  let userName = ""; // Variable to store the user's name

  // Reference the play button and start the game on click
  playButton.onclick = () => {
      userName = prompt("Enter your name: "); // Prompt for the user's name
      if (userName) {
          playButton.style.display = 'none';
          gameContainer.style.display = 'flex';
          startGame();
      } else {
          alert("Please enter a valid name.");
      }
  };

  // Generate two random numbers
  function generateRandomNumbers() {
      const number1 = document.getElementById('number1');
      const number2 = document.getElementById('number2');
      number1.innerHTML = Math.floor(Math.random() * 100);
      number2.innerHTML = Math.floor(Math.random() * 100);
  }

  // Timer function
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

  // Start the game
  function startGame() {
      score = 0;
      generateRandomNumbers();
      startTimer();
      displayHighestScore(); // Show the highest score at the start of the game
      window.score = score; // Expose score for testing
  }

  // End the game and save the score
  function endGame() {
      clearInterval(timerId);
      saveScore(userName, score); // Save the score with the user's name
      gameContainer.style.display = "none";
      gameOverContainer.style.display = "flex";
      const scoreBoard = document.getElementById("score-board");
      scoreBoard.innerHTML = score;
      displayHighestScore(); // Show the highest score on game over
  }

  // Reset the game state
  function resetGame() {
      clearInterval(timerId);
      generateRandomNumbers();
      startTimer();
  }

  // Handle checking answers and increasing score
  function checkAnswer(guess) {
      const number1 = parseInt(document.getElementById('number1').innerHTML);
      const number2 = parseInt(document.getElementById('number2').innerHTML);

      if ((guess === '>' && number1 > number2) || 
          (guess === '<' && number1 < number2) || 
          (guess === '=' && number1 === number2)) {
          score++;
          resetGame();
      } else {
          endGame();
      }
  }

  // Attach event handlers for comparison buttons
  document.getElementById('greater-than').onclick = () => checkAnswer('>');
  document.getElementById('lesser-than').onclick = () => checkAnswer('<');
  document.getElementById('equal-to').onclick = () => checkAnswer('=');

  // Play again functionality
  document.getElementById("play-again-button").onclick = () => {
      gameOverContainer.style.display = 'none';
      gameContainer.style.display = 'flex';
      startGame();
  };

  // Save user name and score in localStorage
  function saveScore(userName, userScore) {
      let scores = JSON.parse(localStorage.getItem('scores')) || [];
      scores.push({ name: userName, score: userScore });
      localStorage.setItem('scores', JSON.stringify(scores));
      updateHighestScore(userScore);
  }

  // Display the highest score
  function displayHighestScore() {
      const highestScore = getHighestScore();
      const highestScoreElement = document.getElementById("highest-score");

      // Remove previous highest score element if it exists
      if (highestScoreElement) {
          highestScoreElement.remove();
      }

      // Create and display the highest score element
      const newHighestScoreElement = document.createElement('div');
      newHighestScoreElement.id = "highest-score";
      newHighestScoreElement.innerHTML = `Highest Score: ${highestScore.name} - ${highestScore.score}`;
      document.body.appendChild(newHighestScoreElement);
  }

  // Get the highest score from localStorage
  function getHighestScore() {
      let scores = JSON.parse(localStorage.getItem('scores')) || [];
      return scores.reduce((max, player) => (player.score > max.score ? player : max), { name: 'None', score: 0 });
  }

  // Update the highest score if the new score is greater
  function updateHighestScore(newScore) {
      let highestScore = getHighestScore();
      if (newScore > highestScore.score) {
          alert(`New High Score!`);
      }
  }
});
