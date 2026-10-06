/* =========================================================
   BHESS7
   Main JavaScript
========================================================= */


/* =========================================================
   SCREEN ELEMENTS
========================================================= */

const homeScreen = document.getElementById("homeScreen");
const botScreen = document.getElementById("botScreen");
const gameScreen = document.getElementById("gameScreen");

const multiplayerScreen =
    document.getElementById("multiplayerScreen");

const partyScreen =
    document.getElementById("partyScreen");

const joinScreen =
    document.getElementById("joinScreen");


/* =========================================================
   HOME BUTTONS
========================================================= */

const playBotButton =
    document.getElementById("playBotButton");

const multiplayerButton =
    document.getElementById("multiplayerButton");


/* =========================================================
   BOT SETUP
========================================================= */

const startBotButton =
    document.getElementById("startBotButton");

const botBackButton =
    document.getElementById("botBackButton");

const eloSlider =
    document.getElementById("eloSlider");

const eloValue =
    document.getElementById("eloValue");

const botName =
    document.getElementById("botName");

const botDescription =
    document.getElementById("botDescription");


/* =========================================================
   GAME ELEMENTS
========================================================= */

const chessBoard =
    document.getElementById("chessBoard");

const gameStatus =
    document.getElementById("gameStatus");

const gameBotRating =
    document.getElementById("gameBotRating");

const gameBackButton =
    document.getElementById("gameBackButton");

const newGameButton =
    document.getElementById("newGameButton");

const resignButton =
    document.getElementById("resignButton");


/* =========================================================
   MULTIPLAYER ELEMENTS
========================================================= */

const createPartyButton =
    document.getElementById("createPartyButton");

const joinPartyButton =
    document.getElementById("joinPartyButton");

const multiplayerBackButton =
    document.getElementById("multiplayerBackButton");

const partyCode =
    document.getElementById("partyCode");

const cancelPartyButton =
    document.getElementById("cancelPartyButton");

const joinCodeInput =
    document.getElementById("joinCodeInput");

const confirmJoinButton =
    document.getElementById("confirmJoinButton");

const joinBackButton =
    document.getElementById("joinBackButton");

const joinMessage =
    document.getElementById("joinMessage");


/* =========================================================
   CHESS VARIABLES
========================================================= */

let chess = null;

let selectedSquare = null;

let playerColor = "w";

let botColor = "b";

let botElo = 1200;

let botThinking = false;


/* =========================================================
   CHESS PIECES
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

    document
        .querySelectorAll(".screen")
        .forEach(function (item) {

            item.classList.remove("active");

        });

    screen.classList.add("active");
}


/* =========================================================
   HOME → BOT
========================================================= */

playBotButton.addEventListener("click", function () {

    showScreen(botScreen);

});


/* =========================================================
   HOME → MULTIPLAYER
========================================================= */

multiplayerButton.addEventListener("click", function () {

    showScreen(multiplayerScreen);

});


/* =========================================================
   BOT DESCRIPTION
========================================================= */

function getBotDescription(elo) {

    if (elo <= 600) {
        return "Very easy";
    }

    if (elo <= 900) {
        return "Beginner";
    }

    if (elo <= 1200) {
        return "Casual";
    }

    if (elo <= 1500) {
        return "Intermediate";
    }

    if (elo <= 1800) {
        return "Advanced";
    }

    if (elo <= 2100) {
        return "Very strong";
    }

    return "Expert";
}


/* =========================================================
   UPDATE ELO DISPLAY
========================================================= */

function updateBotDisplay() {

    const elo = Number(eloSlider.value);

    eloValue.textContent = elo;

    botDescription.textContent =
        getBotDescription(elo);

}


eloSlider.addEventListener(
    "input",
    updateBotDisplay
);


/* =========================================================
   BOT SETTINGS
=========================================================

   IMPORTANT:
   These are approximate difficulty settings.

   They are NOT official Elo ratings.
========================================================= */

function getBotSettings(elo) {

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

        depth: 3,
        randomness: 0.01

    };

}


