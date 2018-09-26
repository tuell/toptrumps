// This script controls the mechanics behind a "top trumps"-style game.
// Developed by the data journalism team of the Hessischer Rundfunk in 2018
// (C) 2018/09/20
// Version 1.0

// CUSTOMIZATION: To build your own game, change the text to display

var chooseCardMsg = "(Wahlkreis auswählen)"; // dropdown for choosing a specific card
var noCardSelectionMsG = "Kein Wahlkreis ausgewählt" // error message if no card is chosen
var noCategorySelectionMsG = "Genau fünf Kategorien auswählen" // error message if wrong number of categories is chosen
var turnWonMsg = "Gewonnen!"; // turn won
var turnLostMsg = "Verloren..."; // turn lost
var turnDrawMsg = "Unentschieden."; // turn results in draw
var gameWonMsg = "Spiel gewonnen: "; // game won
var gameLostMsg = "Spiel verloren: "; // game lost
var gameDrawMsg = "Unentschieden: "; // game results in draw
var turnWaitMsg = "Kategorie w&auml;hlen"; // text to display in infoline while player choses category
var gameOverMsg = "Spiel vorbei"; // text to display in infoline when game is over
var gameWaitMsg = "Neues Spiel beginnen?"; // text to display in infoline when summary is shown


// Game is configured for seven rounds and five categories per card
// Change this here. Progress bar percentage is 100/number of Rounds

var numberOfRounds = 7
var numberOfCategories = 5
var progressBarPercentage = "width: 14.29%"



// CUSTOMIZATION: Enter your data for the cards here

// Data header: Names of the categories, first one = title of the card
var data_header = ['Wahlkreis', 'Fläche', 'Bevölkerung', 'Kirchensteuer', 'Zuzugsbilanz', 'Schweine', 'Waldfläche'];

// Units if necessary, first entry always empty
var data_suffix = ['', ' km²', '', ' %', '', '', ' %'];

// Specify which number wins: larger or smaller, first entry always empty
var data_comparison = ['', 'larger', 'larger', 'larger', 'larger', 'larger', 'larger'];

