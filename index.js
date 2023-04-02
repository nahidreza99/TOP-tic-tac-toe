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
        return true;
      }
      if(board[2] === board[4] && board[4] === board[6]){
        return true;
      }
      return false;
    }
  
    const getHorizontal = () => {
      if(board[0] === board[1] && board[1] === board[2]){
        return true;
      }
      if(board[3] === board[4] && board[4] === board[5]){
        return true;
      }
      if(board[6] === board[7] && board[7] === board[8]){
        return true;
      }
      return false;
    }
  
    const getVertical = () => {
      if(board[0] === board[3] && board[3] === board[6]){
        return true;
      }
      if(board[1] === board[4] && board[4] === board[7]){
        return true;
      }
      if(board[2] === board[5] && board[5] === board[8]){
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
  
    return{
      placeSign,
      resetBoard,
      updateScore,
    }
  })();

  const gameController = (() => {
    const cells = document.getElementsByClassName('block');
      
    const p1 = player('X');
    const p2 = player('O');
      
    let currentPlayer = p1;
      
    const clickCell = () => {
      for(let i = 0; i<9; i++){
        cells[i].addEventListener('click', e => {
          if(gameBoard.getGameBoard()[i] === undefined){
            gameBoard.updateCell(i, currentPlayer.getSign());
            displayControl.placeSign(e.target, currentPlayer.getSign());
            if(checkEndGame()){
              showEndGameMessage(getWinner());
            }
            swapTurn();
          }
        })
      }
    }
  
    const checkEndGame = () => {
      if(gameBoard.getHorizontal() || gameBoard.getVertical() || gameBoard.getDiagonal()){
        return true;
      }
      for(let i = 0; i<9; i++){
        if(gameBoard.getGameBoard()[i] === undefined){
          return false;
        }
      }
      return true;
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
    }
  })();
  
  gameController.clickCell();