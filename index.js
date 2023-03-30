const gameBoard = (() => {
    let board = new Array(9);
    
    const getGameBoard = () => {
        return gameBoard;
    }

    const updateCell = (i,sign) => {
        board[i] = sign;
    }

    return{
        getGameBoard,
        updateCell,
    }
})();

const player = (sign) =>{
    let _sign = sign;
    let score = 0;
};

const displayControl = (() => {
    //

    return{

    }
})();

const gameController = (() => {
    //const playRound = () => 
    const cells = document.getElementsByClassName('block');
    const placeSign = (sign) => {

    }

    const clickCell = () => {
        for(let i = 0; i<9; i++){
            cells[i].onclick = function() {
                cells[i].innerHTML = 'x';
                console.log('working');
            }
        }
    }

    return{
        clickCell,
    }
})();

gameController.clickCell();