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

	// Fetch the requested content and inject it into the current page
	TwentyFourteen.navigate = function( url ) {
		// Replace #primary #content with the requested page
		$( '#content' ).load( url + ' #content > *' );
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
