/* =========================================================
   BHESS7
   Chess + Bot
========================================================= */


/* =========================================================
   SCREENS
========================================================= */

const homeScreen =
    document.getElementById("homeScreen");

const botScreen =
    document.getElementById("botScreen");

const multiplayerScreen =
    document.getElementById("multiplayerScreen");

const partyScreen =
    document.getElementById("partyScreen");

const gameScreen =
    document.getElementById("gameScreen");


/* =========================================================
   BUTTONS
========================================================= */

const botButton =
    document.getElementById("botButton");

const multiplayerButton =
    document.getElementById("multiplayerButton");

const botBackButton =
    document.getElementById("botBackButton");

const backButton =
    document.getElementById("backButton");

const startBotButton =
    document.getElementById("startBotButton");

const gameBackButton =
    document.getElementById("gameBackButton");

const newGameButton =
    document.getElementById("newGameButton");

const createPartyButton =
    document.getElementById("createPartyButton");

const joinPartyButton =
    document.getElementById("joinPartyButton");

const cancelPartyButton =
    document.getElementById("cancelPartyButton");


/* =========================================================
   ELEMENTS
========================================================= */

const eloSlider =
    document.getElementById("eloSlider");

const eloDisplay =
    document.getElementById("eloDisplay");

const botDescription =
    document.getElementById("botDescription");

const gameBotRating =
    document.getElementById("gameBotRating");

const gameStatus =
    document.getElementById("gameStatus");

const chessBoard =
    document.getElementById("chessBoard");

const joinCodeInput =
    document.getElementById("joinCodeInput");

const partyCode =
    document.getElementById("partyCode");

const message =
    document.getElementById("message");


/* =========================================================
   CHESS VARIABLES
========================================================= */

let chess;

let selectedSquare = null;

let playerColor = "w";

let botColor = "b";

let botElo = 1200;

let botThinking = false;


/* =========================================================
   PIECES
========================================================= */

const pieceSymbols = {

    w: {
        p: "♙",
        n: "♘",
        b: "♗",
        r: "♖",
        q: "♕",
        k: "♔"
    },

    b: {
        p: "♟",
        n: "♞",
        b: "♝",
        r: "♜",
        q: "♛",
        k: "♚"
    }

};


/* =========================================================
   SCREEN SWITCHING
========================================================= */

function showScreen(screen) {

    document.querySelectorAll(".screen")
        .forEach(function (item) {

            item.classList.remove("active");

        });

    screen.classList.add("active");

}


/* =========================================================
   HOME
========================================================= */

botButton.addEventListener("click", function () {

    updateBotDisplay();

    showScreen(botScreen);

});


multiplayerButton.addEventListener("click", function () {

    message.textContent = "";

    joinCodeInput.value = "";

    showScreen(multiplayerScreen);

});


/* =========================================================
   BACK
========================================================= */

botBackButton.addEventListener("click", function () {

    showScreen(homeScreen);

});


backButton.addEventListener("click", function () {

    showScreen(homeScreen);

});


gameBackButton.addEventListener("click", function () {

    if (chess) {

        chess = null;

    }

    botThinking = false;

    showScreen(homeScreen);

});


/* =========================================================
   BOT ELO
========================================================= */

function getBotDescription(elo) {

    if (elo <= 600) {
        return "A beginner-level opponent.";
    }

    if (elo <= 900) {
        return "A casual opponent.";
    }

    if (elo <= 1200) {
        return "A balanced opponent.";
    }

    if (elo <= 1500) {
        return "A challenging opponent.";
    }

    if (elo <= 1800) {
        return "A strong opponent.";
    }

    if (elo <= 2100) {
        return "A very strong opponent.";
    }

    return "An extremely difficult opponent.";
}


function updateBotDisplay() {

    const elo =
        Number(eloSlider.value);

    eloDisplay.textContent = elo;

    botDescription.textContent =
        getBotDescription(elo);

}


eloSlider.addEventListener("input", function () {

    updateBotDisplay();

});


/* =========================================================
   ELO → BOT SETTINGS
========================================================= */

function getBotSettings(elo) {

    /*
        These are difficulty settings rather
        than guaranteed official Elo ratings.

        Higher Elo:
        - searches deeper
        - considers more candidate moves
        - makes fewer random mistakes
    */

    if (elo <= 600) {

        return {
            depth: 1,
            randomness: 0.75
        };

    }

    if (elo <= 900) {

        return {
            depth: 1,
            randomness: 0.45
        };

    }

    if (elo <= 1200) {

        return {
            depth: 2,
            randomness: 0.30
        };

    }

    if (elo <= 1500) {

        return {
            depth: 2,
            randomness: 0.16
        };

    }

    if (elo <= 1800) {

        return {
            depth: 3,
            randomness: 0.10
        };

    }

    if (elo <= 2100) {

        return {
            depth: 3,
            randomness: 0.04
        };

    }

    return {
        depth: 4,
        randomness: 0.01
    };

}


/* =========================================================
   START BOT GAME
========================================================= */

