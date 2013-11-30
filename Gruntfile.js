/* jshint node:true */
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		clean: {
			build: ['js/keyboard-image-navigation.min.js']
		},
		copy: {
			// Copy the main QUnit file and point the copy at the compiled plugin script
			qunit: {
				src: 'tests/qunit-tests.html',
				dest: 'tests/qunit-compiled.html',
				options: {
					processContent: function( src ) {
						return src.replace( 'keyboard-image-navigation.js' , 'keyboard-image-navigation.min.js' );
					}
				}
			}
		},
		jshint: {
			options: grunt.file.readJSON( '.jshintrc' ),
			grunt: {
				src: ['Gruntfile.js']
			},
			logic: {
				src: [
					'js/**/*.js',
					'!js/**/*.min.js'
				]
			},
			tests: {
				src: ['tests/**/*.js'],
				options: grunt.file.readJSON( 'tests/.jshintrc' )
			}
		},
		qunit: {
			// Run any HTML files found in the /tests directory through QUnit
			code: ['tests/qunit-tests.html'],
			build: ['tests/qunit-compiled.html']
		},
		uglify: {
			build: {
				src: 'js/keyboard-image-navigation.js',
				dest: 'js/keyboard-image-navigation.min.js'
			}
		},
		watch: {
			logic: {
				files: ['js/**', '!*.min.js'],
				tasks: ['jshint:logic', 'qunit:code']
			},
			tests: {
				files: ['tests/**'],
				tasks: ['jshint:tests', 'qunit:code']
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'test', ['qunit:code'] );

	grunt.registerTask( 'default', [
		'jshint',
		'qunit:code',
		'clean',
		'uglify',
		'copy',
		'qunit:build'
	]);
};