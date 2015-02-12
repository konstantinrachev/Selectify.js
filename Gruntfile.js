modules.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
            build: {
                src: 'src/selectify.js',
                dest: 'src/selectify.min.js'
            }
        },
		jshint: {
			src: ['src/selectify.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', ['uglify', 'jshint']);
}