// One array per card, structure: Title first, then category values
var bergstraße_i = ['Bergstraße I', 300, 137382, 69, 1157, 1637, 35];
var bergstraße_ii = ['Bergstraße II ', 420, 130553, 71, 670, 1252, 44];
var darmstadt_dieburg_i = ['DA-Dieburg I', 174, 120744, 59, 802, 5051, 28];
var darmstadt_dieburg_ii = ['DA-Dieburg II', 365, 127450, 67, 904, 16156, 37];
var darmstadt_stadt_i_und_ii = ['DA-Stadt I+II', 242, 203987, 55, 2368, 470, 40];
var eschwege_witzenhausen = ['Eschwege-Witz.', 595, 75970, 77, 868, 6048, 42];
var frankfurt_am_main_i___vi = ['Frankfurt a.M. I-VI', 248, 736414, 44, 480, 1123, 15];
var fulda_i = ['Fulda I', 451, 106473, 77, 626, 24662, 38];
var fulda_ii = ['Fulda II', 839, 107647, 87, 604, 21377, 33];
var gießen_i = ['Gießen I', 220, 135108, 64, 2287, 100, 33];
var gießen_ii = ['Gießen II', 538, 120896, 72, 602, 13574, 31];
var groß_gerau_i = ['Groß-Gerau I', 123, 136188, 47, 1759, 0, 26];
var groß_gerau_ii = ['Groß-Gerau II', 330, 132857, 56, 1008, 5452, 19];
var hersfeld = ['Hersfeld', 680, 77813, 78, 78, 36669, 40];
var hochtaunus_i = ['Hochtaunus I', 255, 122643, 58, 1149, 183, 44];
var hochtaunus_ii = ['Hochtaunus II', 227, 112348, 58, 770, 180, 50];
var kassel_land_i = ['KS-Land I', 1020, 114530, 77, 868, 44014, 27];
var kassel_land_ii = ['KS-Land II', 268, 120433, 70, 1295, 7202, 27];
var kassel_stadt_i_und_ii = ['KS-Stadt I und II', 107, 199062, 57, 1210, 0, 21];
var lahn_dill_i = ['Lahn-Dill I', 648, 122713, 69, 322, 93, 51];
var lahn_dill_ii = ['Lahn-Dill II', 418, 131361, 70, 1359, 1739, 42];
var limburg_weilburg_i = ['Limburg-Weilb. I', 265, 88262, 75, 674, 6188, 22];
var limburg_weilburg_ii = ['Limburg-Weilb. II', 474, 83858, 76, 16, 7835, 40];
var main_kinzig_i = ['Main-Kinzig I', 306, 127743, 66, 955, 1857, 27];
var main_kinzig_ii = ['Main-Kinzig II', 141, 159720, 52, 3343, 7, 18];
var main_kinzig_iii = ['Main-Kinzig III', 950, 129252, 75, 982, 2905, 50];
var main_taunus_i = ['Main-Taunus I', 100, 119224, 57, 1305, 0, 18];
var main_taunus_ii = ['Main-Taunus II', 122, 116484, 60, 1446, 304, 9];
var marburg_biedenkopf_i = ['Marburg-Bied. I', 771, 111323, 75, 175, 13033, 40];
var marburg_biedenkopf_ii = ['Marburg-Bied. II', 492, 133690, 70, 153, 14820, 37];
var odenwald = ['Odenwald', 624, 96473, 67, -152, 817, 47];
var offenbach_land_i = ['Offenbach Land I', 122, 127446, 51, 721, 615, 47];
var offenbach_land_ii = ['Offenbach Land II', 75, 105538, 51, 599, 23, 42];
var offenbach_land_iii = ['Offenbach Land III', 160, 116998, 63, 1247, 473, 39];
var offenbach_stadt_ = ['Offenbach-Stadt ', 45, 124589, 44, 463, 0, 33];
var rheingau_taunus_i = ['Rheingau-Taun. I', 444, 89137, 68, 727, 0, 54];
var rheingau_taunus_ii = ['Rheingau-Taun. II', 367, 96531, 61, 1305, 939, 49];
var rotenburg = ['Rotenburg', 941, 77211, 79, 495, 43362, 44];
var schwalm_eder_i = ['Schwalm-Eder I', 613, 90371, 77, 1015, 77482, 31];
var schwalm_eder_ii = ['Schwalm-Eder II', 925, 90734, 83, 659, 70573, 36];
var vogelsberg = ['Vogelsberg', 1556, 116432, 83, 140, 61134, 39];
var waldeck_frankenberg_i = ['Waldeck-Frank. I', 908, 79754, 78, 634, 44329, 38];
var waldeck_frankenberg_ii = ['Waldeck-Frank. II', 941, 78213, 80, 442, 17993, 53];
var wetterau_i = ['Wetterau I', 221, 112345, 61, 1219, 1003, 15];
var wetterau_ii = ['Wetterau II', 547, 95562, 72, 578, 4058, 33];
var wetterau_iii = ['Wetterau III', 333, 96007, 68, 970, 7026, 21];
var wiesbaden_i_und_ii = ['Wiesbaden I und II', 204, 277619, 51, 908, 558, 27];

// group cards in one array
var allCards = [bergstraße_i, bergstraße_ii, darmstadt_dieburg_i, darmstadt_dieburg_ii, darmstadt_stadt_i_und_ii,
  eschwege_witzenhausen, frankfurt_am_main_i___vi, fulda_i, fulda_ii, gießen_i, gießen_ii, groß_gerau_i,
  groß_gerau_ii, hersfeld, hochtaunus_i, hochtaunus_ii, kassel_land_i, kassel_land_ii, kassel_stadt_i_und_ii,
  lahn_dill_i, lahn_dill_ii, limburg_weilburg_i, limburg_weilburg_ii, main_kinzig_i, main_kinzig_ii,
  main_kinzig_iii, main_taunus_i, main_taunus_ii, marburg_biedenkopf_i, marburg_biedenkopf_ii, odenwald,
  offenbach_land_i, offenbach_land_ii, offenbach_land_iii, offenbach_stadt_, rheingau_taunus_i,
  rheingau_taunus_ii, rotenburg, schwalm_eder_i, schwalm_eder_ii, vogelsberg, waldeck_frankenberg_i,
  waldeck_frankenberg_ii, wetterau_i, wetterau_ii, wetterau_iii, wiesbaden_i_und_ii];

