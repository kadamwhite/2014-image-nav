/* global: TwentyFourteen:false; */
window.TwentyFourteen = window.TwentyFourteen || {};

/**
 * Twenty Fourteen keyboard support for image navigation.
 */
(function( $ ) {
	var loadPage = function( url ) {
		// Don't navigate if the user is editing an input field
		if ( url && ( !$( 'textarea, input' ).is( ':focus' ) ) ) {
			TwentyFourteen.navigate( url );
		}
	};

	var updateTitle = function( responseText ) {
		// Parse the response as raw text to find a title tag
		var titleRegEx = /<title>([^<]*)<\/title>/i,
			titleMatch = responseText.match( titleRegEx ),
			// If regex hits a match, titleMatch will not be null
			title = titleMatch !== null ? titleMatch[1] : false;

		// If we find a match, update the document's title attribute
		if ( title ) {
			document.title = title;
		}
	};

	var updateURL = function( url ) {
		if ( url && window.history ) {
			// history API is available
			window.history.replaceState( {}, '', url );
		}
	}

	// Fetch the requested content and inject it into the current page
	TwentyFourteen.navigate = function( url ) {
		// Replace #primary #content with the requested page
		$( '#content' ).load( url + ' #content > *', function( responseText, status ) {
			// Don't bother continuing if request didn't succeed
			if ( 'success' !== status ) {
				return;
			}

			// When request succeeds, update the title & URL
			updateTitle( responseText );
			updateURL( url );
		});
	};

	// Bind event handlers for keyboard image navigation
	$( document ).on( 'keydown.twentyfourteen', function( e ) {
		var url = false;

		// Left arrow key code.
		if ( e.which === 37 ) {
			loadPage( $( '.previous-image a' ).attr( 'href' ) );

		// Right arrow key code.
		} else if ( e.which === 39 ) {
			loadPage( $( '.entry-attachment a' ).attr( 'href' ) );
		}
	} );
})( jQuery );
