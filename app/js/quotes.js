//https://pprathameshmore.github.io/QuoteGarden/

(function() {
	'use strict';

	const url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random',
		$quote = $('.quote'),
		$quoteAuthor = $('.quote-author'),
		$getQuoteButton = $('.get-quote-button'),
		$imageContainer = $('.image-container'),
		$creditsLink = $('.credits-link'),
		$photographer = $('.photographer'),
		photographers = {
			'red': 'Annie Spratt',
			'green': 'Nate Johnston'
		};

	let quoteText, quoteAuthor;

	function htmlEncode(s) {
		const HTMLCharMap = {
			"&" : "&amp;",
			"'" : "&#39;",
			'"' : "&quot;",
			"<" : "&lt;",
			">" : "&gt;",
			"\\" : "&#x5c;",
			"`" : "&#x60;",
			":" : "&#58;"
		};

		function encodeHTMLmapper(ch) {
			return HTMLCharMap[ch];
		}

		return s.replace(/[&"'<>\\`:]/g, encodeHTMLmapper);
	}

	function getQuote() {
		return $.ajax({
					type: 'GET',
					url: url,
					success: function(response) {
						quoteText = htmlEncode(response.quote.quoteText),
						quoteAuthor = htmlEncode(response.quote.quoteAuthor);
					},
					error: function(error) {
						console.log(error);
					}
				});
	}

	function displayQuote() {
		const request = getQuote();

		request.done(() => {
			populateText(quoteText, quoteAuthor);
			storeQuote();
		})
	}

	function populateText(text = '', author = '') {
		$quote.html(text);
		$quoteAuthor.html(author);
	}

	function storeQuote() {
		localStorage.setItem('quoteStored', quoteText);
		localStorage.setItem('quoteAuthorStored', quoteAuthor);
	}

	function displayStoredQuote() {
		const quoteStored = localStorage.getItem('quoteStored'),
			quoteAuthorStored = localStorage.getItem('quoteAuthorStored'),
			notUndefined = quoteStored !== 'undefined' && quoteAuthorStored !== 'undefined',
			notNull = quoteStored !== null && quoteAuthorStored !== null;

		if (notUndefined && notNull) {
			populateText(quoteStored, quoteAuthorStored);
		} else {
			displayQuote();
		}
	}

	function changeImage() {
		$('body').hasClass('red') ? $('body').removeClass('red').addClass('green') : $('body').removeClass('green').addClass('red');

		setTimeout(()=> updatePhotographer(), 2000);
	}

	function updatePhotographer() {
		const photoCategory = $('body').attr('class'),
			photographer = photographers[photoCategory];

		$photographer.text(photographer);
	}
 
 	setInterval(changeImage, 10000);
	displayStoredQuote();
	$getQuoteButton.on('click', displayQuote);
})();