// list of cards in case player wants to choose a specific card to play with
var cardsList = [['bergstraße_i', 'Bergstraße I'],
  ['bergstraße_ii', 'Bergstraße II'],
  ['darmstadt_dieburg_i', 'Darmstadt-Dieburg I'],
  ['darmstadt_dieburg_ii', 'Darmstadt-Dieburg II'],
  ['darmstadt_stadt_i_und_ii', 'Darmstadt-Stadt I+II'],
  ['eschwege_witzenhausen', 'Eschwege-Witzenhausen'],
  ['frankfurt_am_main_i___vi', 'Frankfurt a.M. I-VI'],
  ['fulda_i', 'Fulda I'],
  ['fulda_ii', 'Fulda II'],
  ['gießen_i', 'Gießen I'],
  ['gießen_ii', 'Gießen II'],
  ['groß_gerau_i', 'Groß-Gerau I'],
  ['groß_gerau_ii', 'Groß-Gerau II'],
  ['hersfeld', 'Hersfeld'],
  ['hochtaunus_i', 'Hochtaunus I'],
  ['hochtaunus_ii', 'Hochtaunus II'],
  ['kassel_land_i', 'Kassel-Land I'],
  ['kassel_land_ii', 'Kassel-Land II'],
  ['kassel_stadt_i_und_ii', 'Kassel-Stadt I und II'],
  ['lahn_dill_i', 'Lahn-Dill I'],
  ['lahn_dill_ii', 'Lahn-Dill II'],
  ['limburg_weilburg_i', 'Limburg-Weilburg I'],
  ['limburg_weilburg_ii', 'Limburg-Weilburg II'],
  ['main_kinzig_i', 'Main-Kinzig I'],
  ['main_kinzig_ii', 'Main-Kinzig II'],
  ['main_kinzig_iii', 'Main-Kinzig III'],
  ['main_taunus_i', 'Main-Taunus I'],
  ['main_taunus_ii', 'Main-Taunus II'],
  ['marburg_biedenkopf_i', 'Marburg-Biedenkopf I'],
  ['marburg_biedenkopf_ii', 'Marburg-Biedenkopf II'],
  ['odenwald', 'Odenwald'],
  ['offenbach_land_i', 'Offenbach Land I'],
  ['offenbach_land_ii', 'Offenbach Land II'],
  ['offenbach_land_iii', 'Offenbach Land III'],
  ['offenbach_stadt_', 'Offenbach-Stadt'],
  ['rheingau_taunus_i', 'Rheingau-Taunus I'],
  ['rheingau_taunus_ii', 'Rheingau-Taunus II'],
  ['rotenburg', 'Rotenburg'],
  ['schwalm_eder_i', 'Schwalm-Eder I'],
  ['schwalm_eder_ii', 'Schwalm-Eder II'],
  ['vogelsberg', 'Vogelsberg'],
  ['waldeck_frankenberg_i', 'Waldeck-Frankenberg I'],
  ['waldeck_frankenberg_ii', 'Waldeck-Frankenberg II'],
  ['wetterau_i', 'Wetterau I'],
  ['wetterau_ii', 'Wetterau II'],
  ['wetterau_iii', 'Wetterau III'],
  ['wiesbaden_i_und_ii', 'Wiesbaden I und II']];


// Inititate buttons and information displays
var startGameButton = document.getElementById("startGame");
startGameButton.addEventListener("click", initGame);

var startTurnButton = document.getElementById("startTurn");
startTurnButton.addEventListener("click", initTurn);

var newGameButton = document.getElementById("newGame");
newGameButton.addEventListener("click", initNewGame);

var showSummaryButton = document.getElementById("showSummary");
showSummaryButton.addEventListener("click", initSummary);

var waitingButton = document.getElementById("waiting");

var infoLine = document.getElementById("info_line");
var summaryList = document.getElementById("summary_list");
var gameProgressBar = document.getElementById("gameProgress");



// initiate variables for later use
var gameMode;
var chosenCard;
var chosenCategories;
var playerCards;
var computerCards;
var playerPoints;
var computerPoints;
var playerCount;
var computerCount;
var currentPlayerCard;
var currentComputerCard;
var stateOfGame;



