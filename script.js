const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Get Quotes From API
let apiQuotes = [];

// Show new quote
const newQuote = function () {
  // Pick a random quote from arr
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

  quoteText.textContent = quote.text;
};

async function getQuotes() {
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
