module.exports = function (grunt) {

    'use strict';

    /* constants */
    var SRC         = './src/';
    var DIST        = './dist/';
    var SERVER_PORT = 3000;

    /* GRUNT INIT =-==-=-=-=-=-=-=-=-=-=-=- */
    grunt.initConfig({
        // load package file
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: [DIST]
        },

        connect: {
            dev: {
                options: {
                    base: DIST,
                    hostname: '*',
                    port: SERVER_PORT
                }
            },
            build: {
                options: {
                    base: DIST,
                    hostname: '*',
                    port: SERVER_PORT,
                    keepalive: true
                }
            }
        },

        copy: {
            options: {
                processContentExclude: ['.DS_Store', '.gitignore', '.sass-cache', 'node_modules', 'src/tests/**']
            },
            fonts: {
                files: [
                    {
                        cwd: SRC,
                        dest: DIST,
                        src: ['assets/fonts/**/*.{eot,otf,svg,ttf,woff}'],
                        expand: true,
                        filter: 'isFile'
                    }
                ]
            },
            html: {
                files: [
                    {
                        cwd: SRC,
                        dest: DIST,
                        src: ['*.html'],
                        expand: true,
                        filter: 'isFile'
                    }
                ]
            },
            images: {
                files: [
                    {
                        cwd: SRC,
                        dest: DIST,
                        src: ['assets/img/**/*.{gif,jpg,png}'],
                        expand: true,
                        filter: 'isFile'
                    }
                ]
            },
            json: {
                files: [
                    {
                        cwd: SRC,
                        dest: DIST,
                        src: ['assets/**/*.json'],
                        expand: true,
                        filter: 'isFile'
                    }
                ]
            },
            scripts: {
                files: [
                    {
                        cwd: SRC,
                        dest: DIST,
                        src: ['app/**/*.js'],
                        expand: true,
                        filter: 'isFile'
                    }
                ]
            },
            styles: {
                files: [
                    {
                        cwd: SRC,
                        dest: DIST,
                        src: ['assets/css/**'],
                        expand: true,
                        filter: 'isFile'
                    }
                ]
            }
        },

        jshint: {
            options: {
                browser: true,
                curly: true,
                devel: true,
                eqeqeq: true,
                evil: true,
                immed: true,
                regexdash: true,
                asi : true,
                sub: true,
                trailing: true,
        //        unused: true,
                globals: {
                    angular: true,
                    app: true,
                    jQuery: true,
                    modernizr: true
                },
                force: true // allow build to continue with errors
            },
            dev: {
                src: [
                    SRC + 'app/**/*.js',
                    '!' + SRC + 'app/vendor/**/*.js'
                ]
            },
            gruntfile: {
                src: ['Gruntfile.js']
            }
        },
        sass: {
            options: {
                sourcemap: false,
                trace: true
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    src: ['**/*.scss', '!**/_*.scss'],
                    cwd: SRC + 'assets/sass',
                    dest: SRC + 'assets/css',
                    ext: '.css'
                }]
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    src: ['**/*.scss', '!**/_*.scss', '!**/*.css.map'],
                    cwd: SRC + 'assets/sass',
                    dest: SRC + 'assets/css',
                    ext: '.css'
                }]
            }
        },
        scriptlinker: {
            options: {
                fileTmpl: '<script src="%s"></script>',
                appRoot: DIST
            },
            modernizr: {
                options: {
                    startTag: '<!--MODERNIZR-->',
                    endTag: '<!--MODERNIZR END-->'
                },
                files: {
                    'dist/index.html': [
                        DIST + 'assets/js/modernizr.js'
                    ]
                }
            },
            scripts: {
                options: {
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->'
                }
            },
            dev:{
                files: {
                    'dist/index.html': [

                        DIST + 'app/vendor/angular/**/*.js',
                        DIST + 'app/vendor/**/*.js',
                        DIST + 'app/*.js',
                        DIST + 'app/modules/**/*.js',
                        DIST + 'app/app.templates.js'
                    ]
                }
            },
            build: {
                files: {
                    'dist/index.html': [
                        DIST + 'assets/js/script.js',
                        DIST + 'assets/js/**/*.js',
                        '!' + DIST + 'assets/js/modernizr.js'
                    ]
                }
                }
        },

        // minify our javascript
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd | hh:MM") %> */\n',
                sourceMap: 'dist/assets/js/script.min.js.map',
                sourceMappingURL: '/assets/js/script.min.js.map',
                sourceMapIncludeSources : true,
                mangle: false
            },
            build: {
                files: {
                    'dist/assets/js/modernizr.js': [
                        SRC + 'app/vendor/modernizr/modernizr.js',
                        SRC + 'app/vendor/modernizr/**/*.js'
                    ],
                    'dist/assets/js/script.js': [
                        SRC + 'app/vendor/angular/1.2.14/angular.min.js',
                        SRC + 'app/vendor/angular/**/*.js',
                        SRC + 'app/vendor/*.js',
                        SRC + 'app/**/*.js'
                    ]
                }
            }
        },

        /*
        * compile partials into a single javascript file and make it available to Angular via $templateCache.
        * */
        ngtemplates:  {
            dev:  {
                cwd : SRC,
                src:    'app/**/*.html',
                dest:     DIST + 'app/app.templates.js',

                options: {
                    module : 'app',
                    url: function(url) {
                        return url.replace('app/modules/', '');
                    }
                }
            },
            build:  {
                cwd : SRC,
                src:    'app/**/*.html',
                dest:     DIST + 'assets/js/app.templates.js',

                options: {
                    module : 'app',
                    url: function(url) {
                        return url.replace('app/modules/', '');
                    }
                }
            }
        },

        // different watch options trigger different tasks
        watch: {
            options: {
                livereload: true
            },
            fonts: {
                expand: true,
                files: [SRC + 'assets/fonts/**'],
                tasks: ['newer:copy:fonts']
            },
            gruntfile: {
                expand: true,
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile', 'clean', 'jshint', 'newer:sass:dev', 'copy', 'ngtemplates', 'scriptlinker']
            },
            html: {
                expand: true,
                files: SRC + '**/*.html',
                tasks: ['newer:copy:html', 'scriptlinker']
            },
            images: {
                expand: true,
                files: [SRC + 'assets/img/**/*.{gif,jpg,png}'],
                tasks: ['newer:copy:images']
            },
            json: {
                expand: true,
                files: [SRC + 'assets/data/**/*.json'],
                tasks: ['newer:copy:json']
            },
            sass: {
                expand: true,
                files: [SRC + '**/*.scss'],
                tasks: ['sass:dev', 'copy:styles']
            },
            scripts: {
                expand: true,
                files: [SRC + 'app/**/*.js'],
                tasks: ['newer:jshint', 'newer:copy:scripts', 'scriptlinker']
            }
        }

    });


    /* MODULES =-=-=-=-=-=-=-=-=-=-=-=-=-=- */

    // load every plugin in package.json
    require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-notify');

    /* TASKS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

    grunt.registerTask('run', ['connect:dev', 'watch']);

    grunt.registerTask('dev', ['clean', 'jshint', 'sass:dev', 'copy','ngtemplates:dev', 'scriptlinker:dev', 'run']);
    grunt.registerTask('build', ['clean', 'jshint', 'sass:prod','copy:fonts', 'copy:html', 'copy:images', 'copy:json','copy:styles', 'ngtemplates:build', 'uglify','scriptlinker:modernizr','scriptlinker:build', 'connect:build']);

    grunt.registerTask('default', ['dev']);

};