function shuffleCards() {
  //Shuffles an array

  var currentIndex = allCards.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = allCards[currentIndex];
    allCards[currentIndex] = allCards[randomIndex];
    allCards[randomIndex] = temporaryValue;
  }

}


//Set button-states
//1=game mode selection
//2=category selection
//3=start game
//4=start next turn
//5=turn in progress
//6=last turn finished
//7=showing summary

function updateButtons(state) {
  stateOfGame = state;
  switch(state) {
    case 1:
      // Show only game mode selectors
      document.getElementById("hud").style.display = 'none';
      document.getElementById("getMode").style.display = 'flex';
      document.getElementById("getCategories").style.display = 'none';
      document.getElementById("summary").style.display = 'none';
      document.getElementById("cards").style.display = 'none';
      document.getElementById("buttons").style.display = 'none';
      newGameButton.style.display = 'none';
      getMode();
      break;
    case 2:
      // Show only category selectors
      document.getElementById("hud").style.display = 'none';
      document.getElementById("getMode").style.display = 'none';
      document.getElementById("getCategories").style.display = 'flex';
      document.getElementById("summary").style.display = 'none';
      document.getElementById("cards").style.display = 'none';
      document.getElementById("buttons").style.display = 'none';
      getCategories();
      break;
    case 3:
      // Disable all buttons, show "waiting"-button, hide summary, show carddeck
      document.getElementById("hud").style.display = 'grid';
      document.getElementById("getMode").style.display = 'none';
      document.getElementById("getCategories").style.display = 'none';
      document.getElementById("summary").style.display = 'none';
      document.getElementById("cards").style.display = 'grid';
      document.getElementById("buttons").style.display = 'flex';
      startGameButton.style.display = 'none';
      startTurnButton.style.display = 'none';
      newGameButton.style.display = 'none';
      waitingButton.style.display = 'inline';
      showSummaryButton.style.display = 'none';
      infoLine.innerHTML = "";
      break;
    case 4:
      // Display button to start next turn
      startGameButton.style.display = 'none';
      startTurnButton.style.display = 'inline';
      newGameButton.style.display = 'none';
      waitingButton.style.display = 'none';
      showSummaryButton.style.display = 'none';
      break;
    case 5:
      // Disable all buttons, show "waiting"-button, reset infoline
      startGameButton.style.display = 'none';
      startTurnButton.style.display = 'none';
      newGameButton.style.display = 'none';
      waitingButton.style.display = 'inline';
      showSummaryButton.style.display = 'none';
      infoLine.classList.remove('text-success');
      infoLine.classList.remove('text-danger');
      infoLine.classList.remove('text-warning');
      infoLine.classList.add('text-secondary');
      infoLine.innerHTML = "<h5 class='mb-1'><i class='em em-question mr-1'></i> " + turnWaitMsg +  "</h5>";
      break;
    case 6:
      // Show button to display summary after last turn
      startGameButton.style.display = 'none';
      startTurnButton.style.display = 'none';
      newGameButton.style.display = 'none';
      waitingButton.style.display = 'none';
      showSummaryButton.style.display = 'inline';
      break;
    case 7:
      // Show summary, hide cards, show "new game"-button
      startGameButton.style.display = 'none';
      startTurnButton.style.display = 'none';
      newGameButton.style.display = 'inline';
      waitingButton.style.display = 'none';
      showSummaryButton.style.display = 'none';
      document.getElementById("summary").style.display = 'grid';
      document.getElementById("cards").style.display = 'none';
      break;
  }
}

