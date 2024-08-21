const categories = {
    marvel: [
      "avengers",
      "blackwidow",
      "spiderman",
      "ironman",
      "thor",
      "hulk",
      "guardiansofthegalaxy",
      "antman",
      "captainamerica",
      "",
    ],
  };

  let wordToGuess = "";
  let Lives = 10;
  let trick = [];
  const selectedContainer = document.getElementById("selected");
  const wordDisplay = document.getElementById("wordDisplay");
  const livesDisplay = document.getElementById("lives");
  const categoryDisplay = document.getElementById("category");
  const lettersContainer = document.getElementById("letters");

  function startGame(category) {
    wordToGuess = getRandomWord(category);
    Lives = 10;
    trick = [];
    selectedContainer.innerHTML = "";
    lettersContainer.innerHTML = "";
    wordDisplay.innerHTML = "";
    livesDisplay.textContent = "Lives: " + Lives;
    categoryDisplay.textContent = "Marvel character: " + formatCategory(category);

    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      const letterButton = document.createElement("button");
      letterButton.className = "storage";
      letterButton.textContent = letter;
      lettersContainer.appendChild(letterButton);
      letterButton.addEventListener("click", function () {
        handleGuess(letter);
        letterButton.disabled = true;
        letterButton.style.backgroundColor = "grey";
      });
    }

    for (let i = 0; i < wordToGuess.length; i++) {
      trick[i] = "_";
    }
    HardDisplay();
  }

  function getRandomWord(category) {
    const words = categories[category];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function handleGuess(letter) {
    let correctGuess = false;
    for (let i = 0; i < wordToGuess.length; i++) {
      if (wordToGuess[i] === letter) {
        trick[i] = letter;
        correctGuess = true;
      }
    }
    if (!correctGuess) {
      Lives -= 1;
      livesDisplay.textContent = "Lives: " + Lives;
    }
    HardDisplay();
    checkGameStatus();
  }

  function HardDisplay() {
    wordDisplay.innerHTML = "";
    for (let i = 0; i < trick.length; i++) {
      const trickElement = document.createElement("div");
      trickElement.innerHTML = trick[i];
      trickElement.className = "line";
      wordDisplay.appendChild(trickElement);
    }
  }

  function checkGameStatus() {
    let guessedWord = "";
    for (let i = 0; i < trick.length; i++) {
      guessedWord += trick[i];
    }
    if (guessedWord === wordToGuess) {
      alert("Congratulations! You won!");
      resetGame();
    } else if (Lives === 0) {
      alert("Game over! The word was '" + wordToGuess + "'.");
      resetGame();
    }
  }

  function resetGame() {
    selectedContainer.innerHTML = "";
    lettersContainer.innerHTML = "";
    wordDisplay.innerHTML = "";
    livesDisplay.textContent = "Lives: 10";
    categoryDisplay.textContent = "Choose a category";
    startGame("marvel");
  }

  function formatCategory(category) {
    const categoriesMap = {
      marvel: "Marvel character",
    };
    return categoriesMap[category] || "Unknown Category";
  }

  document.addEventListener("DOMContentLoaded", function () {
    startGame("marvel");
  });
