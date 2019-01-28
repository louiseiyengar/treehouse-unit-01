/******************************************
Treehouse Techdegree:
FSJS project 1 - A Random Quote Generator

This projects will present one HTML web page with a quote randomly selected from the 
quotes array (in the file: quotes.js).  The quotes will be authored either by Jane Austen, Charles Dickens, or Oscar Wilde.

The quote display will also have an attribute, containing an image and name of the author of the quote, and, conditionally (if they exist),
the novel, play, or book of essays from which the quote came, the character that said the quote, and the date the quote's source was published.

In addition, one of twelve background colors will be randomly chosen to display with each quote change.

Finally, the quotes will change after a set number of seconds (const delayInMilliseconds) or if you press a button.
******************************************/

//GLOBAL CONSTANTS

//const quotes - array is located in quotes.js

//arrAy of background colors that will be randomly chosen to display with the quotes
const backgroundColors = [
  "#006600", "#003300", "#660033", "#4d807e", "#4f804d", "#cc3300", 
  "#333333", "#003366", "#006666", "#660022", "#802000", "#444422"
];

//The quotes will be displayed every 10 seconds.  Change this constant to speed up or slow down the quotes display.
const delayInMilliseconds = 10000;


//FUNCTIONS

/*
  This function takes an array as a parameter.  
  It will generate a random number to be an array index, and it will return the array value at that index.
  This function is used both to return a random quote as well as a random background color.  
*/
function getRandomQuote(quotesArray) {
  let randomIndex = Math.floor(Math.random() * quotesArray.length); 
  return (quotesArray[randomIndex]);
}

/*
  This function changes the background color of the page.
  It calls getRandomQuote to get a randomly chosen color from the backgroundColors array and then
  sets the HTML page's body tag to a new background color style.
*/
function changeBackgroundColor() {
  let backgroundColor = getRandomQuote(backgroundColors);
  document.body.style.backgroundColor = backgroundColor;

  //This will set the background color of the 'click' button to the new background color
  document.getElementById("loadQuote").style.backgroundColor = backgroundColor;
}

/*
  This function takes an author's name (the name property from a quotes object)
  and it returns an image file name.
  Example input authorname: Charles Dickens / return charlesdickens.jpg
*/
function getImageName (authorName) {
  //this string replacement statement was found on stack overflow: 
  //https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
  let imageName = authorName.replace(/\s+/g, ''); //remove spaces from string
  return (imageName.toLowerCase() + ".jpg");      //lowecase string and append .jpg
}

/*
  This function will get the new random background color and random quote for the page.
  It will call the changeBackgroundColor function to set the background color.
  It will call getRandomQuote to get a quote object.
  It will use the properties of the quote object's properties to format a string of HTML tags and text to present
  both the quote and the quote's attribute (including a small image of the quote's author).
*/
function printQuote() {
  changeBackgroundColor();  //get random color for this quote
  
  //get quote object
  let currentQuote = getRandomQuote(quotes);

  //format one string of HTML tags and text to present the quote.
  let htmlString = `<p class="quote">${currentQuote.quote}</p>`;

  //Continue the string with the quote's attribute - the image and author of the quote.  
  //Call getImageName function to get the file name for the author's image.
  htmlString += `<p class="source"><img class="portrait" src="img/${getImageName(currentQuote.source)}">${currentQuote.source}`;

  //A quote may or may not have a citation (a book or essay the quote came from)
  if (currentQuote.citation !== "") {
    htmlString += `<span class="citation">${currentQuote.citation}`;
    //The character property will only exist if the quote has a citation.  If the citation is an essay, there will be no
    //character.
    if (currentQuote.character !== "") {
      htmlString += `<span class="character"> (${currentQuote.character})</span>`;
    } 
    htmlString == `</span>`;
  }

  //Quotation may or may not have a year known.
  if (currentQuote.year !== "") {
    htmlString += `<span class="year">${currentQuote.year}</span>`;
  }
  htmlString += `</p>`;

  //Place htmlString in the div with the id: quote-box
  document.getElementById("quote-box").innerHTML = htmlString;
}

/*
  This function will call the printQuote function to display the quote page.  It will set an interval of seconds 
  (set in delayInMilliseconds), and a new quote will continually be displayed after that interval.

  In addition, the user can click a button to view a new quote, and a new quote will be display, and the interval
  will be reset.
*/
function displayQuotes () {
  //Print initial quote
  printQuote();
  //Display text in the 'click' button so that viewer will know that quote will change after the interval seconds, or
  //that the button can be clicked to change the quote. 
  document.getElementById("loadQuote").innerHTML = `Show another quote<br>or wait ${delayInMilliseconds / 1000} seconds`;

  //Call setInterval function to continually display a new quote after a set number of seconds.
  let intervalID = setInterval(printQuote, delayInMilliseconds);

  //If the button is clicked, clear the current interval, call the printQuote function to display a new quote, and
  //call the setInterval function again, so that a quote will again appear after a set interval.
  document.getElementById('loadQuote').addEventListener("click", function () {
    clearInterval(intervalID);
    printQuote();
    intervalID = setInterval(printQuote, delayInMilliseconds);
  }, false);
}

//Call the displayQuotes function to run all the functions and show the page.
displayQuotes();