function getMode() {
  // function to let user select a game mode:
  // either classic with a random card in each round
  // or play with one card throughout the entire game

  var cardsListDropdown = document.getElementById("chosenCardSelect");
  var noCardSelectionDiv = document.getElementById("noCardSelection");
  noCardSelectionDiv.innerHTML = "";

  // Reset list of cards to choose from first
  while (cardsListDropdown.hasChildNodes()) {
    cardsListDropdown.removeChild(cardsListDropdown.lastChild);
  }

  // Build list of all cards to choose from
  var chooseCardMsgElement = document.createElement("option");
  chooseCardMsgElement.value = "noSelection";
  var chooseCardMsgContent = document.createTextNode(chooseCardMsg);
  chooseCardMsgElement.appendChild(chooseCardMsgContent);
  cardsListDropdown.appendChild(chooseCardMsgElement);

  for (i = 0; i < cardsList.length; i++) {
    var newCardInList = document.createElement("option");
    newCardInList.value = cardsList[i][0];
    var newCardInListContent = document.createTextNode(cardsList[i][1]);
    newCardInList.appendChild(newCardInListContent);
    cardsListDropdown.appendChild(newCardInList);
  }


  // build random list of categories - delete this section if
  // getCategories() will be used

  chosenCategories = [];
  for (i = 1; i < data_header.length; i++) {
    chosenCategories.push(i);
  }

  var currentCatIndex = chosenCategories.length, temporaryCatValue, randomCatIndex;

  // While there remain elements to shuffle...
  while (0 !== currentCatIndex) {

    // Pick a remaining element...
    randomCatIndex = Math.floor(Math.random() * currentCatIndex);
    currentCatIndex -= 1;

    // And swap it with the current element.
    temporaryCatValue = chosenCategories[currentCatIndex];
    chosenCategories[currentCatIndex] = chosenCategories[randomCatIndex];
    chosenCategories[randomCatIndex] = temporaryCatValue;
  }

  // Use number (specified before) of categories of shuffled list
  chosenCategories = chosenCategories.slice(0, numberOfCategories);



  // Let player choose game mode
  $(document).on('click', '#randomCards', function() {
    gameMode = "random";
    initGame();
  });

  $(document).on('click', '#chosenCardButton', function() {
    gameMode = "fixedCard";
    chosenCard = $("#chosenCardSelect :selected").val();

    if (chosenCard == "noSelection") {
      noCardSelectionDiv.innerHTML = noCardSelectionMsG;
    } else {
      initGame();
    }

  });

}

function getCategories() {
  // function to let user select, which categories to play with:
  // either with five random categories
  // or with five fixed categories

  var categoriesList = document.getElementById("chosenCategoriesList");
  var noCategorySelectionDiv = document.getElementById("noCategorySelection");
  noCategorySelectionDiv.innerHTML = "";

  // Reset checkboxes for categories
  while (categoriesList.hasChildNodes()) {
    categoriesList.removeChild(categoriesList.lastChild);
  }

  // Build checkboxes with categories
  for (i = 1; i < data_header.length; i++) {
    var newCategoryCheckbox = document.createElement("div");
    newCategoryCheckbox.classList.add("custom-control", "custom-checkbox", "custom-control-inline");

    var newCategoryInput = document.createElement("input");
    newCategoryInput.id = i;
    newCategoryInput.classList.add("custom-control-input");
    newCategoryInput.type = "checkbox";

    var newCategoryLabel = document.createElement("label");
    newCategoryLabel.classList.add("custom-control-label");
    newCategoryLabel.setAttribute("for", i);
    var newCategoryLabelContent = document.createTextNode(data_header[i]);
    newCategoryLabel.appendChild(newCategoryLabelContent);

    newCategoryCheckbox.appendChild(newCategoryInput);
    newCategoryCheckbox.appendChild(newCategoryLabel);

    categoriesList.appendChild(newCategoryCheckbox);
  }

  // Let player choose categories

  // If player chooses random categories, create random array of five numbers
  $(document).on('click', '#randomCategories', function() {
    chosenCategories = [];
    for (i = 1; i < data_header.length; i++) {
      chosenCategories.push(i);
    }

    var currentCatIndex = chosenCategories.length, temporaryCatValue, randomCatIndex;

    // While there remain elements to shuffle...
    while (0 !== currentCatIndex) {

      // Pick a remaining element...
      randomCatIndex = Math.floor(Math.random() * currentCatIndex);
      currentCatIndex -= 1;

      // And swap it with the current element.
      temporaryCatValue = chosenCategories[currentCatIndex];
      chosenCategories[currentCatIndex] = chosenCategories[randomCatIndex];
      chosenCategories[randomCatIndex] = temporaryCatValue;
    }

    // Use first five categories of shuffled list
    chosenCategories = chosenCategories.slice(0, numberOfCategories);

    initGame();

  });

  // if player chooses own categories, store in array
  $(document).on('click', '#chosenCategoriesButton', function() {
    chosenCategories = [];
    for (i = 1; i < data_header.length; i++) {
      currentCatID = "#" + i;
      if($(currentCatID).is(':checked'))
        chosenCategories.push(i);
    }

    if (chosenCategories.length != numberOfCategories) {
      noCategorySelectionDiv.innerHTML = noCategorySelectionMsG;
    } else {
      initGame();
    }
  });

}

