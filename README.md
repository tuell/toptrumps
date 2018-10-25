# Top trumps online game
This is a simple online implementation of a "Top trumps"-style card game ("Quartett" in German) with HTML 5, Javascript and jQuery. The game should work in all modern browsers on both desktop and mobile devices.  

_**Disclaimer: This code was built to just work, it is not optimised in terms of elegance, performance or anything else.**_

## What you get
This code implements a full screen web game intended for embedding in another web page. It consists of an HTML-file, the Javascript and jQuery to insert the data and control the game and a CSS-stylesheet. The game uses [Bootstrap](https://getbootstrap.com/ "Twitter Bootstrap 4") for structuring and is fully responsive.

An example can be seen and played at [hessenschau.de *(German)*](https://www.hessenschau.de/politik/wahlen/landtagswahl-2018/das-grosse-hrwahl-quartett,ltw18-wahlkreisquartett-104.html "Wahlkreis-Quartett").

## The game
The game is inspired by games like "Top Trumps" [(Wikipedia)](https://en.wikipedia.org/wiki/Top_Trumps "Top Trumps - Wikipedia"). In this implementation the player competes with the computer. Player and computer are each dealt the same number of cards. The cards state different categories of data about the subjects of the game, in this example about countries of the European Union. In the beginning of each round, the player can see his own card and the name of the computer's card. The player has to choose a category. Then the card of the computer is revealed and the values in the selected category are compared. The winner gets a point. After a set number of rounds, a summary and the winner of the game are displayed.  

## The idea
Reading about statistical data can be boring and tiring. By presenting data in a game, hopefully the users are more engaged, have fun with the data and better remember them, especially when they did not expect certain constellations.

## How to implement it
To use this code, download the files and change them according to your needs. The code is intended to be embedded in an iFrame, but you could of course build a standalone web page around it. All files are extensively annotated in case you want to adapt them.

### index.html
This contains the basic elements of the game, such as card templates, containers for hud elements and the container for the summary.

### index.css
This stylesheet controls the look and feel of the game.

### index.js
This code controls the actual game. Also the data for the cards are loaded here.

#### How to prepare the data
The data are defined as variables in the index.js. This is what you need:

**data_header**: Array of the different categories, the first entry should be the type of card. Example:
```
var data_header = ["Country", "Population", "Area", "Density",
                   "Growth", "Unemployment", "Life expectancy"];
```

**summary_header**: Shortened description of the categories, insert conditional hyphenation with `&shy;`. Example:
```
var summary_header = ["", "Popu&shy;lation", "Area", "Den&shy;sity",
                      "Growth", "Unem&shy;ploy&shy;ment", "Life ex&shy;pectancy"];
```

**data_suffix**: Suffix if necessary. First entry needs to be empty. Example:
```
var data_suffix = ["", " mio.", " km\u00B2", "", " %", " %", " yrs"];
```

**data_comparison**: Specify if the larger or smaller number wins, first entry needs to be empty. Example:
```
var data_comparison = ["", "larger", "larger", "larger", "larger", "smaller", "larger"];
```

**Cards**: Title first, then the numbers in the same order as before. The concatenate-function in Excel can help compile the variable definitions from a spreadsheet with data. Example:
```
var austria = ["Austria", 8.77, 83858, 104.6, 5.6, 10.6, 82];
```

**Cards list (1)**: Array used for dealing the card decks. Example:
```
var allCards = [austria, belgium, bulgaria, ... ];
```

**Cards list (2)**: List of cards and titles, in case user wants to select a card to play with. Example:
```
var cardsList = [["austria", "Austria"], ["belgium", "Belgium"],
                 ["bulgaria", "Bulgaria"], ["croatia", "Croatia"], ["cyprus", "Cyprus"], ...];
```

## Other works used for this code
The game is built on the [Bootstrap framework](https://getbootstrap.com/ "Twitter Bootstrap 4"). Other things used are [Fontawesome Icons](https://fontawesome.com/?from=io), David Walsh's [CSS-Flip animation](https://davidwalsh.name/css-flip), [Google Fonts](https://fonts.google.com), [classList.js](https://github.com/eligrey/classList.js) and [jQuery](http://jquery.com/). Data in the example are taken from various Wikipedia pages about the European Union (Oct. 22, 2018).

## License
This code is published under the standard GNU General Public License v3.0. You can freely use and adapt it, provided that you name the source and publish under the same license.

## Made by
This game was developed by [Till Hafermann](https://twitter.com/hafertill "@hafertill on Twitter") and Miguel Pascual Sanina for the [data team of Hessischer Rundfunk _(German website)_](https://www.hessenschau.de/redaktion/hessenschaudehr-datenteam,hr-datenteam-102.html "Datenteam des Hessischen Rundfunks"). 