startBotButton.addEventListener("click", function () {

    botElo =
        Number(eloSlider.value);

    gameBotRating.textContent =
        "Bot • " + botElo;

    startNewBotGame();

    showScreen(gameScreen);

});


/* =========================================================
   START NEW GAME
========================================================= */

function startNewBotGame() {

    chess = new Chess();

    selectedSquare = null;

    botThinking = false;

    gameStatus.textContent =
        "Your turn";

    renderBoard();

}


/* =========================================================
   NEW GAME BUTTON
========================================================= */

newGameButton.addEventListener("click", function () {

    startNewBotGame();

});


/* =========================================================
   RENDER BOARD
========================================================= */

function renderBoard() {

    chessBoard.innerHTML = "";

    const board =
        chess.board();

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const square =
                document.createElement("div");

            const file =
                String.fromCharCode(97 + col);

            const rank =
                8 - row;

            const squareName =
                file + rank;

            square.classList.add("square");

            if ((row + col) % 2 === 0) {

                square.classList.add("light");

            } else {

                square.classList.add("dark");

            }


            /*
                Highlight selected square.
            */

            if (selectedSquare === squareName) {

                square.classList.add("selected");

            }


            /*
                Highlight legal moves.
            */

            if (selectedSquare) {

                const legalMoves =
                    chess.moves({
                        square: selectedSquare,
                        verbose: true
                    });

                const canMoveThere =
                    legalMoves.some(function (move) {

                        return move.to === squareName;

                    });

                if (canMoveThere) {

                    square.classList.add("legal");

                }

            }


            const piece =
                board[row][col];


            if (piece) {

                const pieceElement =
                    document.createElement("div");

                pieceElement.classList.add("piece");

                if (piece.color === "w") {

                    pieceElement.classList.add("white");

                } else {

                    pieceElement.classList.add("black");

                }

                pieceElement.textContent =
                    pieceSymbols[piece.color][piece.type];

                square.appendChild(pieceElement);

            }


            square.addEventListener(
                "click",
                function () {

                    handleSquareClick(squareName);

                }
            );


            chessBoard.appendChild(square);

        }

    }

}


/* =========================================================
   PLAYER CLICK
========================================================= */

function handleSquareClick(square) {

    if (!chess) {
        return;
    }

    if (botThinking) {
        return;
    }

    if (chess.isGameOver()) {
        return;
    }

    /*
        Player is always White.
    */

    if (chess.turn() !== playerColor) {
        return;
    }


    const piece =
        chess.get(square);


    /*
        Nothing selected yet.
    */

    if (!selectedSquare) {

        if (
            piece &&
            piece.color === playerColor
        ) {

            selectedSquare = square;

            renderBoard();

        }

        return;
    }


    /*
        Clicking another own piece
        changes selection.
    */

    if (
        piece &&
        piece.color === playerColor
    ) {

        selectedSquare = square;

        renderBoard();

        return;
    }


    /*
        Attempt move.
    */

    try {

        const move =
            chess.move({
                from: selectedSquare,
                to: square,
                promotion: "q"
            });

        if (move) {

            selectedSquare = null;

            renderBoard();

            checkGameState();

            if (!chess.isGameOver()) {

                botMove();

            }

        }

    } catch (error) {

        /*
            Illegal move.
        */

        selectedSquare = null;

        renderBoard();

    }

}


/* =========================================================
   CHECK GAME STATE
========================================================= */

function checkGameState() {

    if (!chess) {
        return;
    }


    if (chess.isCheckmate()) {

        if (chess.turn() === botColor) {

            gameStatus.textContent =
                "Checkmate — You win!";

        } else {

            gameStatus.textContent =
                "Checkmate — Bot wins.";

        }

        return;
    }


    if (chess.isDraw()) {

        gameStatus.textContent =
            "Draw.";

        return;
    }


    if (chess.isCheck()) {

        if (chess.turn() === playerColor) {

            gameStatus.textContent =
                "Check! Your turn.";

        } else {

            gameStatus.textContent =
                "Check! Bot is thinking.";

        }

        return;
    }


    if (chess.turn() === playerColor) {

        gameStatus.textContent =
            "Your turn";

    } else {

        gameStatus.textContent =
            "Bot is thinking...";

    }

}


/* =========================================================
   BOT MOVE
========================================================= */

function botMove() {

    if (!chess) {
        return;
    }

    if (chess.isGameOver()) {
        return;
    }

    botThinking = true;

    gameStatus.textContent =
        "Bot is thinking...";


    /*
        Small delay makes the bot feel
        like it is actually thinking.
    */

    setTimeout(function () {

        if (!chess || chess.isGameOver()) {

            botThinking = false;

            return;

        }


        const settings =
            getBotSettings(botElo);


        const bestMove =
            chooseBotMove(
                chess,
                settings
            );


        if (bestMove) {

            try {

                chess.move(bestMove);

            } catch (error) {

                console.error(
                    "Bot move failed:",
                    error
                );

            }

        }


        botThinking = false;

        renderBoard();

        checkGameState();

    }, 250);

}