function buildDecks() {
  // Assign cards to player and computer according to game mode selection

  if (gameMode == "random") {
    // Deal 7 random cards each
    playerCards = allCards.slice(0, numberOfRounds);
    computerCards = allCards.slice(numberOfRounds, 14);
  } else {
    // assign the chosen card to player seven times
    playerCards = [];
    for (i = 0; i < numberOfRounds; i++) {
      playerCards.push(eval(chosenCard));
    }
    // remove chosen player card from cards and then assign computer seven random cards
    chosenCardIndex = allCards.indexOf(eval(chosenCard));
    allCards.splice(chosenCardIndex, 1);
    computerCards = allCards.slice(0, numberOfRounds);
  }
}

function updateScore() {
  // function to display the current score
  playerCount = document.getElementById("player_count");
  computerCount = document.getElementById("computer_count");
  playerCount.innerHTML = playerPoints;
  computerCount.innerHTML = computerPoints;
}

function buildComputerCard() {
  // function to display the current card of the computer
  var computerCardDiv = document.getElementById("computercard");
  computerCardDiv.classList.toggle('flip');

  var computerCardBack = document.getElementById("computerCardBack");
  computerCardBack.style.height = $(playercard).height() + "px";
  var computercardBackHeader = document.getElementById("computercardBackHeader");
  computercardBackHeader.innerHTML =  currentComputerCard[0];


  setTimeout(function(){
    //wait with card content so as not to display it before card is flipped back

    // Change heading of computer card
    var computercardHeader = document.getElementById("computercard_header");
    computercardHeader.innerHTML = "<h3 class='m-3 card-title'>" + currentComputerCard[0] + "</h3>";

    // Fill in computer card by looping through card-array
    var computercardCategories = document.getElementById("computercard_categories");
    computercardCategories.innerHTML = "";
    for (i = 0; i < chosenCategories.length; i++) {

      var currentCategory = chosenCategories[i];

      // make new row
      var newRow = document.createElement("div");
      newRow.id = "computer_category_row" + currentCategory;
      newRow.classList.add('list-group-item', 'd-flex', 'w-100', 'justify-content-between');
      document.getElementById("computercard_categories").appendChild(newRow);

      // category
      var newCat = document.createElement("h6");
      var newCatContent = document.createTextNode(data_header[currentCategory]);
      newCat.appendChild(newCatContent);
      document.getElementById("computer_category_row" + currentCategory).appendChild(newCat);

      // show value
      var newVal = document.createElement("span");
      var newValContent;
      newValContent = document.createTextNode(currentComputerCard[currentCategory] + data_suffix[currentCategory]);
      newVal.appendChild(newValContent);
      newVal.id = "computercardCategory" + currentCategory;
      newVal.classList.add('category_nolink');
      document.getElementById("computer_category_row" + currentCategory).appendChild(newVal);
    }
  }, 500);
}


