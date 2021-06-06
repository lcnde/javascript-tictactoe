/* 
Rule of thumb:
  If you only need ONE of something (gameBoard, displayController) use a module;
  If you need multiples of something (players) create them with factories;
  Have as little global code as possible;
*/
const player = (name, score) => {

  const mark = () => {
    var spot = document.querySelector(".space");
    spot.addEventListener('click', () => {
      spot.classList.add("spacex");
    });
  };
  return { name, score, mark }
};

const playerone = player('Player 1', 0);
const playertwo = player('Player 2', 0);


var restartButton = document.querySelector("#restart");
restartButton.addEventListener('click', () => {
  magicHelper.restart();
})

var spot = document.querySelectorAll(".space"); //this selects all the elements that have the class of space
spottable = Array.from(spot); //since that selecting multiple elements returns a "sort of array", we convert it to a real array
console.log(spottable)

spottable.forEach(function(element) { //for each element inside "spottable we execute a function, where "element" is the individual elements took one by one
  element.addEventListener('click', () => { //adds an event listener of click on each element and with an arrow function adds some code to them
    if (magicBox.playerOneMoves.includes(element.getAttribute('id')) || magicBox.playerTwoMoves.includes(element.getAttribute('id')) || magicBox.roundFinished == true) {
      console.log("you can't do that")
      addLog.cant();
    } else {
    magicBox.play(element);
    }
    /*
    element.classList.add("spacex");
    var id = element.getAttribute('id');
    console.log(id);
    */
    });
}); 

const magicBox = { //this is the object that controls the flow of the game. by simply executing the play function after every input the game will go on
  play: (element) => {
    magicHelper.signHelper(element); // the sign-helper helps the magicbox function to switch between x and 0
    magicHelper.addRound(); // the add-round adds a round after every match
    magicHelper.playerAddMove(element);
    magicHelper.checkWin();
  },
  playerOneTurn: true, //just a function to know who's turn it is
  round: 0, //round counter
  playerOneMoves: [], //keeps track of the user choices
  playerTwoMoves: [], //keeps track of the user choices

  roundFinished: false
};

const magicHelper = {
  addRound: () => {
    magicBox.round += 1;
  },

  signHelper: (element) => { //gets passed the "element" which is the node in which it has to add the class to fill it with X or O
    if (magicBox.playerOneTurn == true) {
      element.classList.add("spacex");
      magicBox.playerOneTurn = false;
    } else {
      element.classList.add("space0")
      magicBox.playerOneTurn = true;
    };
  },

  switchTurn: () => { //switches turn
    if (magicBox.playerOneTurn == true) {
      magicBox.playerOneTurn = false;
    } else {
      magicBox.playerOneTurn = true;
    };
  },

  playerAddMove: (element) => { //adds the moves that each player made to their respective arrays
    var id = element.getAttribute('id');
    if (magicBox.playerOneTurn == false) {
      magicBox.playerOneMoves.push(id);
    } else {
      magicBox.playerTwoMoves.push(id);
    }
  },

  checkWin: () => {
    if (magicBox.playerOneMoves.includes('1') && magicBox.playerOneMoves.includes('2') && magicBox.playerOneMoves.includes('3') ||
        magicBox.playerOneMoves.includes('4') && magicBox.playerOneMoves.includes('5') && magicBox.playerOneMoves.includes('6') ||
        magicBox.playerOneMoves.includes('7') && magicBox.playerOneMoves.includes('8') && magicBox.playerOneMoves.includes('9') ||
        magicBox.playerOneMoves.includes('1') && magicBox.playerOneMoves.includes('4') && magicBox.playerOneMoves.includes('7') ||
        magicBox.playerOneMoves.includes('2') && magicBox.playerOneMoves.includes('5') && magicBox.playerOneMoves.includes('8') ||
        magicBox.playerOneMoves.includes('3') && magicBox.playerOneMoves.includes('6') && magicBox.playerOneMoves.includes('9') ||
        magicBox.playerOneMoves.includes('1') && magicBox.playerOneMoves.includes('5') && magicBox.playerOneMoves.includes('9') ||
        magicBox.playerOneMoves.includes('3') && magicBox.playerOneMoves.includes('5') && magicBox.playerOneMoves.includes('7')) {
      console.log('player 1 won');
      addLog.whoWon('Player 1');
      playerone.score += 1;
      var score = document.querySelector('#player-one-score');
      score.textContent = `Score: ${playerone.score}`;
      magicBox.roundFinished = true;
    } else if (magicBox.playerTwoMoves.includes('1') && magicBox.playerTwoMoves.includes('2') && magicBox.playerTwoMoves.includes('3') ||
               magicBox.playerTwoMoves.includes('4') && magicBox.playerTwoMoves.includes('5') && magicBox.playerTwoMoves.includes('6') ||
               magicBox.playerTwoMoves.includes('7') && magicBox.playerTwoMoves.includes('8') && magicBox.playerTwoMoves.includes('9') ||
               magicBox.playerTwoMoves.includes('1') && magicBox.playerTwoMoves.includes('4') && magicBox.playerTwoMoves.includes('7') ||
               magicBox.playerTwoMoves.includes('2') && magicBox.playerTwoMoves.includes('5') && magicBox.playerTwoMoves.includes('8') ||
               magicBox.playerTwoMoves.includes('3') && magicBox.playerTwoMoves.includes('6') && magicBox.playerTwoMoves.includes('9') ||
               magicBox.playerTwoMoves.includes('1') && magicBox.playerTwoMoves.includes('5') && magicBox.playerTwoMoves.includes('9') ||
               magicBox.playerTwoMoves.includes('3') && magicBox.playerTwoMoves.includes('5') && magicBox.playerTwoMoves.includes('7')) {
            console.log('player 2 won');
            addLog.whoWon('Player 2');
            playertwo.score += 1;
            var score = document.querySelector('#player-two-score');
            score.textContent = `Score: ${playertwo.score}`;
            magicBox.roundFinished = true;
    }
  },

  restart: () => {
    magicBox.playerOneMoves = [];
    magicBox.playerTwoMoves = [];
    spottable.forEach(function(element) {
      element.removeAttribute('class');
      element.setAttribute('class', 'space')
      magicBox.roundFinished = false;
      console.log('restarted');
    })
  }

};

const addLog = {
  whoWon: (text) => {
    var logHistory = document.querySelector('.history'); //selects the .history class div
    var createContent = document.createElement('div'); //creates a div
    createContent.textContent = `${text} won! Press restart`;
    //logHistory.appendChild(createContent);
    logHistory.insertBefore(createContent, logHistory.firstChild); //inserts the new log text as first child
  },

  cant: () => {
    var logHistory = document.querySelector('.history');
    var createContent = document.createElement('div');
    createContent.textContent = "You can't do that!";
    //logHistory.appendChild(createContent);
    logHistory.insertBefore(createContent, logHistory.firstChild);
  }
};

//make a sort of magic box that controls the game. basically that magicbox has to be called after each click, and it knows perfectly which players turn it is, and which sign (x or 0) to put inside the empty space




/*use a module as a game that will keep track of evereything. when you make moves with your players
update the game variables, so you know when a player wins or loses, and when to assign points*/

