/* =========================
   GET SCREENS
========================= */

const homeScreen = document.getElementById("homeScreen");
const multiplayerScreen = document.getElementById("multiplayerScreen");
const partyScreen = document.getElementById("partyScreen");
const botScreen = document.getElementById("botScreen");


/* =========================
   GET BUTTONS
========================= */

const botButton = document.getElementById("botButton");
const multiplayerButton = document.getElementById("multiplayerButton");

const backButton = document.getElementById("backButton");
const botBackButton = document.getElementById("botBackButton");

const createPartyButton =
    document.getElementById("createPartyButton");

const joinPartyButton =
    document.getElementById("joinPartyButton");

const cancelPartyButton =
    document.getElementById("cancelPartyButton");


/* =========================
   OTHER ELEMENTS
========================= */

const joinCodeInput =
    document.getElementById("joinCodeInput");

const partyCode =
    document.getElementById("partyCode");

const message =
    document.getElementById("message");


/* =========================
   SCREEN SWITCHING
========================= */

function showScreen(screen) {

    homeScreen.classList.remove("active");
    multiplayerScreen.classList.remove("active");
    partyScreen.classList.remove("active");
    botScreen.classList.remove("active");

    screen.classList.add("active");
}


/* =========================
   HOME BUTTONS
========================= */

multiplayerButton.addEventListener("click", function () {

    message.textContent = "";

    joinCodeInput.value = "";

    showScreen(multiplayerScreen);

});


botButton.addEventListener("click", function () {

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


/* =========================
   GENERATE PARTY CODE
========================= */

function generatePartyCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(Math.random() * characters.length);

        code += characters[randomIndex];

    }

    return code;
}


/* =========================
   CREATE PARTY
========================= */

createPartyButton.addEventListener("click", function () {

    const code = generatePartyCode();

    partyCode.textContent = code;

    showScreen(partyScreen);

});


/* =========================
   JOIN PARTY
========================= */

joinPartyButton.addEventListener("click", function () {

    const code =
        joinCodeInput.value.trim().toUpperCase();

    if (code.length !== 6) {

        message.textContent =
            "Please enter a 6-character join code.";

        return;
    }

    /*
        TEMPORARY:

        Right now this only demonstrates
        the interface.

        Later, Base44 will check whether
        this party actually exists.
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
