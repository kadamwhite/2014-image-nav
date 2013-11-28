<?php
/**
 * Plugin Name: Twenty Fourteen Enhanced Image Navigation
 * Plugin URI: http://github.com/kadamwhite/twentyfourteen-enhanced-image-nav
 * Description: When paging through images, load content via an AJAX postback instead of a full page reload
 * Author: K.Adam White
 * Version: 0.1
 * Author URI: http://www.kadamwhite.com/
 * License: GPLv3 or later
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
*/

// Register a new script for image navigation
function custom_keyboard_image_navigation() {
	wp_register_script(
		'twentyfourteen-keyboard-image-navigation',
		plugin_dir_url( __FILE__ ) . 'js/keyboard-image-navigation.js',
		array( 'jquery' ),
		'20130402'
	);
}
// Run our custom override first
add_action( 'wp_enqueue_scripts', 'custom_keyboard_image_navigation', 1 );
