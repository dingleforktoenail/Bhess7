/* =========================
   GET SCREENS
========================= */

const homeScreen =
    document.getElementById("homeScreen");

const multiplayerScreen =
    document.getElementById("multiplayerScreen");

const partyScreen =
    document.getElementById("partyScreen");

const botScreen =
    document.getElementById("botScreen");

const gameScreen =
    document.getElementById("gameScreen");


/* =========================
   GET BUTTONS
========================= */

const botButton =
    document.getElementById("botButton");

const multiplayerButton =
    document.getElementById("multiplayerButton");

const backButton =
    document.getElementById("backButton");

const botBackButton =
    document.getElementById("botBackButton");

const createPartyButton =
    document.getElementById("createPartyButton");

const joinPartyButton =
    document.getElementById("joinPartyButton");

const cancelPartyButton =
    document.getElementById("cancelPartyButton");

const startBotButton =
    document.getElementById("startBotButton");

const gameBackButton =
    document.getElementById("gameBackButton");


/* =========================
   OTHER ELEMENTS
========================= */

const joinCodeInput =
    document.getElementById("joinCodeInput");

const partyCode =
    document.getElementById("partyCode");

const message =
    document.getElementById("message");

const eloSlider =
    document.getElementById("eloSlider");

const eloDisplay =
    document.getElementById("eloDisplay");

const botDescription =
    document.getElementById("botDescription");

const gameBotRating =
    document.getElementById("gameBotRating");


/* =========================
   SCREEN SWITCHING
========================= */

function showScreen(screen) {

    homeScreen.classList.remove("active");

    multiplayerScreen.classList.remove("active");

    partyScreen.classList.remove("active");

    botScreen.classList.remove("active");

    gameScreen.classList.remove("active");

    screen.classList.add("active");
}


/* =========================
   HOME
========================= */

multiplayerButton.addEventListener("click", function () {

    message.textContent = "";

    joinCodeInput.value = "";

    showScreen(multiplayerScreen);

});


botButton.addEventListener("click", function () {

    updateBotDisplay();

    showScreen(botScreen);

});


/* =========================
   BACK BUTTONS
========================= */

backButton.addEventListener("click", function () {

    showScreen(homeScreen);

});


botBackButton.addEventListener("click", function () {

    showScreen(homeScreen);

});


cancelPartyButton.addEventListener("click", function () {

    showScreen(multiplayerScreen);

});


gameBackButton.addEventListener("click", function () {

    showScreen(botScreen);

});


/* =========================
   ELO DESCRIPTION
========================= */

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


/* =========================
   UPDATE BOT DISPLAY
========================= */

function updateBotDisplay() {

    const elo =
        Number(eloSlider.value);

    eloDisplay.textContent = elo;

    botDescription.textContent =
        getBotDescription(elo);

}


/* =========================
   ELO SLIDER
========================= */

eloSlider.addEventListener("input", function () {

    updateBotDisplay();

});


/* =========================
   START BOT GAME
========================= */

startBotButton.addEventListener("click", function () {

    const selectedElo =
        Number(eloSlider.value);

    gameBotRating.textContent =
        "Bot Rating: " + selectedElo;

    showScreen(gameScreen);

});


/* =========================
   GENERATE PARTY CODE
========================= */

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


/* =========================
   CREATE PARTY
========================= */

createPartyButton.addEventListener("click", function () {

    const code =
        generatePartyCode();

    partyCode.textContent =
        code;

    showScreen(partyScreen);

});


/* =========================
   JOIN PARTY
========================= */

joinPartyButton.addEventListener("click", function () {

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
        TEMPORARY

        Base44 will eventually
        check the code here.
    */

    message.textContent =
        "Party lookup will be connected to Base44 soon.";

});


/* =========================
   ENTER KEY
========================= */

joinCodeInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        joinPartyButton.click();

    }

});


/* =========================
   FORCE UPPERCASE
========================= */

joinCodeInput.addEventListener("input", function () {

    joinCodeInput.value =
        joinCodeInput.value
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

});


/* =========================
   INITIALIZE
========================= */

updateBotDisplay();