/* =========================================================
   START BOT GAME
========================================================= */

startBotButton.addEventListener(
    "click",
    function () {

        botElo =
            Number(eloSlider.value);

        gameBotRating.textContent =
            "Bot • " + botElo;


        /*
         * Show the game screen FIRST.
         *
         * This means that even if the chess engine
         * fails to load, you will actually see an
         * error instead of the button appearing broken.
         */

        showScreen(gameScreen);


        startNewBotGame();

    }
);


/* =========================================================
   START NEW GAME
========================================================= */

function startNewBotGame() {

    /*
     * Check whether chess.js loaded.
     */

    if (typeof Chess === "undefined") {

        chess = null;

        chessBoard.innerHTML = "";

        gameStatus.textContent =
            "Chess engine failed to load.";

        const errorMessage =
            document.createElement("div");

        errorMessage.style.padding = "30px";
        errorMessage.style.textAlign = "center";
        errorMessage.style.color = "#aaa";

        errorMessage.textContent =
            "Could not load chess.js. Check your internet connection and refresh the page.";

        chessBoard.appendChild(errorMessage);

        return;
    }


    /*
     * Create a brand-new chess game.
     */

    chess = new Chess();


    selectedSquare = null;

    botThinking = false;


    gameStatus.textContent =
        "Your turn";


    renderBoard();

}


/* =========================================================
   RENDER CHESS BOARD
========================================================= */

function renderBoard() {

    if (!chess) {
        return;
    }


    chessBoard.innerHTML = "";


    const board = chess.board();


    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {


            /*
             * Convert row/column into chess notation.
             *
             * Example:
             * row 0 col 0 = a8
             * row 7 col 7 = h1
             */

            const file =
                String.fromCharCode(97 + col);

            const rank =
                8 - row;

            const squareName =
                file + rank;


            const square =
                document.createElement("div");


            square.classList.add("square");


            /*
             * Determine square color.
             */

            if ((row + col) % 2 === 0) {

                square.classList.add("light");

            } else {

                square.classList.add("dark");

            }


            /*
             * Highlight selected square.
             */

            if (selectedSquare === squareName) {

                square.classList.add("selected");

            }


            /*
             * Show legal moves.
             */

            if (selectedSquare) {

                const legalMoves =
                    chess.moves({
                        square: selectedSquare,
                        verbose: true
                    });


                const isLegal =
                    legalMoves.some(function (move) {

                        return move.to === squareName;

                    });


                if (isLegal) {

                    square.classList.add("legal");

                }

            }


            /*
             * Get piece on square.
             */

            const piece =
                board[row][col];


            if (piece) {

                const pieceElement =
                    document.createElement("div");


                pieceElement.classList.add(
                    "piece",
                    piece.color === "w"
                        ? "white"
                        : "black"
                );


                pieceElement.textContent =
                    pieceSymbols[
                        piece.color
                    ][
                        piece.type
                    ];


                square.appendChild(
                    pieceElement
                );

            }


            /*
             * Clicking a square.
             */

            square.addEventListener(
                "click",
                function () {

                    handleSquareClick(
                        squareName
                    );

                }
            );


            chessBoard.appendChild(square);

        }

    }

}


/* =========================================================
   HANDLE SQUARE CLICK
========================================================= */

