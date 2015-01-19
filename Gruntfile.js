module.exports = function(grunt) {
  var jsInstrumentList = ['../rg2/js/rg2.js', '../rg2/js/animation.js', '../rg2/js/controls.js', '../rg2/js/courses.js', '../rg2/js/draw.js', '../rg2/js/events.js', '../rg2/js/gpstrack.js',
   '../rg2/js/results.js', '../rg2/js/runner.js', '../rg2/js/manager.js'];
   
  var jsDoNotInstrumentList = ['../rg2/rg2api.php', '../rg2/index.php', '../rg2/js/plugins.js', '../rg2/js/lib/he.js', '../rg2/js/lib/proj4js-compressed.js',
    '../rg2/html/*.html', '../rg2/css/*.css', '../rg2/lang/*.txt', '../rg2/img/*.*'];
  
  var kartatFiles = ['../rg2-test-data/hh/kartat/kisat.txt',
  										'../rg2-test-data/hh/kartat/kartat.txt',
  										'../rg2-test-data/hh/kartat/*_172.txt', '../rg2-test-data/hh/kartat/181.jpg',
  										'../rg2-test-data/hh/kartat/*_168.txt', '../rg2-test-data/hh/kartat/177.jpg',
  										'../rg2-test-data/hh/kartat/*_157.txt', '../rg2-test-data/hh/kartat/165.jpg',
  										'../rg2-test-data/hh/kartat/*_155.txt', '../rg2-test-data/hh/kartat/163.jpg',
  										'../rg2-test-data/hh/kartat/*_153.txt', '../rg2-test-data/hh/kartat/161.jpg',
  										'../rg2-test-data/hh/kartat/*_128.txt', '../rg2-test-data/hh/kartat/125.jpg',
  										'../rg2-test-data/hh/kartat/*_110.txt', '../rg2-test-data/hh/kartat/111.jpg',
  										'../rg2-test-data/hh/kartat/*_72.txt', '../rg2-test-data/hh/kartat/72.jpg',
  										'../rg2-test-data/hh/kartat/*_1.txt', '../rg2-test-data/hh/kartat/1.jpg'
  										];
  
  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

   clean: {
			tests: [
			'test/coverage', 
			'test/report',
			'kartat'],
			instrumented: [
			'instrumented/*.js']
		},

    connect: {
        options: {
            port: 9000,
            hostname: 'localhost',
            base: 'instrumented/rg2/'
        }
    },
    
    sync : {
    	rg2Source : {
        src : jsDoNotInstrumentList,
        dest : 'instrumented/rg2/'
       },
    	config : {
        src : 'test/config/*.php',
        dest : 'instrumented/rg2',
        expand: true,
        flatten: true
       },
    	kartat : {
        src : kartatFiles,
        dest : 'kartat/',
        expand: true,
        flatten: true
      }
    },

    instrument: {
        files: jsInstrumentList,
        options: {
          lazy: true,
          basePath: "instrumented/rg2/"
        }
    },
    
		protractor_coverage: {
    	options: {
      	keepAlive: true,
        noColor: false,
        args: {
        	baseUrl: 'http://localhost:9000'
        }
      },
      rg2: {
        options: {
       		coverageDir: 'test/coverage',
       		configFile: 'test/config/rg2-protractor-config.js'
        }
      }
  },
  
    makeReport: {
        src: 'test/coverage/*.json',
        options: {
            type: 'html',
            dir: 'test/report',
            print: 'detail'
        }
    }  
  });

  // Load all the grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['test']);

  grunt.registerTask('test', ['clean:tests', 'clean:instrumented', 'instrument', 'sync:rg2Source', 'sync:config', 'sync:kartat', 'connect', 'protractor_coverage:rg2', 'makeReport']);

};
