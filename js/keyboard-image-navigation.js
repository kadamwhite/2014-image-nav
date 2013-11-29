/* global: TwentyFourteen:false; */
window.TwentyFourteen = window.TwentyFourteen || {};

/**
 * Twenty Fourteen keyboard support for image navigation.
 */
(function( $ ) {
	var loadPage = function( url ) {
		TwentyFourteen.navigate( url + '#main' );
	};

	// Wrapper for URL redirection, for use in tests
	TwentyFourteen.navigate = function( url ) {
		window.location = url;
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
