// Get Quotes From API
let apiQuotes = [];

// Show new quote
const newQuote = function () {
  // Pick a random quote from arr
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
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

// On load
getQuotes();
