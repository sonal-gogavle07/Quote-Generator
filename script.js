const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show new Quote
function newQuote(){
    loading();

    //  Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author)
        author.textContent = "Unknown";
    else
        authorText.textContent = quote.author;

    //Check quote length to determine styling
    if(quote.text.length > 120)
        quoteText.classList.add('long-quote');
    else
        quoteText.classList.remove('long-quote');

    // set Quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

//Get quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);// this means that this constant will not be populated until it has some data fetched from our API
        apiQuotes = await response.json();//we are getting the JSON from our API as a response and then we're turning that response into a JSON object and we are passing it in global variable apiQuotes
        newQuote();
    }catch(error){
        //Catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');//_blank is used to open twitter window in new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();