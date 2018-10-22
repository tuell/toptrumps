// This script controls the mechanics behind a "top trumps"-style game.
// Developed by the data journalism team of the Hessischer Rundfunk in 2018
// (C) 2018/10/22

// CUSTOMIZATION: To build your own game, change the text to display

// dropdown for choosing a card
var chooseCardMsg = "(Wahlkreis auswählen)";
// error message if no card is chosen
var noCardSelectionMsG = "Kein Wahlkreis ausgewählt";
// error message if wrong number of categories is chosen
var noCategorySelectionMsG = "Genau fünf Kategorien auswählen";
var turnWonMsg = "Gewonnen!"; // turn won
var turnLostMsg = "Verloren..."; // turn lost
var turnDrawMsg = "Unentschieden."; // turn results in draw
var gameWonMsg = "Spiel gewonnen: "; // game won
var gameLostMsg = "Spiel verloren: "; // game lost
var gameDrawMsg = "Unentschieden: "; // game results in draw
// text to display in infoline while player choses category
var turnWaitMsg = "Kategorie w&auml;hlen";
// text to display in infoline when game is over
var gameOverMsg = "Spiel vorbei";
// text to display in infoline when summary is shown
var gameWaitMsg = "Neues Spiel beginnen?";


// Game is configured for seven rounds and five categories per card.
// Change this here. Progress bar percentage should be 100/number of Rounds.

var numberOfRounds = 7;
var numberOfCategories = 5;
var progressBarPercentage = "width: 14.29%";
var currentRound = 1;


// CUSTOMIZATION: Enter your data for the cards here

// Data header: Names of the categories, first one = title of the card
var data_header = ["Wahlkreis", "Einwohner", "Fläche", "Altersschnitt",
                   "Geburtensaldo", "Schulden/Kopf", "Breitband",
                   "Einwohner/Arzt", "Waldfläche", "Landwirtschaft",
                   "Eheschließungen"];

// Category names for summary
var summary_header = ["Wahl&shy;kreis", "Einwoh&shy;ner", "Fläche",
                      "Alters&shy;schnitt", "Geburten&shy;saldo",
                      "Schulden pro Kopf", "Breit&shy;band",
                      "Einwohner pro Arzt", "Wald&shy;fläche",
                      "Landwirt&shy;schaft", "Eheschlie&shy;ßungen"];

// Units if necessary, first entry always empty
var data_suffix = ["", "", "\u2006km\u00B2", "", "", "\u2006\u20AC",
                   "\u0025", "", "\u0025", "\u0025", ""];

// Specify which number wins: larger or smaller, first entry always empty
var data_comparison = ["", "larger", "larger", "smaller", "larger", "smaller",
                       "larger", "smaller", "larger", "larger", "larger"];