/* =========================================================
   BOT MOVE SELECTION
========================================================= */

function chooseBotMove(position, settings) {

    const moves =
        position.moves({
            verbose: true
        });


    if (moves.length === 0) {

        return null;

    }


    /*
        Evaluate every legal move.
    */

    const scoredMoves =
        moves.map(function (move) {

            const testGame =
                new Chess(position.fen());

            testGame.move({
                from: move.from,
                to: move.to,
                promotion: "q"
            });


            const score =
                minimax(
                    testGame,
                    settings.depth - 1,
                    false,
                    -Infinity,
                    Infinity
                );


            return {
                move: move,
                score: score
            };

        });


    scoredMoves.sort(function (a, b) {

        return b.score - a.score;

    });


    /*
        At lower ratings, occasionally choose
        from a larger pool of moves.

        At higher ratings, choose the best move.
    */

    let poolSize = 1;


    if (settings.randomness > 0.5) {

        poolSize =
            Math.min(6, scoredMoves.length);

    } else if (settings.randomness > 0.2) {

        poolSize =
            Math.min(3, scoredMoves.length);

    } else if (settings.randomness > 0.05) {

        poolSize =
            Math.min(2, scoredMoves.length);

    }


    /*
        Sometimes make a weaker choice.
    */

    if (
        Math.random() <
        settings.randomness
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * poolSize
            );

        return scoredMoves[randomIndex].move;

    }


    return scoredMoves[0].move;

}


/* =========================================================
   MINIMAX
========================================================= */

function minimax(
    position,
    depth,
    maximizing,
    alpha,
    beta
) {

    /*
        Terminal positions.
    */

    if (position.isCheckmate()) {

        /*
            If it is White's turn in a checkmate
            position, Black has won.

            If it is Black's turn in a checkmate
            position, White has won.
        */

        if (position.turn() === "w") {

            return -100000;

        } else {

            return 100000;

        }

    }


    if (
        position.isDraw() ||
        depth <= 0
    ) {

        return evaluatePosition(position);

    }


    const moves =
        position.moves({
            verbose: true
        });


    if (maximizing) {

        let bestScore =
            -Infinity;


        for (const move of moves) {

            const next =
                new Chess(position.fen());

            next.move({
                from: move.from,
                to: move.to,
                promotion: "q"
            });


            const score =
                minimax(
                    next,
                    depth - 1,
                    false,
                    alpha,
                    beta
                );


            bestScore =
                Math.max(
                    bestScore,
                    score
                );


            alpha =
                Math.max(
                    alpha,
                    bestScore
                );


            if (beta <= alpha) {

                break;

            }

        }


        return bestScore;

    } else {

        let bestScore =
            Infinity;


        for (const move of moves) {

            const next =
                new Chess(position.fen());

            next.move({
                from: move.from,
                to: move.to,
                promotion: "q"
            });


            const score =
                minimax(
                    next,
                    depth - 1,
                    true,
                    alpha,
                    beta
                );


            bestScore =
                Math.min(
                    bestScore,
                    score
                );


            beta =
                Math.min(
                    beta,
                    bestScore
                );


            if (beta <= alpha) {

                break;

            }

        }


        return bestScore;

    }

}


/* =========================================================
   POSITION EVALUATION
========================================================= */

function evaluatePosition(position) {

    const values = {

        p: 100,
        n: 320,
        b: 330,
        r: 500,
        q: 900,
        k: 20000

    };


    let score = 0;


    const board =
        position.board();


    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece =
                board[row][col];


            if (!piece) {
                continue;
            }


            const value =
                values[piece.type];


            if (piece.color === "b") {

                score += value;

            } else {

                score -= value;

            }

        }

    }


    /*
        Small positional bonuses.
    */

    const blackMoves =
        position.moves({
            verbose: true
        }).length;


    if (position.turn() === "b") {

        score += blackMoves * 2;

    } else {

        score -= blackMoves * 2;

    }


    return score;

}


/* =========================================================
   PARTY SYSTEM
========================================================= */

function generatePartyCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        code += characters[randomIndex];

    }

    return code;

}


createPartyButton.addEventListener(
    "click",
    function () {

        const code =
            generatePartyCode();

        partyCode.textContent =
            code;

        showScreen(partyScreen);

    }
);


joinPartyButton.addEventListener(
    "click",
    function () {

        const code =
            joinCodeInput.value
                .trim()
                .toUpperCase();


        if (code.length !== 6) {

            message.textContent =
                "Please enter a 6-character join code.";

            return;

        }


        /*
            Base44 will replace this
            temporary section later.
        */

        message.textContent =
            "Party lookup will be connected to Base44 soon.";

    }
);


joinCodeInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            joinPartyButton.click();

        }

    }
);


joinCodeInput.addEventListener(
    "input",
    function () {

        joinCodeInput.value =
            joinCodeInput.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "");

    }
);


cancelPartyButton.addEventListener(
    "click",
    function () {

        showScreen(multiplayerScreen);

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateBotDisplay();
