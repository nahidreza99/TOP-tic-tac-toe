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
        if(board[0]!=undefined){
          return true;
        }
      }
      if(board[2] === board[4] && board[4] === board[6]){
        if(board[2]!=undefined){
          return true;
        }
      }
      return false;
    }
  
    const getHorizontal = () => {
      if(board[0] === board[1] && board[1] === board[2]){
        if(board[0]!=undefined){
          return true;
        }
      }
      if(board[3] === board[4] && board[4] === board[5]){
        if(board[3]!=undefined){
          return true;
        }
      }
      if(board[6] === board[7] && board[7] === board[8]){
        if(board[6]!=undefined){
          return true;
        }
      }
      return false;
    }
  
    const getVertical = () => {
      if(board[0] === board[3] && board[3] === board[6]){
        if(board[0]!=undefined){
          return true;
        }
      }
      if(board[1] === board[4] && board[4] === board[7]){
        if(board[1]!=undefined){
          return true;
        }
      }
      if(board[2] === board[5] && board[5] === board[8]){
        if(board[2]!=undefined){
          return true;
        }
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

    function drawLine(ax, ay, bx, by, orientation) {
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
      let line = document.createElement('div');
      line.id = 'line';
      line.style.height = length +'px';
      line.style.width = 5 +'px';
      line.style.backgroundColor = 'black';
      line.style.position = 'absolute';
      line.style.top = ay + 'px';
      line.style.left = ax +'px';
      if(orientation === "horizontal"){
        line.style.transform = "rotate(-90deg)";
        line.style.webkitTransformOrigin = "0% 0%";
      }
      if(orientation === "vertical"){

      }
      if(orientation === "diagonal"){
        line.style.transform = "rotate("+calc+"deg)"
        line.style.webkitTransformOrigin = "0% 0%";
      }
      document.body.appendChild(line);
      //document.body.innerHTML += "<div id='line' style='height:" + length + "px;width:5px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
    }

    const drawStraight = (x1, y1, x2, y2) => {
      let line = document.createElement("div");
      line.style.position = "absolute";
      line.style.width = "2px";
      line.style.height = Math.sqrt(Math.pow(y2-y1,2) + Math.pow(x2-x1,2)) + "px";
      line.style.left = x1 + "px";
      line.style.top = y1 + "px";
      line.style.backgroundColor = "black";
      //line.style.transform = "rotate(" +"-"+ Math.atan2(y2-y1, x2-x1) + "rad)";
      document.body.appendChild(line);
    }
  
    return{
      placeSign,
      resetBoard,
      updateScore,
      drawLine,
      drawStraight,
    }
  })();

  const gameController = (() => {
    const cells = document.getElementsByClassName('block');
      
    const p1 = player('X');
    const p2 = player('O');
    let turn = 1;
    let currentPlayer = p1;
    let matchedBlocks = new Array(2);
      
    const clickCell = () => {
      for(let i = 0; i<9; i++){
        cells[i].addEventListener('click', e => {
          if(gameBoard.getGameBoard()[i] === undefined){
            gameBoard.updateCell(i, currentPlayer.getSign());
            displayControl.placeSign(e.target, currentPlayer.getSign());
            if(turn>4 && checkEndGame()){
              showEndGameMessage(getWinner());
              //const coord = getMatchingPoints();
              //displayControl.drawLine(coord.x1, coord.y1, coord.x2, coord.y2);
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

    const getMatchingPoints = () => {
      x1=matchedBlocks[0].getBoundingClientRect().x + matchedBlocks[0].getBoundingClientRect().width/2;
      y1=matchedBlocks[0].getBoundingClientRect().y + matchedBlocks[0].getBoundingClientRect().height/2;
      x2=matchedBlocks[1].getBoundingClientRect().x + matchedBlocks[1].getBoundingClientRect().width/2;
      y2=matchedBlocks[1].getBoundingClientRect().y + matchedBlocks[1].getBoundingClientRect().height/2;
      return {x1, y1, x2, y2}
    }
  
    const getWinner = () => {
      if(gameBoard.getHorizontal()){
        for(let i = 0; i<9; i+=3){
          if(gameBoard.getGameBoard()[i] === gameBoard.getGameBoard()[i+1] && gameBoard.getGameBoard()[i+1] === gameBoard.getGameBoard()[i+2]){
            if(gameBoard.getGameBoard()[i]!=undefined){
              matchedBlocks[0] = cells[i];
              matchedBlocks[1] = cells[i+2];
              const coord = getMatchingPoints();
              displayControl.drawLine(coord.x1, coord.y1, coord.x2, coord.y2, "horizontal");
              return gameBoard.getGameBoard()[i];
            }
          }
        }
      }
      if(gameBoard.getVertical()){
        for(let i = 0; i<3; i++){
          if(gameBoard.getGameBoard()[i] === gameBoard.getGameBoard()[i+3] && gameBoard.getGameBoard()[i+3] === gameBoard.getGameBoard()[i+6]){
            if(gameBoard.getGameBoard()[i]!=undefined){
              matchedBlocks[0] = cells[i];
              matchedBlocks[1] = cells[i+6];
              const coord = getMatchingPoints();
              displayControl.drawLine(coord.x1, coord.y1, coord.x2, coord.y2, "vertical");
              return gameBoard.getGameBoard()[i];
            }
          }
        }
      }
      if(gameBoard.getDiagonal()){
        if(gameBoard.getGameBoard()[0] === gameBoard.getGameBoard()[4] && gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[8]){
          if(gameBoard.getGameBoard()[0]!=undefined){
            matchedBlocks[0] = cells[0];
            matchedBlocks[1] = cells[8];
            const coord = getMatchingPoints();
            displayControl.drawLine(coord.x1, coord.y1, coord.x2, coord.y2, "diagonal");
            return gameBoard.getGameBoard()[0];
          }
        }
        if(gameBoard.getGameBoard()[2] === gameBoard.getGameBoard()[4] && gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[6]){
          if(gameBoard.getGameBoard()[2]!=undefined){
            matchedBlocks[0] = cells[2];
            matchedBlocks[1] = cells[6];
            const coord = getMatchingPoints();
            displayControl.drawLine(coord.x1, coord.y1, coord.x2, coord.y2, "diagonal");
            return gameBoard.getGameBoard()[2];
          }
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
      matchedBlocks,
      getMatchingPoints,
    }
  })();
  
  gameController.clickCell();