// One array per card, structure: Title first, then category values
var wk_1=["KS-Land I",114530,1020.2,46.3,-534,4460,45.2,1450,40.5,46.8,624];
var wk_2=["KS-Land II",120433,268.5,46.5,-419,3111,63.4,2316,35.2,37.1,457];
var wk_3=["KS-Stadt I",95262,57.5,41.6,-206,4857,91.6,2165,38.6,14.6,490];
var wk_4=["KS-Stadt II",108759,49.3,41.6,174,4857,91.5,1875,5.7,14.6,559];
var wk_5=["Waldeck-Fr. I",79754,907.6,45.6,-371,3899,69.4,1266,38.7,48,489];
var wk_6=["Waldeck-Fr. II",78213,940.8,45.2,-287,4712,72.2,1862,51.9,36.5,442];
var wk_7=["Schwalm-Eder I",90371,613.3,45.3,-283,3330,47.4,1738,33.6,49.7,455];
var wk_8=["Schwalm-Eder II",90734,925.2,45.9,-538,6053,43.8,2327,36.2,48.4,408];
var wk_9=["Eschw.-Witzenh.",75970,595.2,46.8,-572,6238,70.5,1899,37.2,38.7,393];
var wk_10=["Rotenburg",77211,940.9,46.2,-347,5153,58.8,2271,44.1,43.2,296];
var wk_11=["Hersfeld",77813,679.7,45.9,-242,6393,53.9,1945,40.7,44.5,355];
var wk_12=["Marb.-Bied. I",111323,770.6,44.6,-379,3237,60.6,2141,42.8,42,422];
var wk_13=["Marb.-Bied. II",133690,492,41.3,17,3618,80.2,1857,37.2,45.4,679];
var wk_14=["Fulda I",106473,451.4,43.3,-153,3766,93,1690,35.7,46.1,546];
var wk_15=["Fulda II",107647,839.2,44.3,-8,1893,74.4,2031,36.3,48.6,504];
var wk_16=["Lahn-Dill I",122713,648.1,44.6,-342,3886,82.8,1753,50.9,31.7,596];
var wk_17=["Lahn-Dill II",131361,418.4,44.7,-404,5160,84.9,1775,41.3,36.9,632];
var wk_18=["Gießen I",135108,220,40.8,157,4713,89.8,1801,36.2,34,632];
var wk_19=["Gießen II",120896,537.6,44.4,-69,3481,66.8,1474,30.6,50.7,586];
var wk_20=["Vogelsberg",116432,1556,46.4,-523,3996,52.8,1764,39.5,48.1,504];
var wk_21=["Limb.-Weilb. I",88262,264.7,43.9,-169,2987,82.1,1961,21.3,54.2,369];
var wk_22=["Limb.-Weilb. II",83858,473.8,44.9,-280,4014,78.3,1525,40.8,41.2,
           469];
var wk_23=["Hochtaunus I",122643,254.8,44.8,-91,6356,97.7,2991,44.1,34,581];
var wk_24=["Hochtaunus II",112348,227.2,44.7,-197,6692,95,2740,55.4,24.2,695];
var wk_25=["Wetterau I",112345,220.8,43.4,-104,3825,96.5,2080,17.1,60.9,387];
var wk_26=["Wetterau II",95562,547.1,44.7,-332,3719,91.7,1541,35.6,49,531];
var wk_27=["Wetterau III",96007,332.9,44.7,-286,4266,92.9,1882,25.8,55.3,505];
var wk_28=["Rheing.-Taun. I",89137,444.5,45.7,-245,5599,79.2,1714,58.3,24.5,
           596];
var wk_29=["Rheing.-Taun. II",96531,367,44.9,-159,5700,85.2,2609,48.8,34.6,428];
var wk_30=["Wiesbaden I",157207,75.2,41,383,5319,99.7,2382,42.5,29.6,891];
var wk_31=["Wiesbaden II",133340,128.6,41,-46,5319,95.6,2339,17.1,29.6,756];
var wk_32=["Main-Taunus I",119224,100.1,44.1,66,4548,95.5,3974,28.6,37.2,360];
var wk_33=["Main-Taunus II",116484,122.3,43.8,122,6072,95.3,2157,19.6,44.7,491];
var wk_34=["Frankfurt/M I",112611,34.8,41.2,567,7283,87.7,2011,1.8,24,431];
var wk_35=["Frankfurt/M II",113755,29,41.2,470,7283,95.8,2420,1.2,24,435];
var wk_36=["Frankfurt/M III",137135,21.3,41.2,702,7283,97.2,1905,0.4,24,525];
var wk_37=["Frankfurt/M IV",117212,82.5,41.2,342,7283,96.7,2726,40.4,24,449];
var wk_38=["Frankfurt/M V",110886,13,41.2,643,7283,96.7,1980,0,24,424];
var wk_39=["Frankfurt/M VI",138025,67.7,41.2,526,7283,94.6,3067,4.7,24,528];
var wk_40=["Main-Kinzig I",127743,305.8,45,-218,2917,93.4,2281,30.1,48.2,516];
var wk_41=["Main-Kinzig II",159720,141.5,42.6,225,7430,97.7,2188,26.2,30.5,
           1307];
var wk_42=["Main-Kinzig III",129252,950.3,45.5,-460,3915,86.3,2085,49.3,37.1,
           551];
