/* DOM */

// Bouton
const newGameDOM = document.querySelector("header>div>button"); 
const rollDice = document.querySelector(".action>button"); 
const hold = document.querySelector(".action>button+button");

// Dé
/*
const rollOfDiceNumber= document.querySelector(".result>div+p");
*/
const rollImage= document.querySelector(".result>div+img");


// Player 1
const player1RoundDOM = document.querySelector(".player1>h2>span");
const player1ScoreDOM = document.querySelector(".player1>h2+p"); 
const playerCurrent1DOM = document.querySelector(".player1>.actuel+span");

// Player 2
const player2RoundDOM = document.querySelector(".player2>h2>span");
const player2ScoreDOM = document.querySelector(".player2>h2+p"); 
const playerCurrent2DOM = document.querySelector(".player2>.actuel+span");

/* Variables Globales */

const player1 = {
  score: null,
  current: null,
  isPlaying: null
}

const player2 = {
  score: null,
  current: null
}

/* Evenements */

// Evenement Bouton Roll Dice
rollDice.addEventListener('click', () => {

  const randomNumber =  Math.floor(Math.random() * (6 - 1 + 1) + 1);
  
 // rollOfDiceNumber.textContent = randomNumber;

  const imageLink = imageSwitch (randomNumber)
  rollImage.src = imageLink

  
  if(randomNumber == 1){

    if(player1.isPlaying == true) {

      player1.current = 0;
      player1.isPlaying = false;
      
      domUpdate(false, true);
    }

    else {

      player2.current = 0;
      player1.isPlaying = true;
      
      domUpdate(false, false);
    }
  }

  else {

    if(player1.isPlaying == true){
    
      player1.current += randomNumber;
      playerCurrent1DOM.textContent = player1.current;
    }
  
    else {

      player2.current += randomNumber;
      playerCurrent2DOM.textContent = player2.current;
    }
  }
});

// Evenement Bouton Hold
hold.addEventListener('click', () => {

  if(player1.isPlaying == true){
    
    player1.score += player1.current;
    const gameOver = isGameOver(player1.score);

    if (gameOver) {
      startNewGame();
    }

    else {

      player1.current = 0;
      player1.isPlaying = false;

      domUpdate(false, true);      
    }
  }

  else {

    player2.score += player2.current;

    const gameOver = isGameOver(player2.score);

    if (gameOver) {
      startNewGame();
    }

    else {

      player2.current = 0;
      player1.isPlaying = true;

      domUpdate(false, false); 
    }
  }
});

// Evenement Bouton New Game
newGameDOM.addEventListener('click', () => { 
  startNewGame();
});

/* Fonctions */

// Mise à jour du DOM
function domUpdate(isGameOver, isPlayer1) {

  if (isGameOver) {

    player1RoundDOM.style.visibility= "visible";
    player2RoundDOM.style.visibility= "hidden";
  
    player1ScoreDOM.textContent = player1.score;
    player2ScoreDOM.textContent = player2.score;
  
    playerCurrent1DOM.textContent = player1.current;
    playerCurrent2DOM.textContent = player2.current;
  
    //rollOfDiceNumber.textContent = "0";

   
  }

  else {

    if (isPlayer1) {

      player1RoundDOM.style.visibility="hidden";
      player2RoundDOM.style.visibility="visible";
  
      player1ScoreDOM.textContent = player1.score;
      playerCurrent1DOM.textContent = player1.current;
    }

    else {
  
      player1RoundDOM.style.visibility="visible";
      player2RoundDOM.style.visibility="hidden";
  
      player2ScoreDOM.textContent = player2.score;
      playerCurrent2DOM.textContent = player2.current;
    }
  } 
}

// Vérifie si la partie est finie
function isGameOver(scorePlayer) {

    if(scorePlayer >= 100) {
      return true;
    }

    else {
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
  rollImage.src = "https://st3.depositphotos.com/1005844/16020/i/600/depositphotos_160208742-stock-photo-typical-white-sheet-of-paper.jpg";

  domUpdate(true, false);
}

// Assets lie au dé
function imageSwitch(rollNumber) {
  
  switch (rollNumber) {
  case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Dice-1.svg/557px-Dice-1.svg.png"
        
    case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Dice-2.svg/1200px-Dice-2.svg.png"
       
    case 3:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Dice-3.svg/1200px-Dice-3.svg.png"
  
    case 4:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Dice-4.svg/557px-Dice-4.svg.png"
      
    case 5:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Dice-5.svg/557px-Dice-5.svg.png"
    
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dice-6.svg/1200px-Dice-6.svg.png"
      
}

}

startNewGame();