/* DOM */

// Bouton
const newGameDOM = document.querySelector("header>div>button"); // Bouton Nouvelle Partie
const rollDice = document.querySelector(".action>button"); // Bouton Lancer le Dé
const hold = document.querySelector(".action>button+button"); // Bouton Conserver

// Sélection des éléments du DOM pour le dé
const rollImage = document.querySelector(".result>div+img");

// Player 1
const player1RoundDOM = document.querySelector(".player1>h2>span"); // Affichage du tour du joueur 1
const player1ScoreDOM = document.querySelector(".player1>h2+p"); // Affichage du score du joueur 1
const playerCurrent1DOM = document.querySelector(".player1>.actuel+span"); // Affichage du score actuel du joueur 1

// Player 2
const player2RoundDOM = document.querySelector(".player2>h2>span"); // Affichage du tour du joueur 2
const player2ScoreDOM = document.querySelector(".player2>h2+p"); // Affichage du score du joueur 2
const playerCurrent2DOM = document.querySelector(".player2>.actuel+span"); // Affichage du score actuel du joueur 2

/* Variables Globales */

const player1 = {
  score: null, // Score du joueur 1
  current: null, // Score actuel du joueur 1
  isPlaying: null, // Indique si c'est le tour du joueur 1
};

const player2 = {
  score: null, // Score du joueur 2
  current: null, // Score actuel du joueur 2
};

/* Evenements */

// Événement lors du clic sur le bouton "Lancer le Dé"
rollDice.addEventListener("click", () => {
  const randomNumber = Math.floor(Math.random() * (6 - 1 + 1) + 1); // Génère un nombre aléatoire entre 1 et 6

  // rollOfDiceNumber.textContent = randomNumber;

  const imageLink = imageSwitch(randomNumber); //Obtient le lien de l'image correspondant au nombre obtenu
  rollImage.src = imageLink; // Affiche l'image du dé correspondante

  // Vérifie le résultat du lancer de dé si 1 passe à l'autre joueur
  if (randomNumber == 1) {
    if (player1.isPlaying == true) {
      player1.current = 0; // Réinitialise le score actuel du joueur 1 à zéro
      player1.isPlaying = false; // Passe au tour du joueur 2

      domUpdate(false, true); // Met à jour l'affichage du DOM
    } else {
      player2.current = 0; // Réinitialise le score actuel du joueur 2 à zéro
      player1.isPlaying = true; // Passe au tour du joueur 1

      domUpdate(false, false); // Met à jour l'affichage du DOM
    }
  } else {
    if (player1.isPlaying == true) {
      player1.current += randomNumber; // Ajoute le score du dé au score
      playerCurrent1DOM.textContent = player1.current; // Met à jour l'affichage du score actuel du joueur 1
    } else {
      player2.current += randomNumber; // Ajoute le score du dé au score actuel du joueur 2
      playerCurrent2DOM.textContent = player2.current; // Met à jour l'affichage du score actuel du joueur 2
    }
  }
});

// Événement lors du clic sur le bouton "Conserver/ hold"
hold.addEventListener("click", () => {
  if (player1.isPlaying == true) {
    player1.score += player1.current; // Ajoute le score actuel du joueur 1 à son score total
    const gameOver = isGameOver(player1.score); // Vérifie si la partie est terminée pour le joueur 1

    if (gameOver) {
      startNewGame(); // Démarre une nouvelle partie
    } else {
      player1.current = 0; // Réinitialise le score actuel du joueur 1 à zéro
      player1.isPlaying = false; // Passe au tour du joueur 2

      domUpdate(false, true); // Met à jour l'affichage du DOM
    }
  } else {
    player2.score += player2.current; // Ajoute le score actuel du joueur 2 à son score total

    const gameOver = isGameOver(player2.score); // Vérifie si la partie est terminée pour le joueur 2

    if (gameOver) {
      startNewGame(); // Démarre une nouvelle partie
    } else {
      player2.current = 0;
      player1.isPlaying = true;

      domUpdate(false, false);
    }
  }
});

// Evenement Bouton New Game
newGameDOM.addEventListener("click", () => {
  startNewGame();
});

/* Fonctions */

// Mise à jour du DOM
function domUpdate(isGameOver, isPlayer1) {
  if (isGameOver) {
    player1RoundDOM.style.visibility = "visible";
    player2RoundDOM.style.visibility = "hidden";

    player1ScoreDOM.textContent = player1.score;
    player2ScoreDOM.textContent = player2.score;

    playerCurrent1DOM.textContent = player1.current;
    playerCurrent2DOM.textContent = player2.current;

    //rollOfDiceNumber.textContent = "0";
  } else {
    if (isPlayer1) {
      player1RoundDOM.style.visibility = "hidden";
      player2RoundDOM.style.visibility = "visible";

      player1ScoreDOM.textContent = player1.score;
      playerCurrent1DOM.textContent = player1.current;
    } else {
      player1RoundDOM.style.visibility = "visible";
      player2RoundDOM.style.visibility = "hidden";

      player2ScoreDOM.textContent = player2.score;
      playerCurrent2DOM.textContent = player2.current;
    }
  }
}

// Vérifie si la partie est finie
function isGameOver(scorePlayer) {
  if (scorePlayer >= 100) {
    return true;
  } else {
    return false;
  }
}

// Lance une nouvelle partie
function startNewGame() {
  player1.score = 0;
  player1.current = 0;
  player1.isPlaying = true;

  player2.score = 0;
  player2.current = 0;
  rollImage.src =
    "https://st3.depositphotos.com/1005844/16020/i/600/depositphotos_160208742-stock-photo-typical-white-sheet-of-paper.jpg";

  domUpdate(true, false);
}
// Fonction qui retourne le lien de l'image correspondant au nombre du dé
// Assets lie au dé
function imageSwitch(rollNumber) {
  switch (rollNumber) {
    case 1:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Dice-1.svg/557px-Dice-1.svg.png";

    case 2:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Dice-2.svg/1200px-Dice-2.svg.png";

    case 3:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Dice-3.svg/1200px-Dice-3.svg.png";

    case 4:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Dice-4.svg/557px-Dice-4.svg.png";

    case 5:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Dice-5.svg/557px-Dice-5.svg.png";

    default:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dice-6.svg/1200px-Dice-6.svg.png";
  }
}

startNewGame();