var wk_43=["OF-Stadt",124589,44.9,41,416,9208,96.4,1947,32.8,14.1,466];
var wk_44=["OF-Land I",127446,121.6,43.8,137,5621,97.7,2317,47.4,19.8,543];
var wk_45=["OF-Land II",105538,75,43.4,219,5914,95.9,2294,42.1,18.7,295];
var wk_46=["OF-Land III",116998,159.8,44.5,-117,4435,87.1,2659,39.9,28.9,501];
var wk_47=["Groß-Gerau I",136188,123,42,292,7607,95.4,2724,32.9,21.7,491];
var wk_48=["Groß-Gerau II",132857,330,43.4,99,4083,86.5,2507,19.8,55.4,550];
var wk_49=["DA-Stadt I",102728,83.2,41.2,281,14561,97.4,2283,44.4,19.1,579];
var wk_50=["DA-Stadt II",103804,158.4,41.2,27,9580,89.8,2532,41.6,29.8,585];
var wk_51=["DA-Dieburg I",120744,173.7,43.7,-16,3882,93.1,3177,29,42.8,564];
var wk_52=["DA-Dieburg II",127450,365.3,44,-22,3494,86.3,3109,36.3,45.3,619];
var wk_53=["Odenwald",96473,624,45.7,-354,4318,92.6,1929,56,32.2,477];
var wk_54=["Bergstraße I",137382,299.6,44.6,-217,3723,94.5,2498,33.6,42.6,618];
var wk_55=["Bergstraße II",130553,419.9,45.6,-496,4913,79,1920,44.4,39.1,698];


// group cards in one array
var allCards = [wk_1, wk_2, wk_3, wk_4, wk_5, wk_6, wk_7, wk_8, wk_9, wk_10,
                wk_11, wk_12, wk_13, wk_14, wk_15, wk_16, wk_17, wk_18, wk_19,
                wk_20, wk_21, wk_22, wk_23, wk_24, wk_25, wk_26, wk_27, wk_28,
                wk_29, wk_30, wk_31, wk_32, wk_33, wk_34, wk_35, wk_36, wk_37,
                wk_38, wk_39, wk_40, wk_41, wk_42, wk_43, wk_44, wk_45, wk_46,
                wk_47, wk_48, wk_49, wk_50, wk_51, wk_52, wk_53, wk_54, wk_55];

// list of cards in case player wants to choose a specific card to play with
// list of arrays with variable name and titel of card
var cardsList = [["wk_1", "Kassel-Land I"], ["wk_2", "Kassel-Land II"],
["wk_3", "Kassel-Stadt I"], ["wk_4", "Kassel-Stadt II"],
["wk_5", "Waldeck-Frankenberg I"],["wk_6", "Waldeck-Frankenberg II"],
["wk_7", "Schwalm-Eder I"], ["wk_8", "Schwalm-Eder II"],
["wk_9", "Eschwege-Witzenhausen"], ["wk_10", "Rotenburg"],
["wk_11", "Hersfeld"],["wk_12", "Marburg-Biedenkopf I"],
["wk_13", "Marburg-Biedenkopf II"], ["wk_14", "Fulda I"],
["wk_15", "Fulda II"], ["wk_16", "Lahn-Dill I"], ["wk_17", "Lahn-Dill II"],
["wk_18", "Gießen I"], ["wk_19", "Gießen II"], ["wk_20", "Vogelsberg"],
["wk_21", "Limburg-Weilburg I"], ["wk_22", "Limburg-Weilburg II"],
["wk_23", "Hochtaunus I"], ["wk_24", "Hochtaunus II"], ["wk_25", "Wetterau I"],
["wk_26", "Wetterau II"], ["wk_27", "Wetterau III"],
["wk_28", "Rheingau-Taunus I"],["wk_29", "Rheingau-Taunus II"],
["wk_30", "Wiesbaden I"], ["wk_31", "Wiesbaden II"],["wk_32", "Main-Taunus I"],
["wk_33", "Main-Taunus II"], ["wk_34", "Frankfurt am Main I"],
["wk_35", "Frankfurt am Main II"], ["wk_36", "Frankfurt am Main III"],
["wk_37", "Frankfurt am Main IV"], ["wk_38", "Frankfurt am Main V"],
["wk_39", "Frankfurt am Main VI"], ["wk_40", "Main-Kinzig I"],
["wk_41", "Main-Kinzig II"], ["wk_42", "Main-Kinzig III"],
["wk_43", "Offenbach-Stadt "], ["wk_44", "Offenbach Land I"],
["wk_45", "Offenbach Land II"], ["wk_46", "Offenbach Land III"],
["wk_47", "Groß-Gerau I"], ["wk_48", "Groß-Gerau II"],
["wk_49", "Darmstadt-Stadt I"], ["wk_50", "Darmstadt-Stadt II"],
["wk_51", "Darmstadt-Dieburg I"], ["wk_52", "Darmstadt-Dieburg II"],
["wk_53", "Odenwald"],["wk_54", "Bergstraße I"], ["wk_55", "Bergstraße II "]];


