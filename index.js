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

    function drawLine(ax, ay, bx, by) {
      if(ay>by)
      {
          bx=ax+bx;  
          ax=bx-ax;
          bx=bx-ax;
          by=ay+by;  
          ay=by-ay;  
          by=by-ay;
      }
      var calc=Math.atan((ay-by)/(bx-ax));
      calc=calc*180/Math.PI;
      var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
      document.body.innerHTML += "<div id='line' style='height:" + length + "px;width:5px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
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
              x1=cells[0].getBoundingClientRect().x + cells[0].getBoundingClientRect().width/2;
              y1=cells[0].getBoundingClientRect().y + cells[0].getBoundingClientRect().height/2;
              x2=cells[8].getBoundingClientRect().x + cells[8].getBoundingClientRect().width/2;
              y2=cells[8].getBoundingClientRect().y + cells[8].getBoundingClientRect().height/2;
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