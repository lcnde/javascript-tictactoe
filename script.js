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


var spot = document.querySelectorAll(".space"); //this selects all the elements that have the class of space
spottable = Array.from(spot); //since that selecting multiple elements returns a "sort of array", we convert it to a real array
console.log(spottable)

spottable.forEach(function(element) { //for each element inside "spottable we execute a function, where "element" is the individual elements took one by one
  element.addEventListener('click', () => { //adds an event listener of click on each element and with an arrow function adds some code to them
    magicBox.play(element);
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
  },
  playerOneTurn: true, //just a function to know who's turn it is
  round: 0, //round counter
  playerOneMoves: [], //keeps track of the user choices
  playerTwoMoves: [], //keeps track of the user choices
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
    
  }

};

//make a sort of magic box that controls the game. basically that magicbox has to be called after each click, and it knows perfectly which players turn it is, and which sign (x or 0) to put inside the empty space




/*use a module as a game that will keep track of evereything. when you make moves with your players
update the game variables, so you know when a player wins or loses, and when to assign points*/

