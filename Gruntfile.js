module.exports = function(grunt) {
  var jsInstrumentList = ['../rg2/js/rg2.js', '../rg2/js/animation.js', '../rg2/js/controls.js', '../rg2/js/courses.js', '../rg2/js/draw.js', '../rg2/js/events.js', '../rg2/js/gpstrack.js',
   '../rg2/js/results.js', '../rg2/js/runner.js', '../rg2/js/manager.js', '../rg2/js/control.js', '../rg2/js/course.js', '../rg2/js/event.js', '../rg2/js/map.js', '../rg2/js/result.js',
   '../rg2/js/utils.js'];
   
  var jsDoNotInstrumentList = ['../rg2/rg2api.php', '../rg2/index.php', '../rg2/js/plugins.js', '../rg2/js/lib/he.js', '../rg2/js/lib/proj4js-compressed.js',
    '../rg2/html/*.html', '../rg2/css/*.css', '../rg2/lang/*.txt', '../rg2/img/*.*'];
  
  var kartatFiles = ['test/kartat/kisat.txt',
  										'test/kartat/kartat.txt',
  										'test/kartat/*_172.txt', 'test/kartat/181.jpg',
  										'test/kartat/*_168.txt', 'test/kartat/177.jpg',
  										'test/kartat/*_157.txt', 'test/kartat/165.jpg',
  										'test/kartat/*_155.txt', 'test/kartat/163.jpg',
  										'test/kartat/*_153.txt', 'test/kartat/161.jpg',
                      'test/kartat/*_132.txt', 'test/kartat/132.jpg',
  										'test/kartat/*_128.txt', 'test/kartat/125.jpg',
  										'test/kartat/*_110.txt', 'test/kartat/111.jpg',
  										'test/kartat/*_72.txt', 'test/kartat/72.jpg',
  										'test/kartat/*_1.txt', 'test/kartat/1.jpg',
  										'test/kartat/rg2userinfo.txt'
  										];
  
  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

   clean: {
			tests: [
			'test/coverage', 
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
// html
    options: {type: 'html', dir: 'test/rg2', print: 'detail'}
// lcov
    //options: {type: 'lcov', dir: 'test/coverage', print: 'detail'}
  }
});

  // Load all the grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['test']);

  grunt.registerTask('test', ['clean:tests', 'clean:instrumented', 'instrument', 'sync:rg2Source', 'sync:config', 'sync:kartat', 'connect', 'protractor_coverage:rg2', 'makeReport']);

};