// Inititate buttons and information displays
var startGameButton;
var startTurnButton;
var newGameButton;
var showSummaryButton;
var waitingButton;
var infoLine;
var summaryList;
var gameProgressBar;
var computerCardDiv;


// set width of hud and button container on small devices
var viewportWidth = $(window).width();

if (viewportWidth <= 576) {
  $("#hudcontent").css( "maxWidth", viewportWidth );
  $("#buttons").css( "maxWidth", viewportWidth );
  $("#infocontent").css( "maxWidth", viewportWidth );
}

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

// format numbers for display, currently set to German locale:
// decimal divider is ",", thousands separator is "."
function formatNumbers(num){
  return (
    num
      .toString()
      .replace(".",",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
}

// function to randomly shuffle arrays
function shuffleCards() {
  //Shuffles an array
  var currentIndex = allCards.length;
  var temporaryValue;
  var randomIndex;

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
      document.getElementById("hud").style.display = "none";
      document.getElementById("hud2").style.display = "none";
      document.getElementById("getMode").style.display = "flex";
      document.getElementById("getCategories").style.display = "none";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "none";
      document.getElementById("buttons").style.display = "none";
      newGameButton.style.display = "none";
      // Reset summary
      while (summaryList.hasChildNodes()) {
        summaryList.removeChild(summaryList.lastChild);
      }

      getMode();
      break;
    case 2:
      // Show only category selectors
      document.getElementById("hud").style.display = "none";
      document.getElementById("hud2").style.display = "none";
      document.getElementById("getMode").style.display = "none";
      document.getElementById("getCategories").style.display = "flex";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "none";
      document.getElementById("buttons").style.display = "none";
      getCategories();
      break;
    case 3:
      // Disable all buttons, show "waiting"-button, hide summary, show carddeck
      document.getElementById("hud").style.display = "block";
//      document.getElementById("hud2").style.display = "flex";
      document.getElementById("getMode").style.display = "none";
      document.getElementById("getCategories").style.display = "none";
      document.getElementById("summary").style.display = "none";
      document.getElementById("cards").style.display = "block";
      document.getElementById("buttons").style.display = "flex";
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "inline";
      showSummaryButton.style.display = "none";
      infoLine.innerHTML = "";
      break;
    case 4:
      // Display button to start next turn
      startGameButton.style.display = "none";
      startTurnButton.style.display = "inline";
      newGameButton.style.display = "none";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "none";
      break;
    case 5:
      // Disable all buttons, show "waiting"-button, reset infoline
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "inline";
      showSummaryButton.style.display = "none";
      infoLine.classList.remove("text-success");
      infoLine.classList.remove("text-danger");
      infoLine.classList.remove("text-warning");
      infoLine.classList.add("text-light");
      infoLine.innerHTML = "<h4 class='mb-1'>Runde " + currentRound + " von " +
                           numberOfRounds + "</h4>";
      break;
    case 6:
      // Show button to display summary after last turn
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "none";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "inline";
      break;
    case 7:
      // Show summary, hide cards, show "new game"-button
      startGameButton.style.display = "none";
      startTurnButton.style.display = "none";
      newGameButton.style.display = "inline";
      waitingButton.style.display = "none";
      showSummaryButton.style.display = "none";
      infoLine.style.display = "none";
      document.getElementById("summary").style.display = "block";
      document.getElementById("cards").style.display = "none";
      document.getElementById("hud2").style.display = "none";
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

  var newCardInList;
  var newCardInListContent;

  for (i = 0; i < cardsList.length; i+=1) {
    newCardInList = document.createElement("option");
    newCardInList.value = cardsList[i][0];
    newCardInListContent = document.createTextNode(cardsList[i][1]);
    newCardInList.appendChild(newCardInListContent);
    cardsListDropdown.appendChild(newCardInList);
  }


  // build random list of categories - delete this section if
  // getCategories() will be used

  chosenCategories = [];
  for (i = 1; i < data_header.length; i+=1) {
    chosenCategories.push(i);
  }

  var currentCatIndex = chosenCategories.length;
  var temporaryCatValue;
  var randomCatIndex;

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
  $(document).on("click", "#randomCards", function() {
    gameMode = "random";
    initGame();
  });

  $(document).on("click", "#chosenCardButton", function() {
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
  var newCategoryCheckbox;
  var newCategoryInput;
  var newCategoryLabel;
  var newCategoryLabelContent;

  for (i = 1; i < data_header.length; i+=1) {
    newCategoryCheckbox = document.createElement("div");
    newCategoryCheckbox.classList.add("custom-control", "custom-checkbox",
                                      "custom-control-inline");

    newCategoryInput = document.createElement("input");
    newCategoryInput.id = i;
    newCategoryInput.classList.add("custom-control-input");
    newCategoryInput.type = "checkbox";

    newCategoryLabel = document.createElement("label");
    newCategoryLabel.classList.add("custom-control-label");
    newCategoryLabel.setAttribute("for", i);
    newCategoryLabelContent = document.createTextNode(data_header[i]);
    newCategoryLabel.appendChild(newCategoryLabelContent);

    newCategoryCheckbox.appendChild(newCategoryInput);
    newCategoryCheckbox.appendChild(newCategoryLabel);

    categoriesList.appendChild(newCategoryCheckbox);
  }

  // Let player choose categories

  // If player chooses random categories, create random array of five numbers
  $(document).on("click", "#randomCategories", function() {
    chosenCategories = [];
    for (i = 1; i < data_header.length; i+=1) {
      chosenCategories.push(i);
    }

    var currentCatIndex = chosenCategories.length;
    var temporaryCatValue;
    var randomCatIndex;

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
  $(document).on("click", "#chosenCategoriesButton", function() {
    chosenCategories = [];
    for (i = 1; i < data_header.length; i+=1) {
      currentCatID = "#" + i;
      if ($(currentCatID).is(":checked"))
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
    for (i = 0; i < numberOfRounds; i+=1) {
      playerCards.push(eval(chosenCard));
    }
    // remove chosen player card from cards, assign computer random cards
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
  computerCardDiv.classList.toggle("flip");

  var computerCardBack = document.getElementById("computerCardBack");
  computerCardBack.style.height = $(playercard).height() + "px";
  var computercardBackHeader=document.getElementById("computercardBackHeader");
  computercardBackHeader.innerHTML =  currentComputerCard[0];


  setTimeout(function(){
    //wait with card content so as not to display it before card is flipped back

    // Change heading of computer card
    var computercardHeader = document.getElementById("computercard_header");
    computercardHeader.innerHTML = "<h3 class='m-3 card-title'>" +
                                   currentComputerCard[0] + "</h3>";

    // Fill in computer card by looping through card-array
    var computercardCategories = document
      .getElementById("computercard_categories");
    computercardCategories.innerHTML = "";
    for (i = 0; i < chosenCategories.length; i+=1) {

      var currentCategory = chosenCategories[i];

      // make new row
      var newRow = document.createElement("div");
      newRow.id = "computer_category_row" + currentCategory;
      newRow.classList.add("list-group-item", "d-flex",
                           "w-100", "justify-content-between");
      document.getElementById("computercard_categories").appendChild(newRow);

      // category
      var newCat = document.createElement("h6");
      var newCatContent = document.createTextNode(data_header[currentCategory]);
      newCat.appendChild(newCatContent);
      document.getElementById("computer_category_row" + currentCategory)
        .appendChild(newCat);

      // show value
      var newVal = document.createElement("span");
      var currentValue = formatNumbers(currentComputerCard[currentCategory]);
      var newValContent = document
        .createTextNode(currentValue + data_suffix[currentCategory]);
      newVal.appendChild(newValContent);
      newVal.id = "computercardCategory" + currentCategory;
      newVal.classList.add("category_nolink");
      document.getElementById("computer_category_row" + currentCategory)
        .appendChild(newVal);
    }
  }, 500);
}


// functions needed when page loads
$(document).ready(function() {

  startGameButton = document.getElementById("startGame");
  startGameButton.addEventListener("click", initGame);

  startTurnButton = document.getElementById("startTurn");
  startTurnButton.addEventListener("click", initTurn);

  newGameButton = document.getElementById("newGame");
  newGameButton.addEventListener("click", initNewGame);

  showSummaryButton = document.getElementById("showSummary");
  showSummaryButton.addEventListener("click", initSummary);

  waitingButton = document.getElementById("waiting");

  infoLine = document.getElementById("info_line");
  summaryList = document.getElementById("summary_list");
  gameProgressBar = document.getElementById("gameProgress");

  computerCardDiv = document.getElementById("computercard");


  // Players turn: player chooses category
  $(document).on("click", ".category_link", function(event) {

    if (stateOfGame == 5) {

      var computerCardDiv = document.getElementById("computercard");
      var firstComputerCard = currentComputerCard;
      var firstPlayerCard = currentPlayerCard;

      // turn over computer card
      computerCardDiv.classList.toggle("flip");

      // log the chosen category
      var categoryID = parseInt(this.id.slice(-1));
      if (categoryID == 0) {
        categoryID = 10;
      }
      var chosenPlayerCategory = document
        .getElementById("playercardCategory" + categoryID);
      var chosenComputerCategory = document
        .getElementById("computercardCategory" + categoryID);

      // Prepare summary entry

      var newSummaryLine = document.createElement("div");
      newSummaryLine.classList.add("d-flex", "w-100", "border-top", "py-1");


      var newSummaryPlayer = document.createElement("div");
      newSummaryPlayer.classList.add("text-right", "summary_left")
      newSummaryPlayer.innerHTML = currentPlayerCard[0] + "<br>" +
        formatNumbers(currentPlayerCard[categoryID]) + data_suffix[categoryID];

      var newSummaryCat = document.createElement("div");
      newSummaryCat.classList
        .add("text-center", "d-inline-block", "px-1", "text-secondary", "summary_center")
      newSummaryCat.innerHTML = "<i>" + summary_header[categoryID] + "</i>";

      var newSummaryComputer = document.createElement("div");
      newSummaryComputer.classList.add("text-left", "summary_right")
      newSummaryComputer.innerHTML = currentComputerCard[0] + "<br>" +
        formatNumbers(currentComputerCard[categoryID]) +data_suffix[categoryID];

      if (data_comparison[categoryID] == "larger") {
        if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]) {
          newSummaryPlayer.classList.add("winner");
        } else if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]){
          newSummaryComputer.classList.add("winner");
        }
      } else {
        if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          newSummaryPlayer.classList.add("winner");
        } else if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]){
          newSummaryComputer.classList.add("winner");
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
          chosenPlayerCategory.classList.add("text-success");
          chosenComputerCategory.classList.add("text-danger");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-success");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnWonMsg + "</h4>";
          gameProgressBar.appendChild(progressBarWin);
          playerPoints += 1;
        } else if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]){
          chosenPlayerCategory.classList.add("text-danger");
          chosenComputerCategory.classList.add("text-success");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-danger");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnLostMsg + "</h4>";
          gameProgressBar.appendChild(progressBarLose);
          computerPoints += 1;
        } else {
          chosenPlayerCategory.classList.add("text-warning");
          chosenComputerCategory.classList.add("text-warning");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-warning");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnDrawMsg + "</h4>";
          gameProgressBar.appendChild(progressBarDraw);
        }
      } else {
        if (firstPlayerCard[categoryID] < firstComputerCard[categoryID]) {
          chosenPlayerCategory.classList.add("text-success");
          chosenComputerCategory.classList.add("text-danger");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-success");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnWonMsg + "</h4>";
          playerPoints += 1;
          gameProgressBar.appendChild(progressBarWin);
        } else if (firstPlayerCard[categoryID] > firstComputerCard[categoryID]){
          chosenPlayerCategory.classList.add("text-danger");
          chosenComputerCategory.classList.add("text-success");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-danger");
          gameProgressBar.appendChild(progressBarLose);
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnLostMsg + "</h4>";
          computerPoints += 1;
        } else {
          chosenPlayerCategory.classList.add("text-warning");
          chosenComputerCategory.classList.add("text-warning");
          infoLine.classList.remove("text-light");
          infoLine.classList.add("text-warning");
          infoLine.innerHTML = "<h4 class='mb-1'>" + turnDrawMsg + "</h4>";
          gameProgressBar.appendChild(progressBarDraw);
        }
      }

      updateScore();


      //remove current card from decks

      playerCards.shift();
      computerCards.shift();
      currentRound += 1;

      // Proceed: Next card, if cards left or summary, if no cards left

      if (playerCards.length > 0) {
        updateButtons(4);
      } else {
        updateButtons(6);
        infoLine.classList.remove("text-success");
        infoLine.classList.remove("text-warning");
        infoLine.classList.remove("text-danger");
        infoLine.classList.add("text-light");
        infoLine.innerHTML = "<h4 class='mb-1'>" + gameOverMsg + "</h4>";
      }

    }

  } );

  // Show gameMode-Chooser on load - GAME IS STARTED HERE
  updateButtons(1);

});