function handleSquareClick(square) {

    /*
     * Don't allow moves if:
     *
     * - no chess game exists
     * - bot is thinking
     * - game is over
     * - it isn't the player's turn
     */

    if (!chess) {
        return;
    }

    if (botThinking) {
        return;
    }

    if (chess.game_over()) {
        return;
    }

    if (chess.turn() !== playerColor) {
        return;
    }


    const clickedPiece =
        chess.get(square);


    /*
     * If nothing is selected yet,
     * only allow the player to select
     * one of their own pieces.
     */

    if (!selectedSquare) {

        if (
            clickedPiece &&
            clickedPiece.color === playerColor
        ) {

            selectedSquare = square;

            renderBoard();

        }

        return;
    }


    /*
     * Clicking another friendly piece
     * switches the selection.
     */

    if (
        clickedPiece &&
        clickedPiece.color === playerColor
    ) {

        selectedSquare = square;

        renderBoard();

        return;
    }


    /*
     * Try to make the move.
     */

    try {

        const move =
            chess.move({
                from: selectedSquare,
                to: square,

                /*
                 * Automatically promote to queen.
                 */

                promotion: "q"
            });


        if (move) {

            selectedSquare = null;

            renderBoard();

            checkGameState();


            /*
             * If the game isn't over,
             * let the bot move.
             */

            if (!chess.game_over()) {

                botMove();

            }

        } else {

            selectedSquare = null;

            renderBoard();

        }

    } catch (error) {

        /*
         * Illegal move.
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


    /*
     * Checkmate
     */

    if (chess.in_checkmate()) {

        if (chess.turn() === playerColor) {

            gameStatus.textContent =
                "Checkmate — Bot wins";

        } else {

            gameStatus.textContent =
                "Checkmate — You win!";

        }

        return;
    }


    /*
     * Draw
     */

    if (chess.in_draw()) {

        gameStatus.textContent =
            "Draw";

        return;
    }


    /*
     * Check
     */

    if (chess.in_check()) {

        if (chess.turn() === playerColor) {

            gameStatus.textContent =
                "Check! Your turn";

        } else {

            gameStatus.textContent =
                "Check! Bot is thinking";

        }

        return;
    }


    /*
     * Normal turn
     */

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

    if (chess.game_over()) {
        return;
    }


    botThinking = true;

    gameStatus.textContent =
        "Bot is thinking...";


    /*
     * Small delay so the bot doesn't instantly
     * move after the player's move.
     */

    setTimeout(function () {


        if (!chess || chess.game_over()) {

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

                chess.move({
                    from: bestMove.from,
                    to: bestMove.to,
                    promotion: "q"
                });

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
   CHOOSE BOT MOVE
========================================================= */

function chooseBotMove(
    position,
    settings
) {

    const moves =
        position.moves({
            verbose: true
        });


    if (moves.length === 0) {

        return null;

    }


    const scoredMoves =
        moves.map(function (move) {


            const testGame =
                new Chess(
                    position.fen()
                );


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


    /*
     * Sort best to worst.
     */

    scoredMoves.sort(
        function (a, b) {

            return b.score - a.score;

        }
    );


    /*
     * Decide how many good moves
     * the bot is willing to consider.
     */

    let poolSize = 1;


    if (settings.randomness > 0.5) {

        poolSize =
            Math.min(
                6,
                scoredMoves.length
            );

    } else if (
        settings.randomness > 0.2
    ) {

        poolSize =
            Math.min(
                3,
                scoredMoves.length
            );

    } else if (
        settings.randomness > 0.05
    ) {

        poolSize =
            Math.min(
                2,
                scoredMoves.length
            );

    }


    /*
     * Occasionally choose a weaker move
     * at lower Elo levels.
     */

    if (
        Math.random() <
        settings.randomness
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                poolSize
            );


        return scoredMoves[
            randomIndex
        ].move;

    }


    /*
     * Otherwise choose the best move.
     */

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
     * Checkmate
     */

    if (position.in_checkmate()) {

        /*
         * If it is White's turn and White
         * is checkmated, Black has won.
         */

        if (position.turn() === "w") {

            return 100000;

        } else {

            return -100000;

        }

    }


    /*
     * Draw
     */

    if (
        position.in_draw()
    ) {

        return 0;

    }


    /*
     * Stop searching.
     */

    if (depth <= 0) {

        return evaluatePosition(
            position
        );

    }


    const moves =
        position.moves({
            verbose: true
        });


    if (maximizing) {


        /*
         * Black is maximizing.
         */

        let bestScore =
            -Infinity;


        for (
            let i = 0;
            i < moves.length;
            i++
        ) {


            const move =
                moves[i];


            const nextPosition =
                new Chess(
                    position.fen()
                );


            nextPosition.move({

                from: move.from,

                to: move.to,

                promotion: "q"

            });


            const score =
                minimax(
                    nextPosition,
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


        /*
         * White is minimizing.
         */

        let bestScore =
            Infinity;


        for (
            let i = 0;
            i < moves.length;
            i++
        ) {


            const move =
                moves[i];


            const nextPosition =
                new Chess(
                    position.fen()
                );


            nextPosition.move({

                from: move.from,

                to: move.to,

                promotion: "q"

            });


            const score =
                minimax(
                    nextPosition,
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
   EVALUATE POSITION
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


    for (
        let row = 0;
        row < 8;
        row++
    ) {


        for (
            let col = 0;
            col < 8;
            col++
        ) {


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
     * Add a small mobility bonus.
     */

    const mobility =
        position.moves().length;


    if (position.turn() === "b") {

        score +=
            mobility * 2;

    } else {

        score -=
            mobility * 2;

    }


    return score;

}


/* =========================================================
   NEW GAME BUTTON
========================================================= */

newGameButton.addEventListener(
    "click",
    function () {

        startNewBotGame();

    }
);


/* =========================================================
   GAME BACK BUTTON
========================================================= */

gameBackButton.addEventListener(
    "click",
    function () {

        chess = null;

        selectedSquare = null;

        botThinking = false;

        showScreen(homeScreen);

    }
);


/* =========================================================
   RESIGN
========================================================= */

resignButton.addEventListener(
    "click",
    function () {

        if (!chess) {
            return;
        }

        if (chess.game_over()) {
            return;
        }


        gameStatus.textContent =
            "You resigned — Bot wins";


        botThinking = true;

    }
);


/* =========================================================
   BOT BACK BUTTON
========================================================= */

botBackButton.addEventListener(
    "click",
    function () {

        showScreen(homeScreen);

    }
);


/* =========================================================
   MULTIPLAYER BACK
========================================================= */

multiplayerBackButton.addEventListener(
    "click",
    function () {

        showScreen(homeScreen);

    }
);


/* =========================================================
   GENERATE PARTY CODE
========================================================= */

function generatePartyCode() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    let code = "";


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const index =
            Math.floor(
                Math.random() *
                characters.length
            );


        code +=
            characters[index];

    }


    return code;

}


/* =========================================================
   CREATE PARTY
========================================================= */

createPartyButton.addEventListener(
    "click",
    function () {

        const code =
            generatePartyCode();


        partyCode.textContent =
            code;


        showScreen(
            partyScreen
        );

    }
);


/* =========================================================
   CANCEL PARTY
========================================================= */

cancelPartyButton.addEventListener(
    "click",
    function () {

        showScreen(
            multiplayerScreen
        );

    }
);


/* =========================================================
   JOIN PARTY SCREEN
========================================================= */

joinPartyButton.addEventListener(
    "click",
    function () {

        joinCodeInput.value = "";

        joinMessage.textContent = "";

        showScreen(joinScreen);

        setTimeout(
            function () {

                joinCodeInput.focus();

            },
            100
        );

    }
);


/* =========================================================
   JOIN PARTY
========================================================= */

function attemptJoin() {

    const code =
        joinCodeInput.value
            .trim()
            .toUpperCase();


    if (code.length !== 6) {

        joinMessage.textContent =
            "Enter a 6-character party code.";

        return;

    }


    /*
     * Base44 multiplayer will be connected here later.
     */

    joinMessage.textContent =
        "Party system will connect through Base44.";

}


/* =========================================================
   JOIN BUTTON
========================================================= */

confirmJoinButton.addEventListener(
    "click",
    attemptJoin
);


/* =========================================================
   ENTER TO JOIN
========================================================= */

joinCodeInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            attemptJoin();

        }

    }
);


/* =========================================================
   JOIN BACK
========================================================= */

joinBackButton.addEventListener(
    "click",
    function () {

        showScreen(
            multiplayerScreen
        );

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateBotDisplay();
