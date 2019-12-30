function generateStock() {
    let stock = [];

    for (let i = 0; i <= 6; i++) {
        for (let j = 0; j <= i; j++) {

            stock.push([i, j]);
        }
    }
    return stock;
}

function pickRandomTile(stock) {
    if (stock.length != 0) {
        let index = Math.floor(Math.random() * stock.length);
        let tile = stock.splice(index, 1)[0];
        return tile;
    }
    else {
        return null;
    }
}

function prepareForGame(stock, board, player1, player2) {
    board.push(pickRandomTile(stock));
    console.log(`Game started with the first tile: <${board}>`);
    for (let i = 0; i < 7; i++) {
        player1.push(pickRandomTile(stock));
        player2.push(pickRandomTile(stock));
    }
}

function makeTurn(player, stock, board, name) {
    function putTileIfMatch(tile) {
        if (tile[0] == board[board.length - 1][1]) {
            console.log(`${name} put new tile: <${tile}> to ${board[board.length - 1]}`);
            board.push(tile);
            console.log(`Now the board is: <${board.join("> <")}>`);
            return true;
        }
        else if (tile[1] == board[board.length - 1][1]) {
            console.log(`${name} put new tile: <${tile}> to ${board[board.length - 1]}`);
            board.push(tile.reverse());
            console.log(`Now the board is: <${board.join("> <")}>`);
            return true;
        }
        else if (tile[1] == board[0][0]) {
            console.log(`${name} put new tile: <${tile}> to ${board[0]}`);
            board.unshift(tile);
            console.log(`Now the board is: <${board.join("> <")}>`);
            return true;
        }
        else if (tile[0] == board[0][0]) {
            console.log(`${name} put new tile: <${tile}> to ${board[0]}`);
            board.unshift(tile.reverse());
            console.log(`Now the board is: <${board.join("> <")}>`);
            return true;
        }
        return false;
    }


    for (let i = 0; i < player.length; i++) {
        let tile = player[i];
        if (putTileIfMatch(tile)) {
            player.splice(i, 1);
            return true;
        }
    }

    while (true) {
        let newTile = pickRandomTile(stock);
        if (newTile == null) {
            return false;
        }
        if (putTileIfMatch(newTile)) {
            return true;
        } else {
            player.push(newTile);
        }
    }

}


function playGame() {
    let stock = generateStock();
    let board = [];
    let player1 = [];
    let player2 = [];

    prepareForGame(stock, board, player1, player2);

    //players make turns alternatively while they have cards and matches
    while (true) {

        let player1MadeTurn = makeTurn(player1, stock, board, 'Player1');

        if (player1.length == 0) {
            console.log("Player 1 won");
            break;
        }

        let player2MadeTurn = makeTurn(player2, stock, board, 'Player2');
        if (player2.length == 0) {
            console.log("Player 2 won");
            break;
        }

        if (!player1MadeTurn && !player2MadeTurn) {

            let sumPlayer1 = player1.reduce((sum, tile) => sum + tile[0] + tile[1], 0);
            let sumPlayer2 = player2.reduce((sum, tile) => sum + tile[0] + tile[1], 0);

            if (sumPlayer1 < sumPlayer2) {
                console.log(`Player 1 won with score: ${sumPlayer1} vs ${sumPlayer2}`);
            } else if (sumPlayer1 > sumPlayer2) {
                console.log(`Player 2 won with score: ${sumPlayer2} vs ${sumPlayer1}`);
            } else {
                console.log(`Draw with score ${sumPlayer1}`);
            }
            break;
        }
    };

}

playGame();



