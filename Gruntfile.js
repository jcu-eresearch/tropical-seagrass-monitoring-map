module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['build/', 'src/map.css'],
        jshint: {
            src: ['src/map.js'],
        },
        copy: {
            source: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'build/'
            }
        },
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'build'
            }
        },
        usemin: {
            html: 'build/index.html'
        },
        less: {
            all: {
                paths: ['src/map.less'],
                files: {
                    'src/map.css': 'src/map.less'
                }
            }
        },
        watch: {
            all: {
                files: ['src/*'],
                tasks: ['default']
            },
            less: {
                files: ['src/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'clean',
        'less',
        'jshint',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'usemin'
    ]);
};
