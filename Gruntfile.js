/* jshint node:true */
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: grunt.file.readJSON( '.jshintrc' ),
			grunt: {
				src: ['Gruntfile.js']
			},
			logic: {
				src: ['js/**/*.js']
			},
			tests: {
				src: ['tests/**/*.js'],
				options: grunt.file.readJSON( 'tests/.jshintrc' )
			}
		},
		qunit: {
			// Run any HTML files found in the /tests directory through QUnit
			all: ['tests/qunit-tests.html']
		},
		watch: {
			logic: {
				files: ['js/**'],
				tasks: ['jshint:logic', 'qunit']
			},
			tests: {
				files: ['tests/**'],
				tasks: ['jshint:tests', 'qunit']
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'default', [ 'jshint', 'qunit' ] );
};