// initiate new game after a game is finished
function initNewGame() {
  // updateButtons(1);
  window.location.reload()
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

  var summaryHeadline = document.getElementById("summaryHeadline");

  if (playerPoints > computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-success'>" + gameWonMsg +
      playerPoints + ":" + computerPoints + "</h3>";
  }
  if (playerPoints < computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-danger'>" + gameLostMsg +
      playerPoints + ":" + computerPoints + "</h3>";
  }
  if (playerPoints == computerPoints) {
    summaryHeadline.innerHTML = "<h3 class='text-warning'>" + gameDrawMsg +
      playerPoints + ":" + computerPoints + "</h3>";
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
  playercardHeader.innerHTML = "<h3 class='m-3 card-title'>" +
    currentPlayerCard[0] + "</h3>";

  // Fill in player card by looping through card-array
  var playercardCategories = document.getElementById("playercard_categories");
  playercardCategories.innerHTML = "";
  for (i = 0; i < chosenCategories.length; i+=1) {

    var currentCategory = chosenCategories[i];

    // make new row
    var newRow = document.createElement("div");
    newRow.id = "player_category_row" + currentCategory;
    newRow.classList
      .add("list-group-item");
    document.getElementById("playercard_categories").appendChild(newRow);

    // category
    var newCat = document.createElement("h6");
    var newCatContent = document.createTextNode(data_header[currentCategory]);
    newCat.appendChild(newCatContent);

    // value


    var newVal = document.createElement("h6");
    var currentValue = formatNumbers(currentPlayerCard[currentCategory]);
    var newValContent = document
      .createTextNode(currentValue + data_suffix[currentCategory]);
    newVal.appendChild(newValContent);

    // link whole row
    var newRowLink = document.createElement("a");
    newRowLink.id = "playercardCategory" + currentCategory;
    newRowLink.href = "#";
    newRowLink.classList
      .add("category_link", "d-flex", "w-100", "justify-content-between");
    newRowLink.appendChild(newCat);
    newRowLink.appendChild(newVal);
    document.getElementById("player_category_row" + currentCategory)
      .appendChild(newRowLink);

  }

  buildComputerCard();

}
