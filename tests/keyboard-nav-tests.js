(function( $ ) {
	'use strict';

	var $document, mockEvent;

	// Group navigation tests in a module: This allows us to define setup and
	// teardown methods to reduce code duplication between tests.
	module( 'Basic Keyboard Navigation', {
		// Run before each test
		setup: function () {
			// Re-usable jQuery reference to the document object
			$document = $( document );

			// Observe TwentyFourteen.navigate, but do not call through
			sinon.stub( TwentyFourteen, 'navigate' );

			// Create a mock event to trigger navigation
			mockEvent = $.Event( 'keydown.twentyfourteen' );
		},
		// Run after each test
		teardown: function() {
			// Restore the original TwentyFourteen.navigate method
			TwentyFourteen.navigate.restore();
		}
	});

	test( 'Left key navigates to previous image', function() {
		// Set event to be the left arrow key code
		mockEvent.which = 37;

		// Trigger event
		$document.trigger( mockEvent );

		// Expect location to have been called with the URL from the fixture
		ok( TwentyFourteen.navigate.calledWith( 'prev-image-link.html' ),
			'Navigation called with the URL for the previous page' );
	});

	test( 'Right key navigates to next image', function() {
		// Set event to be the left arrow key code
		mockEvent.which = 39;

		// Trigger event
		$document.trigger( mockEvent );

		// Expect location to have been called with the URL from the fixture
		ok( TwentyFourteen.navigate.calledWith( 'next-image-link.html' ),
			'Navigation called with the URL for the next page' );
	});

	test( 'No navigation occurs if textarea or input have focus', function() {
		// Force $( 'textarea, input' ).is( ':focus' ) to return "true"
		sinon.stub( $.fn, 'is', function() {
			return true;
		});

		// Trigger a left-arrow event
		mockEvent.which = 37;
		$document.trigger( mockEvent );

		// Nothing should have happened
		ok( ! TwentyFourteen.navigate.called,
			'No navigation should occur when an input element is focused' );

		// Restore jQuery.fn.is
		$.fn.is.restore();
	});

	module( 'Async content loading', {
		setup: function() {
			// Mock out a server backend to test the async content loading
			this.xhr = sinon.useFakeXMLHttpRequest();
			var requests = this.requests = [];

			// Every time a fake XMLHttpRequest is created, add it to requests
			this.xhr.onCreate = function( xhr ) {
				requests.push( xhr );
			};
		}
	});

	test( 'Requested content is loaded into the #content container', function() {
		// Double-check that #content starts out empty
		strictEqual( $( '#content' ).html(), '',
			'Container is empty at start of test' );

		// Trigger an ajax request and respond with dummy content
		TwentyFourteen.navigate( 'some/url/' );
		this.requests[0].respond( 200, {
			'Content-Type': 'text/html'
		}, '<div id="content"><h2>Subtitle</h2><img src="image.jpg" /></div>' );

		// Expect the server response to have been loaded into the content container
		strictEqual( $( '#content' ).html(), '<h2>Subtitle</h2><img src="image.jpg">',
			'Contents of retrieved page are injected into #content' );
	});

})( jQuery );
