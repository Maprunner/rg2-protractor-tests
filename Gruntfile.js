module.exports = function(grunt) {
  var jsInstrumentList = ['../rg2/js/rg2.js', '../rg2/js/animation.js', '../rg2/js/controls.js', '../rg2/js/courses.js', '../rg2/js/draw.js', '../rg2/js/events.js', '../rg2/js/gpstrack.js',
   '../rg2/js/results.js', '../rg2/js/runner.js', '../rg2/js/manager.js'];
   
  var jsDoNotInstrumentList = ['../rg2/rg2api.php', '../rg2/index.php', '../rg2/js/plugins.js', '../rg2/js/lib/he.js', '../rg2/js/lib/proj4js-compressed.js', '../rg2/lang/*.txt',
    '../rg2/html/*.html', '../rg2/css/*.css', '../rg2/lang/*.txt', '../rg2/img/*.*'];
  
  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

   clean: {
			tests: [
			'test/coverage', 
			'test/report'],
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

  grunt.registerTask('test', ['clean:tests', 'instrument', 'sync:rg2Source', 'sync:config', 'connect', 'protractor_coverage:rg2', 'makeReport']);

};
