// Project 1 - FSJS Techdegree
// Meng Wang
// Project theme: quote-generator



// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var myVar = setInterval(autoRefresh, 5000);


// store quotes data into an array
const quotes = [
	{
		quote:"There is some good in this world, and it’s worth fighting for.",
		source:"J.R.R. Tolkien",
		citation:"The Two Towers",
		year:1854,
		tag:"inspiration"
	},
	{
		quote:"Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do.",
		source:"H.Jackson Brown Jr",
		citation:"The Zahir",
		year:1965,
		tag:"humor"
	},
	{
		quote:"Get busy living, or get busy dying.",
		source:"Stephen King",
		citation:"Different Seasons",
		year:1988,
		tag:"life"
	},
	{
		quote:"Most people are nice when you finally see them.",
		source:"Harper Lee",
		citation:"To Kill a Mockingbird",
		year:1892,
		tag:"humor"
	},
	{
		quote:"The only limits for tomorrow are the doubts we have today.",
		source:"Pittacus Lore",
		citation:"The Power of Six",
		year:1768,
		tag:"politics"
	}
];


//a function to change buttons & page's background color randomly
function changeColor(){
		const number1 = Math.floor(Math.random() * 256);
		const number2 = Math.floor(Math.random() * 256);
		const number3 = Math.floor(Math.random() * 256);
		var color ='rgb(' + number1 + ', ' + number2 + ', ' + number3 + ')';
		document.body.style.backgroundColor = color;
		document.getElementById('loadQuote').style.backgroundColor = color;
}


// get random quote object from data's array 
function getRandomQuote(){
	const number = Math.floor(Math.random() * quotes.length);
	return quotes[number];
};


// triger the color change, render the quote and its property onto page
function printQuote(){

	changeColor();

	const getQuote  = getRandomQuote();
	const quote     = getQuote.quote;
	const source    = getQuote.source;
	const citation  = getQuote.citation;
	const year      = getQuote.year;
	const tag       = getQuote.tag;

	var massage1 = '<p class="quote">' + quote + '</p>';
	var massage2 = '<p class="source">'+ source;

	if (citation){
		massage2 = massage2+ ', ' + citation;
	}
	if (year){
		massage2 = massage2 + ', ' + year;
	}
	if (tag){
		massage2 = massage2 + ', ' + tag;
	}
	else{
		massage2 = massage2 + '</p>';
	}

	document.getElementById('quote-box').innerHTML = massage1 + massage2;
}


// automatically refresh the page every 5 secconds
function autoRefresh(){
	printQuote();
}




