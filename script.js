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

var spot = document.querySelectorAll(".space");
spottable = Array.from(spot);
console.log(spottable)

spottable.forEach(function(element) {
  element.addEventListener('click', () => {
    element.classList.add("spacex");
    });
});

/*use a module as a game that will keep track of evereything. when you make moves with your players
update the game variables, so you know when a player wins or loses, and when to assign points*/

