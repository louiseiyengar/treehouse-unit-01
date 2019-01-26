/******************************************
Treehouse Techdegree:
FSJS project 1 - A Random Quote Generator
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1s5grutGuQFwJcQP8bFwEI69Q8FCkGdDk/view?usp=sharing


/*** 
  Create the array of quote objects and name it `quotes`.
  Add at least five quote objects to the `quotes` array.
  Give each quote object a `quote` and `source` property.

  Recommended: 
    - Add at least one `year` and/or `citation` property to at least one 
      quote object.
***/
const backgroundColors = [
  "#006600", "#003300", "#660033", "#4d807e", "#4f804d", "#cc3300", 
  "#333333", "#003366", "#006666", "#660022", "#802000", "#444422"
];




/***
  Create the `getRandomQuote` function to:
   - generate a random number 
   - use the random number to `return` a random quote object from the 
     `quotes` array.
***/
function getRandomQuote(quotesArray) {
  let randomIndex = Math.floor(Math.random() * quotesArray.length); 
  return (quotesArray[randomIndex]);
}

function changeBackgroundColor() {
  let backgroundColor = getRandomQuote(backgroundColors);
  document.body.style.backgroundColor = backgroundColor;
  document.getElementById("loadQuote").style.backgroundColor = backgroundColor;
}

/***
  Create the `printQuote` function to: 
   - call the `getRandomQuote` function and assign it to a variable.
   - use the properties of the quote object stored in the variable to 
     create your HTML string.
   - use conditionals to make sure the optional properties exist before 
     they are added to the HTML string.
   - set the `innerHTML` of the `quote-box` div to the HTML string. 
***/
function printQuote() {
  changeBackgroundColor();
  //get quote
  let currentQuote = getRandomQuote(quotes);


  let htmlString = `<p class="quote">${currentQuote.quote}</p>`;

  htmlString += `<p class="source">${currentQuote.source}`;

  if (currentQuote.citation !== "") {
    htmlString += `<span class="citation">${currentQuote.citation}`;
    if (currentQuote.character !== "") {
      htmlString += `<span class="character"> (${currentQuote.character})</span>`;
    } 
    htmlString == `</span>`;
  }

  if (currentQuote.year !== "") {
    htmlString += `<span class="year">${currentQuote.year}</span>`;
  }

  htmlString += `</p>`;

  document.getElementById("quote-box").innerHTML = htmlString;
}


printQuote();

/***
  When the "Show another quote" button is clicked, the event listener 
  below will be triggered, and it will call, or "invoke", the `printQuote` 
  function. So do not make any changes to the line of code below this 
  comment.
***/

document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Remember to delete the comments that came with this file, and replace them with your own code comments.
