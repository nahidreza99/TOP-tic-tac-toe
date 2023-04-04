const gameBoard = (() => {
    let board = new Array(9);
    
    const getGameBoard = () => {
      return board;
    }
  
    const updateCell = (i,sign) => {
      board[i] = sign;
    }
  
    const getDiagonal = () => {
      if(board[0] === board[4] && board[4] === board[8]){
        if(board[0]===undefined){
          return false;
        }
        return true;
      }
      if(board[2] === board[4] && board[4] === board[6]){
        if(board[2]===undefined){
          return false;
        }
        return true;
      }
      return false;
    }
  
    const getHorizontal = () => {
      if(board[0] === board[1] && board[1] === board[2]){
        if(board[0]===undefined){
          return false;
        }
        return true;
      }
      if(board[3] === board[4] && board[4] === board[5]){
        if(board[3]===undefined){
          return false;
        }
        return true;
      }
      if(board[6] === board[7] && board[7] === board[8]){
        if(board[6]===undefined){
          return false;
        }
        return true;
      }
      return false;
    }
  
    const getVertical = () => {
      if(board[0] === board[3] && board[3] === board[6]){
        if(board[0]===undefined){
          return false;
        }
        return true;
      }
      if(board[1] === board[4] && board[4] === board[7]){
        if(board[1]===undefined){
          return false;
        }
        return true;
      }
      if(board[2] === board[5] && board[5] === board[8]){
        if(board[2]===undefined){
          return false;
        }
        return true;
      }
      return false;
    }
  
    const checkWin = () => {
      return getDiagonal() || getHorizontal() || getVertical();
    }
  
    return{
      getGameBoard,
      updateCell,
      getHorizontal,
      getVertical,
      getDiagonal,
      checkWin,
    }
  })();
  
  const player = (sign) =>{
    let _sign = sign;
    let score = 0;
    
    const getSign = () => {
      return _sign;
    }
  
    const getScore = () => {
      return score;
    }
  
    const addScore = () => {
      score++;
    }
  
    return{
      getSign,
      getScore,
      addScore,
    }
  };
  
  const displayControl = (() => {
    const placeSign = (cell, sign) => {
      cell.innerHTML = sign;
    }
  
    const resetBoard = () => {
      const cells = document.getElementsByClassName('block');
      for(let i = 0; i<9; i++){
        cells[i].innerHTML = "";
      }
    }
  
    const updateScore = (player1Score, player2Score) => {
      const score1 = document.getElementById('score1');
      const score2 = document.getElementById('score2');
      score1.innerHTML = player1Score;
      score2.innerHTML = player2Score;
    }

    function drawLine(x1, y1, x2, y2) {
      let line = document.createElement("div");
      line.style.position = "absolute";
      line.style.width = "2px";
      line.style.height = Math.sqrt(Math.pow(y2-y1,2) + Math.pow(x2-x1,2)) + "px";
      line.style.left = x1+(x2-x1)/2 + "px";
      line.style.top = y1 + "px";
      line.style.backgroundColor = "black";
      line.style.transform = "rotate(" +"-"+ Math.atan2(y2-y1,x2-x1) + "rad)";
      document.body.appendChild(line);
    }
  
    return{
      placeSign,
      resetBoard,
      updateScore,
      drawLine,
    }
  })();

  const gameController = (() => {
    const cells = document.getElementsByClassName('block');
      
    const p1 = player('X');
    const p2 = player('O');
    let turn = 1;
    let currentPlayer = p1;
      
    const clickCell = () => {
      for(let i = 0; i<9; i++){
        cells[i].addEventListener('click', e => {
          if(gameBoard.getGameBoard()[i] === undefined){
            gameBoard.updateCell(i, currentPlayer.getSign());
            displayControl.placeSign(e.target, currentPlayer.getSign());
            if(turn == 9 || (turn>4 && checkEndGame())){
              showEndGameMessage(getWinner());
              x1=cells[0].getBoundingClientRect().x;
              y1=cells[0].getBoundingClientRect().y;
              x2=cells[8].getBoundingClientRect().x;
              y2=cells[8].getBoundingClientRect().y;
              console.log(x1,y1,x2,y2)
              displayControl.drawLine(x1,y1,x2,y2);
            }
            swapTurn();
          }
          turn+=1;
        })
      }
    }
  
    const checkEndGame = () => {
      if(gameBoard.getHorizontal() || gameBoard.getVertical() || gameBoard.getDiagonal()){
        return true;
      }
      return false;
    }
  
    const getWinner = () => {
      if(gameBoard.getHorizontal()){
        for(let i = 0; i<9; i+=3){
          if(gameBoard.getGameBoard()[i] === gameBoard.getGameBoard()[i+1] && gameBoard.getGameBoard()[i+1] === gameBoard.getGameBoard()[i+2]){
            return gameBoard.getGameBoard()[i];
          }
        }
      }
      if(gameBoard.getVertical()){
        for(let i = 0; i<3; i++){
          if(gameBoard.getGameBoard()[i] === gameBoard.getGameBoard()[i+3] && gameBoard.getGameBoard()[i+3] === gameBoard.getGameBoard()[i+6]){
            return gameBoard.getGameBoard()[i];
          }
        }
      }
      if(gameBoard.getDiagonal()){
        if(gameBoard.getGameBoard()[0] === gameBoard.getGameBoard()[4] && gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[8]){
          return gameBoard.getGameBoard()[0];
        }
        if(gameBoard.getGameBoard()[2] === gameBoard.getGameBoard()[4] && gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[6]){
          return gameBoard.getGameBoard()[2];
        }
      }
      return null;
    }
  
    const showEndGameMessage = (winner) => {
      const message = document.getElementById('message');
      if(winner){
        message.innerHTML = `Player ${winner} wins!`;
      }
      else{
        message.innerHTML = "It's a tie!";
      }
    }
  
    const swapTurn  = () => {
      if(currentPlayer === p1){
        currentPlayer = p2;
      }
      else{
        currentPlayer = p1;
      }
    }
  
    return{
      clickCell,
      currentPlayer,
      showEndGameMessage,
      turn,
    }
  })();
  
  gameController.clickCell();