// functions needed when page loads
$(document).ready(function() {

  // Players turn: player chooses category
  $(document).on('click', '.category_link', function(event) {

    if (stateOfGame == 5) {

      var computerCardDiv = document.getElementById("computercard");
      var firstComputerCard = currentComputerCard;
      var firstPlayerCard = currentPlayerCard;

      // turn over computer card
      computerCardDiv.classList.toggle('flip');

      // log the chosen category
      var categoryID = parseInt(this.id.slice(-1));
      var chosenPlayerCategory = document.getElementById("player_category_row" + categoryID);
      var chosenComputerCategory = document.getElementById("computer_category_row" + categoryID);

      // Prepare summary entry

      var newSummaryLine = document.createElement("div");
      newSummaryLine.classList.add("d-flex", "w-100", "border-bottom", "py-1");


      var newSummaryPlayer = document.createElement("div");
      newSummaryPlayer.classList.add("text-right")
      newSummaryPlayer.style = "width: 40%;"
      newSummaryPlayer.innerHTML = currentPlayerCard[0] + "<br>" + currentPlayerCard[categoryID] + data_suffix[categoryID];

      var newSummaryCat = document.createElement("div");
      newSummaryCat.classList.add("text-center", "d-inline-block", "text-truncate", "px-1")
      newSummaryCat.style = "width: 20%;"
      newSummaryCat.innerHTML = "<i>" + data_header[categoryID] + "</i>";

      var newSummaryComputer = document.createElement("div");
      newSummaryComputer.classList.add("text-left")
      newSummaryComputer.style = "width: 40%;"
      newSummaryComputer.innerHTML = currentComputerCard[0] + "<br>" + currentComputerCard[categoryID] + data_suffix[categoryID];

      if (data_comparison[categoryID] == "larger") {
        if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          newSummaryPlayer.classList.add('winner');
        } else if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          newSummaryComputer.classList.add('winner');
        }
      } else {
        if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          newSummaryPlayer.classList.add('winner');
        } else if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          newSummaryComputer.classList.add('winner');
        }
      }

      newSummaryLine.appendChild(newSummaryPlayer);
      newSummaryLine.appendChild(newSummaryCat);
      newSummaryLine.appendChild(newSummaryComputer);

      summaryList.appendChild(newSummaryLine);

      // Prepare progress-bar

      var progressBarWin = document.createElement("div");
      progressBarWin.classList.add("progress-bar", "bg-success");
      progressBarWin.style = progressBarPercentage;
      progressBarWin.role = "progressbar";

      var progressBarLose = document.createElement("div");
      progressBarLose.classList.add("progress-bar", "bg-danger");
      progressBarLose.style = progressBarPercentage;
      progressBarLose.role = "progressbar";

      var progressBarDraw = document.createElement("div");
      progressBarDraw.classList.add("progress-bar", "bg-warning");
      progressBarDraw.style = progressBarPercentage;
      progressBarDraw.role = "progressbar";

      // compare values, change message accordingly, update score

      if (data_comparison[categoryID] == "larger") {
        if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add('list-group-item-success');
          chosenComputerCategory.classList.add('list-group-item-danger');
          infoLine.classList.remove('text-secondary');
          infoLine.classList.add('text-success');
          infoLine.innerHTML = "<h5 class='mb-1'><i class='em em-grinning mr-1'></i> " + turnWonMsg +  "</h5>";
          gameProgressBar.appendChild(progressBarWin);
          playerPoints += 1;
        } else if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add('list-group-item-danger');
          chosenComputerCategory.classList.add('list-group-item-success');
          infoLine.classList.remove('text-secondary');
          infoLine.classList.add('text-danger');
          infoLine.innerHTML = "<h5 class='mb-1'><i class='em em-disappointed mr-1'></i> " + turnLostMsg +  "</h5>";
          gameProgressBar.appendChild(progressBarLose);
          computerPoints += 1;
        } else {
          chosenPlayerCategory.classList.add('list-group-item-warning');
          chosenComputerCategory.classList.add('list-group-item-warning');
          infoLine.classList.remove('text-secondary');
          infoLine.classList.add('text-warning');
          infoLine.innerHTML = "<h5 class='mb-1'><i class='em em-full_moon_with_face mr-1'></i> " + turnDrawMsg +  "</h5>";
          gameProgressBar.appendChild(progressBarDraw);
        }
      } else {
        if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add('list-group-item-success');
          chosenComputerCategory.classList.add('list-group-item-danger');
          infoLine.classList.remove('text-secondary');
          infoLine.classList.add('text-success');
          infoLine.innerHTML = "<h5 class='mb-1'><i class='em em-grinning mr-2'></i> " + turnWonMsg +  "</h5>";
          playerPoints += 1;
          gameProgressBar.appendChild(progressBarWin);
        } else if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add('list-group-item-danger');
          chosenComputerCategory.classList.add('list-group-item-success');
          infoLine.classList.remove('text-secondary');
          infoLine.classList.add('text-danger');
          gameProgressBar.appendChild(progressBarLose);
          infoLine.innerHTML = "<h5 class='mb-1'><i class='em em-disappointed mr-1'></i> " + turnLostMsg +  "</h5>";
          computerPoints += 1;
        } else {
          chosenPlayerCategory.classList.add('list-group-item-warning');
          chosenComputerCategory.classList.add('list-group-item-warning');
          infoLine.classList.remove('text-secondary');
          infoLine.classList.add('text-warning');
          infoLine.innerHTML = "<h5 class='mb-1'><i class='em em-full_moon_with_face mr-1'></i> " + turnDrawMsg +  "</h5>";
          gameProgressBar.appendChild(progressBarDraw);
        }
      }

      updateScore();


      //remove current card from decks

      playerCards.shift();
      computerCards.shift();

      // Proceed with game: Next card, if cards left or summary, if no cards left

      if (playerCards.length > 0) {
        updateButtons(4);
      } else {
        updateButtons(6);
        infoLine.classList.remove('text-success');
        infoLine.classList.remove('text-warning');
        infoLine.classList.remove('text-danger');
        infoLine.classList.add('text-secondary');
        infoLine.innerHTML = "<h5 class='mb-1'><i class='em em-checkered_flag mr-1'></i> " + gameOverMsg + "</h5>";
      }

    }

  } );

  // Show gameMode-Chooser on load - GAME IS STARTED HERE
  updateButtons(1);

});


