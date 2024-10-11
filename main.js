function getUserInput() {
  const player1Name = document.querySelector("#player1-name").value;
  const player2Name = document.querySelector("#player2-name").value;
  const startGame = document.querySelector("#start");
  const restGame = document.querySelector("#reset");
  return { player1Name, player2Name, startGame, restGame };
}

function GameBoard() {
  const gameBoard = document.querySelector(".game-board");

  const row = 3;
  const column = 3;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("id", `${i}-${j}`);
      gameBoard.appendChild(cell);
    }
  }

  return {
    gameBoard,
  };
}

function cellfunc() {
  let value = "";
  const disclaimer = document.querySelector(".disclaimer");
  const gameBoardCells = Array.from(document.querySelectorAll(".cell"));
  const addToken = (targetCell, token) => {
    if (targetCell.textContent === "") {
      disclaimer.textContent = "";
      const soul = gameBoardCells.filter((cell) => cell === targetCell);

      if (soul.length) {
        soul[0].textContent = token;
        return true;
      }
    }
  };
  const getValue = () => value;
  return { addToken, getValue };
}

function startTheGame() {
  const startButton = document.getElementById("start");
  startButton.setAttribute("disabled", "");
  const getStartButton = () => startButton;
  const gameBoardDiv = document.querySelector(".game-board");
  const userInputs = getUserInput();
  const gameBoard = GameBoard();
  let gameOver = false;
  const players = [
    {
      name: userInputs.player1Name || "Player One",
      token: "X",
    },
    {
      name: userInputs.player2Name || "Player Two",
      token: "O",
    },
  ];
  let disclaimer = document.querySelector(".disclaimer");
  disclaimer.textContent = "";

  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const resetActivePlayer = () => {
    activePlayer = players[0];
  };
  const printNewRound = () => {
    const h1 = document.getElementsByTagName("h1");
    h1[0].textContent = `${activePlayer.name}'s turn`;
  };

  /* const resetPrintNewRound = () => {
    const h1 = document.getElementsByTagName("h1");
    h1[0].textContent = "Tic Tac Toe";
  }; */

  printNewRound();
  const getPrintNewRound = () => printNewRound;
  let isMoveSuccessful = cellfunc();
  console.log(isMoveSuccessful);
  const getIsMoveSuccessful = () => isMoveSuccessful;

  const handleClickOnEachCell = (e) => {
    const targetCell = e.target;
    const token = getActivePlayer().token;
    console.log(token);
    if (targetCell.textContent !== "") {
      // disclaimer.textContent = "Cell is occupied choose empty one";

      return;
    }
    cellfunc().addToken(targetCell, token);

    if (gameOver === false) {
      const checkwinner = decideWinner(token).getCheckwin();
      console.log(checkwinner());

      if (checkwinner()) {
        gameOver = true;
        const h1 = document.getElementsByTagName("h1");
        h1[0].textContent = `${activePlayer.name} won the game`;
        setTimeout(() => {
          const cells = document.querySelectorAll(".cell");
          cells.forEach((cell) => (cell.textContent = ""));
          while (gameBoardDiv.firstChild) {
            gameBoardDiv.removeChild(gameBoardDiv.firstChild);
          }
          startButton.removeAttribute("disabled");
          h1[0].textContent = "Tic Tac Toe";
        }, 5000);
        gameBoardDiv.removeEventListener("click", handleClickOnEachCell);
      } else {
        const allCells = Array.from(document.querySelectorAll(".cell"));
        const isBoardFull = allCells.every((cell) => cell.textContent !== "");
        if (isBoardFull) {
          gameOver = true;
          const h1 = document.getElementsByTagName("h1");
          h1[0].textContent = "Match ends in draw";
          setTimeout(() => {
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => (cell.textContent = ""));
            while (gameBoardDiv.firstChild) {
              gameBoardDiv.removeChild(gameBoardDiv.firstChild);
            }
            startButton.removeAttribute("disabled");
            h1[0].textContent = "Tic Tac Toe";
          }, 5000);
          gameBoardDiv.removeEventListener("click", handleClickOnEachCell);
        } else {
          switchPlayerTurn();

          printNewRound();
        }
      }
    }
  };
  const getHandleClickOnEachCell = () => handleClickOnEachCell;
  if (!gameOver) {
    gameBoardDiv.addEventListener("click", handleClickOnEachCell);
  }

  return {
    getActivePlayer,
    switchPlayerTurn,
    getStartButton,
    getHandleClickOnEachCell,
    getPrintNewRound,
    resetActivePlayer,
    getIsMoveSuccessful,
    // resetPrintNewRound,
  };
}

function decideWinner(token) {
  const allCells = Array.from(document.querySelectorAll(".cell"));

  const datas = allCells.map((cell) => ({
    id: cell.id,
    textcontent: cell.textContent,
  }));

  const winningCombinations = [
    ["0-0", "0-1", "0-2"],
    ["1-0", "1-1", "1-2"],
    ["2-0", "2-1", "2-2"],
    ["0-0", "1-0", "2-0"],
    ["0-1", "1-1", "2-1"],
    ["0-2", "1-2", "2-2"],
    ["0-0", "1-1", "2-2"],
    ["0-2", "1-1", "2-0"],
  ];
  console.log(token);

  const checkWin = () => {
    return winningCombinations.some((combination) =>
      combination.every((id) =>
        datas.some((cell) => {
          return cell.id === id && cell.textcontent === token;
        })
      )
    );
  };
  console.log(checkWin());
  const getCheckwin = () => checkWin;

  return {
    getCheckwin,
  };
}

function resetTheGame(gameState) {
  const gameBoardDiv = document.querySelector(".game-board");

  const h1 = document.getElementsByTagName("h1");

  const handleClickOnEachCell = startTheGame().getHandleClickOnEachCell();

  gameBoardDiv.removeEventListener("click", handleClickOnEachCell);

  while (gameBoardDiv.firstChild) {
    gameBoardDiv.removeChild(gameBoardDiv.firstChild);
  }

  document.getElementById("start").removeAttribute("disabled");

  h1[0].textContent = "Tic Tac Toe";
  document.querySelector(".disclaimer").textContent = "";

  document.querySelector("#player1-name").value = "";
  document.querySelector("#player2-name").value = "";

  // GameBoard();
  gameState.resetActivePlayer();
  gameState.getPrintNewRound()();
  return;
}

const gameControl = function gameController() {
  const userInputs = getUserInput();
  let gameState;
  userInputs.startGame.addEventListener(
    "click",
    () => (gameState = startTheGame())
  );
  userInputs.restGame.addEventListener("click", () => {
    if (gameState) {
      resetTheGame(gameState);
    }
  });
};

gameControl();
