# Top trumps online game
This is a simple online implementation of a "Top trumps"-style card game ("Quartett" in German) with nothing but HTML 5, Javascript and Jquery. 

---
**Disclaimer: This code was built to just work, it is not optimised in terms of elegancy, performance or anything else.**
---

## What you get
This code implements a full screen web game intended for embedding in another web page. It consists of an HTML-file, the Javascript and Jquery to insert the data and control the game and a stylesheet. The game uses [Bootstrap](https://getbootstrap.com/ "Twitter Bootstrap 4") for structuring and is fully responsive. 

An example can be seen and played at [hessenschau.de *(German)*](https://www.hessenschau.de/politik/wahlen/landtagswahl-2018/das-grosse-hrwahl-quartett,ltw18-wahlkreisquartett-104.html "Wahlkreis-Quartett").

## Where it works
The game should work in all modern browsers on desktop PCs and mobile devices. 

## How to use it
To use this code, download the files and change them according to your needs. All files are extensively annotated in case you want to adapt them.

### index.html
This contains the basic elements of the game, such as card templates, containers for hud elements and the container for the summary.

### index.css
This stylesheets controls the look and feel of the game. 

### index.js
This code controls the actual game. Also the data for the cards are loaded here.

#### How to prepare the data
The data need to be defined as variables in the index.js. This is what you need:

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

**Cards**: Title first, then the numbers in the same order as before. Example: 
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
	["bulgaria", "Bulgaria"], ["croatia", "Croatia"], ["cyprus", "Cyprus"],
  ...];
```

## License
This code is licensed under the standard GNU General Public License v3.0. You can freely use and adapt it, provided that you name the source and publish under the same license. This game was developped for the data team of the Hessischer Rundfunk in 2018. 