// initiate new game after a game is finished
function initNewGame() {
  updateButtons(1);
}


function initGame() {
  //Function to initiate the actual game

  // Shuffle and deal cards
  shuffleCards();
  buildDecks();

  // Show cards and beginn game
  updateButtons(3);

  // Reset score
  playerPoints = 0;
  computerPoints = 0;
  updateScore();

  // Reset progress bar
  while (gameProgressBar.hasChildNodes()) {
    gameProgressBar.removeChild(gameProgressBar.lastChild);
  }

  // Start turn
  initTurn()
}

function initSummary() {
  //Function to display a summary of each turn after the game

  // Change buttons when summary is shown
  updateButtons(7)

  var summaryHeadline = document.getElementById('summaryHeadline');

  if (playerPoints > computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-success'>" + gameWonMsg + playerPoints + ":" + computerPoints + "<i class='em em-grinning ml-2'></i></h3>";
  }
  if (playerPoints < computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-danger'>" + gameLostMsg + playerPoints + ":" + computerPoints + "<i class='em em-disappointed ml-2'></i></h3>";
  }
  if (playerPoints == computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-warning'>" + gameDrawMsg + playerPoints + ":" + computerPoints + "<i class='em em-full_moon_with_face ml-2'></i></h3>";
  }
}

function initTurn() {
  //Function to initiate the next turn by showing the topmost player card

  updateButtons(5);

  // choose first card from each deck
  currentPlayerCard = playerCards[0];
  currentComputerCard = computerCards[0];

  // Change heading of player card
  var playercardHeader = document.getElementById("playercard_header");
  // playercardHeader.innerHTML = "<h3 class='m-3 card-title'> <img src='img/flags/" + currentPlayerCard[0] + ".svg' class='flag mr-2 align-middle img-thumbnail'>" + currentPlayerCard[0] + "</h3>";
  playercardHeader.innerHTML = "<h3 class='m-3 card-title'>" + currentPlayerCard[0] + "</h3>";

  // Fill in player card by looping through card-array
  var playercardCategories = document.getElementById("playercard_categories");
  playercardCategories.innerHTML = "";
  for (i = 0; i < chosenCategories.length; i++) {

    var currentCategory = chosenCategories[i];

    // make new row
    var newRow = document.createElement("div");
    newRow.id = "player_category_row" + currentCategory;
    newRow.classList.add('list-group-item', 'd-flex', 'w-100', 'justify-content-between');
    document.getElementById("playercard_categories").appendChild(newRow);

    // category
    var newCat = document.createElement("h6");
    var newCatContent = document.createTextNode(data_header[currentCategory]);
    newCat.appendChild(newCatContent);
    document.getElementById("player_category_row" + currentCategory).appendChild(newCat);

    // link with value
    var newVal = document.createElement("a");
    var newValContent = document.createTextNode(currentPlayerCard[currentCategory] + data_suffix[currentCategory]);
    newVal.appendChild(newValContent);
    newVal.id = "playercardCategory" + currentCategory;
    newVal.href = "#";
    newVal.classList.add('category_link');
    document.getElementById("player_category_row" + currentCategory).appendChild(newVal);

  }


  buildComputerCard();

}
