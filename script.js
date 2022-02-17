const playerFac = (name, marker) => {
  const playerWin = (player) => console.log(`${player.name} won the game!`);
  marker = marker;
  name = name;
  const myTurn = () => displayController.playerTurn = marker;
  return { name, playerWin, myTurn};
};

const gameBoard = (() => {
  const intro = document.querySelector(".intro");
  intro.style.animation = "chooseAnim 0.25s 4.1s forwards";

  const winDisplay = document.querySelector(".win-menu");
  const closeWin = document.querySelector(".close-win");
  closeWin.addEventListener('click', ()=>{
    winDisplay.style.display = "none";
    board.forEach(spot => restart(spot));
  })
  let winnerName = document.querySelector(".winSpan");

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.classList.add('restart');
  restartButton.addEventListener('click', ()=>{
    board.forEach(spot => restart(spot));
  })
  document.body.appendChild(restartButton);

  const playButton = document.querySelector(".button-play");
  const menu = document.querySelector(".main-menu");
  const bgCover = document.querySelector(".bg-cover");
  const playerXInp = document.querySelector(".playerX");
  const playerOInp = document.querySelector(".playerO");
  let playerX = playerFac("", "X");
  let playerO = playerFac("", "O");

  playButton.addEventListener('click', () => {
    menu.style.display = "none";
    bgCover.style.animation = "chooseAnim 0.1s forwards";
    playerX.name = playerXInp.value;
    playerO.name = playerOInp.value;
  })

  const restart = (spot) => {spot.textContent =""; displayController.playerTurn="X"};
  
  const container = document.createElement('div');
  container.classList.add("container");
  document.body.appendChild(container);
  let board = [];
  for (let i = 1; i<10; i++){
    let spot = document.createElement("div");
    spot.classList.add("spot", ("s"+i));
    spot.addEventListener('click', ()=>{
      draw(spot);
      displayController.winCheck();
    });
    board.push(spot);
  }
  board.forEach(spot => container.appendChild(spot));

  const draw = (spot) => {
    if (spot.textContent == ""){
      spot.textContent = displayController.playerTurn;
      displayController.playerTurn = displayController.playerTurn == "X" ? playerO.myTurn() : playerX.myTurn();
    }}
  return {board, playerX, playerO, winnerName, winDisplay};
})();

const displayController = (() => {
  drawMess = document.querySelector(".draw-message");
  const winMessage = document.querySelector(".win-message")
  let playerTurn = "X";
  let winner = "";
  const winCheck = () =>{
    let boardie = gameBoard.board;
    switch(true){
      case(boardie[0].textContent == "X" && boardie[1].textContent == "X" && boardie[2].textContent == "X"||
           boardie[3].textContent == "X" && boardie[4].textContent == "X" && boardie[5].textContent == "X"||
           boardie[6].textContent == "X" && boardie[7].textContent == "X" && boardie[8].textContent == "X"||
           boardie[0].textContent == "X" && boardie[3].textContent == "X" && boardie[6].textContent == "X"||
           boardie[1].textContent == "X" && boardie[4].textContent == "X" && boardie[7].textContent == "X"||
           boardie[2].textContent == "X" && boardie[5].textContent == "X" && boardie[8].textContent == "X"||
           boardie[0].textContent == "X" && boardie[4].textContent == "X" && boardie[8].textContent == "X"||
           boardie[2].textContent == "X" && boardie[4].textContent == "X" && boardie[6].textContent == "X"):
        winner = "X";
        drawMess.style.display = "none";
        gameBoard.playerX.playerWin(gameBoard.playerX);
        gameBoard.winnerName.textContent = gameBoard.playerX.name;
        winMessage.style.display = "inline";
        gameBoard.winDisplay.style.display = "flex";
        break;
      case(boardie[0].textContent == "O" && boardie[1].textContent == "O" && boardie[2].textContent == "O"||
           boardie[3].textContent == "O" && boardie[4].textContent == "O" && boardie[5].textContent == "O"||
           boardie[6].textContent == "O" && boardie[7].textContent == "O" && boardie[8].textContent == "O"||
           boardie[0].textContent == "O" && boardie[3].textContent == "O" && boardie[6].textContent == "O"||
           boardie[1].textContent == "O" && boardie[4].textContent == "O" && boardie[7].textContent == "O"||
           boardie[2].textContent == "O" && boardie[5].textContent == "O" && boardie[8].textContent == "O"||
           boardie[0].textContent == "O" && boardie[4].textContent == "O" && boardie[8].textContent == "O"||
           boardie[2].textContent == "O" && boardie[4].textContent == "O" && boardie[6].textContent == "O"):
        winner = "O";
        drawMess.style.display = "none";
        gameBoard.playerO.playerWin(gameBoard.playerO);
        gameBoard.winnerName.textContent = gameBoard.playerO.name;
        winMessage.style.display = "inline";
        gameBoard.winDisplay.style.display = "flex";
        break;
      case(boardie[0].textContent != "" && boardie[1].textContent != "" && boardie[2].textContent != "" &&
           boardie[3].textContent != "" && boardie[4].textContent != "" && boardie[5].textContent != "" &&
           boardie[6].textContent != "" && boardie[7].textContent != "" && boardie[8].textContent != ""):
        drawMess.style.display = "inline";
        winMessage.style.display = "none";
        gameBoard.winDisplay.style.display = "flex";
        
    }}
  
  return {winCheck, playerTurn};
})();