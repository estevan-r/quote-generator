const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quotes From API
let apiQuotes = [];

const showLoadingSpinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Show new quote
const newQuote = function () {
  showLoadingSpinner();
  // Pick a random quote from array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Replace if author is unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote and hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
};

async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // Catch error here
  }
}

// Tweet Quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
