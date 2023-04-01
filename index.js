const gameBoard = (() => {
    let board = new Array(9);
    
    const getGameBoard = () => {
        return board;
    }

    const updateCell = (i,sign) => {
        board[i] = sign;
    }

    const getDiagonal = () => {
        if(board[0] === board[4] === board[8]){
            return true;
        }
        if(board[2] === board[4] === board[6]){
            return true;
        }
        return false;
    }

    const getHorizontal = () => {
        if(board[0] === board[1] === board[2]){
            return true;
        }
        if(board[3] === board[4] === board[5]){
            return true;
        }
        if(board[6] === board[7] === board[8]){
            return true;
        }
        return false;
    }

    const getVertical = () => {
        if(board[0] === board[3] === board[6]){
            return true;
        }
        if(board[1] === board[4] === board[7]){
            return true;
        }
        if(board[3] === board[5] === board[8]){
            return true;
        }
        return false;
    }

    return{
        getGameBoard,
        updateCell,
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

    return{
        getSign,
        getScore,
    }
};

const displayControl = (() => {
    const placeSign = (cell, sign) => {
        cell.innerHTML = sign;
    }

    return{
        placeSign,
    }
})();

const gameController = (() => {
    const cells = document.getElementsByClassName('block');
    
    const p1 = player('X');
    const p2 = player('O');
    
    let currentPlayer = p1;
    
    // const placeSign = (sign) => {

    // }

    const clickCell = () => {
        for(let i = 0; i<9; i++){
            cells[i].addEventListener('click', e => {
                displayControl.placeSign(e.target, currentPlayer.getSign());
                swapTurn();
            })
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
    }
})();

gameController.clickCell();