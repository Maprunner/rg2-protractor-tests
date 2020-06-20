module.exports = function(grunt) {
  var jsInstrumentList = ['../rg2/js/rg2.js', '../rg2/js/animation.js', '../rg2/js/config.js', '../rg2/js/controls.js',
   '../rg2/js/canvas.js', '../rg2/js/courses.js', '../rg2/js/draw.js', '../rg2/js/events.js', '../rg2/js/gpstrack.js',
   '../rg2/js/results.js', '../rg2/js/runner.js', '../rg2/js/manager.js', '../rg2/js/control.js', '../rg2/js/course.js',
   '../rg2/js/event.js', '../rg2/js/map.js', '../rg2/js/result.js', '../rg2/js/utils.js', '../rg2/js/handles.js', '../rg2/js/stats.js',
   '../rg2/js/resultparsercsv.js', '../rg2/js/resultparseriofv2.js', '../rg2/js/resultparseriofv3.js', '../rg2/js/resultparser.js',
   '../rg2/js/courseparser.js', '../rg2/js/managerui.js', '../rg2/js/rg2input.js', '../rg2/js/rg2getjson.js', '../rg2/js/rg2ui.js'];
   
  var jsDoNotInstrumentList = ['../rg2/rg2api.php', '../rg2/index.php', '../rg2/js/plugins.js', '../rg2/js/lib/he.js',
    '../rg2/js/lib/proj4js-compressed.js', '../rg2/html/*.html', '../rg2/css/*.css', '../rg2/lang/*.js', '../rg2/img/*.*', '../rg2/app/*.php'];
  
  var kartatFiles = ['kisat.txt',
  'kartat.txt', '*_172.txt', '181.jpg', '*_168.txt', '177.jpg', '*_157.txt', '165.jpg',
  '*_155.txt', '163.jpg', '*_153.txt', '161.jpg', '*_132.txt', '129.jpg', '*_128.txt', '125.jpg',
  '*_143.txt', '140.jpg', '*_110.txt', '111.jpg', 'rg2userinfo.txt'];
  
  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

   clean: {
	tests: [
	  'test/coverage', 
	  'instrumented/kartat'],
	instrumented: [
      'instrumented/*.php',
	  'instrumented/*.js']
	},

    connect: {
      server : {
        options: {
            port: 9000,
            hostname: 'localhost',
            base: 'instrumented/rg2/'
        }
      }
    },
    
    sync : {
    	rg2Source : {
        files: [{
          src : jsDoNotInstrumentList,
          dest : 'instrumented/rg2/'
        }],
        verbose: true,
        pretend: false, // Don't do any disk operations - just write log. Default: false
        failOnError: true, // Fail the task when copying is not possible. Default: false
        updateAndDelete: false
       },
    	config : {
        files: [{
          cwd: 'test/config',
          src : '*.php',
          dest : 'instrumented/rg2'
        }],
        verbose: true,
        pretend: false, // Don't do any disk operations - just write log. Default: false
        failOnError: true, // Fail the task when copying is not possible. Default: false
        updateAndDelete: false
        //expand: true,
        //flatten: true
       },
    	kartat : {
        files: [{
          cwd: 'test/kartat',
          src : kartatFiles,
          dest : 'instrumented/kartat/'
        }],verbose: true,
        pretend: false, // Don't do any disk operations - just write log. Default: false
        failOnError: true, // Fail the task when copying is not possible. Default: false
        updateAndDelete: false
        // expand: true,
        // flatten: true
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
        coverageDir: 'test/coverage',
        collectorPort: 3001,
        args: {
          baseUrl: 'http://localhost:9000'
        }
      },
      rg2: {
        options: {
       		configFile: 'test/config/rg2-protractor-config.js'
        }
      }
  },
  
  makeReport: {
    src: 'test/coverage/*.json',
// html
    //options: {type: 'html', dir: 'test/rg2', print: 'detail'}
// lcov
    options: {type: 'lcov', dir: 'test/coverage', print: 'detail'}
  }
});

  // Load all the grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['test']);

  grunt.registerTask('test', ['clean:tests', 'clean:instrumented', 'instrument', 'sync:rg2Source',
    'sync:config', 'sync:kartat', 'connect', 'protractor_coverage:rg2', 'makeReport']);
};
