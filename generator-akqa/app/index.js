'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var projectTypes = { // These 'name's should match the folder names within the app/templates/ folder
        STATIC_WEB_SITE: {
            value: 'static-web-site',
            name: 'Static Web Site'
        },
        WEB_APPLICATION: {
            value: 'web-application',
            name: 'Web Application'
        },
        ADOBE_AEM_CQ: {
            value: 'adobe-aem-cq',
            name: 'Adobe AEM/CQ Site'
        },
        MICROSOFT_ASP_NET: {
            value: 'microsoft-asp-net',
            name: 'Microsoft ASP.NET Site'
        },
        ADOBE_PHONEGAP: {
            value: 'adobe-phonegap',
            name: 'Adobe PhoneGap Mobile App'
        },
        PHP_LARAVEL: {
          value: 'php-laravel',
          name: 'PHP Laravel Site'
        },
        WEB_COMPONENT: {
            value: 'web-component',
            name: 'Reusable Web Component'
        }
    },
    libraries = {
        STATIC_WEB_SITE: {
            REQUIRE_JS: {
                value: 'require_js',
                name: 'RequireJS (AMD)'
            },
            BROWSERIFY: {
                value: 'browserify',
                name: 'Browserify (AMD)'
            },
            ASSEMBLE: {
                value: 'assemble',
                name: 'Assemble'
            },
            SUSYGRID: {
              value: 'susygrid',
              name: 'Susy Grid'
            }
        },

        'default': {
            REQUIRE_JS: {
                value: 'require_js',
                name: 'RequireJS (AMD)'
            },
            BROWSERIFY: {
                value: 'browserify',
                name: 'Browserify (AMD)'
            }
        }

    };


var AkqaGenerator = yeoman.generators.Base.extend({
  init: function () {
    var that = this;
    this.pkg = require('../package.json');

    this.on('end', function () {
          if (!this.options['skip-install']) {
              this.installDependencies({
                  skipMessage: true,
                  callback: function () {
                      that.log();
                      that.log();
                      that.log.ok('Project generated and dependencies installed');
                      that.log();
                      that.log('To run the project, type ' + chalk.bold('grunt dev'));
                      that.log();
                      that.log('To run a web server, type ' + chalk.bold('grunt server'));
                  }
              });
          }
      });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the AKQA Generator'));

    var prompts = [{
      name: 'clientName',
      message: 'What is the client name?'
    }, {
      name: 'projectName',
      message: 'What is the Project name?'
    }, {
      type: 'input',
      name: 'projectDescription',
      message: 'Provide a brief description for the project'
    }, {
      type: 'list',
      name: 'projectType',
      message: 'What type of project are you building?',
      choices: (function () {
            var arr = [],
                projectKey;

            for (projectKey in projectTypes) {
                if (projectTypes.hasOwnProperty(projectKey)) {
                    arr.push({
                        name: projectTypes[projectKey].name,
                        value: projectTypes[projectKey].value
                    });
                }
            }

            return arr;
        }())
    },{
      when: function (answers) {
            return answers.projectType.indexOf(projectTypes.STATIC_WEB_SITE.value) !== -1;
      },
      type: 'checkbox',
      name: 'additionalLibraries',
      message: 'What additional supported libraries do you require?',
      choices: (function () {
            var arr = [],
                list = libraries.STATIC_WEB_SITE,
                libraryKey;

            for (libraryKey in list) {
                if (list.hasOwnProperty(libraryKey)) {
                    arr.push({
                        name: list[libraryKey].name,
                        value: list[libraryKey].value,
                        checked: false
                    });
                }
            }

            return arr;
        }())
    },{
      type: 'confirm',
      name: 'includeStyleGuide',
      message: 'Do you require a style guide?',
      default: false 
    }];

    this.prompt(prompts, function (props) {

      // Project meta data
      this.clientName = props.clientName;
      this.projectName = props.projectName;
      this.projectDescription = props.projectDescription;

      // Project Type
      this.projectType = props.projectType;

      // Style Guide dependencies
      this.includeStyleGuide = props.includeStyleGuide;

      // Library dependencies
      this.additionalLibraries = props.additionalLibraries;

      done();
    }.bind(this));
  },

  app: function () {
    switch (this.projectType) {
        case projectTypes.STATIC_WEB_SITE.value: {
                
                this.directory(this.projectType);

                if(this.includeStyleGuide) {
                  this.directory('style-guide');
                }
                
            }
            break;

        case projectTypes.WEB_APPLICATION.value: {

                this.directory(this.projectType);

            }
            break;

        case projectTypes.ADOBE_AEM_CQ.value: {
            }
            break;

        case projectTypes.MICROSOFT_ASP_NET.value: {
            }
            break;

        case projectTypes.ADOBE_PHONEGAP.value: {
            }
            break;

        case projectTypes.WEB_COMPONENT.value: {
                this.copy(this.projectType + '/_bower.json', 'bower.json');
            }
            break;
        }

    

    this.copy('_.gitignore', '.gitignore');

    this.copy('_.bowerrc', '.bowerrc');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');

  },

  projectfiles: function () {
    this.copy('_Gemfile', 'Gemfile');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_CHANGELOG.md', 'CHANGELOG.md');
  },

  prepareAssemble: function() {

  },

  prepareStaticSite: function() {

  },

  prepareCQSite: function() {

  },

  prepareNetSite: function() {

  },

});

module.exports = AkqaGenerator;
