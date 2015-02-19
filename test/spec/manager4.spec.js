describe('RG2 Manager 4', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');
    
  it('should allow you to log on as manager', function() {
 		manager.startManager();
 		manager.login();
  });
  
	it('should report invalid results file type', function() {
  	manager.showCreateTab();
    element(by.id('rg2-event-name')).sendKeys('Event 4A: Ellenbrook with Milton Rigg results');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(2).click();
    element(by.id('rg2-club-name')).sendKeys('HH');
    element(by.id('rg2-event-date')).sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
    element(by.id('rg2-event-comments')).sendKeys('IOF V3 course file, IOF V2 results, not georeferenced');
	  element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV3courses.xml');
	  manager.acknowledgeCourseInfo();
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/verulamium.gpx');
		rg2.acknowledgeWarning('Results file type is not recognised');
	});
	
	it('should report invalid results file version', function() {
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV1results.xml');
		rg2.acknowledgeWarning('Invalid IOF file format');
	});

	it('should report results XML parse error', function() {
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/IOFV2resultsparseerror.xml');
		rg2.acknowledgeWarning('Error processing XML file');
	});

	it('should create Event 4A: IOF V2 results: IOF V3 courses: not georef', function() {
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV2results.xml');
		manager.acknowledgeResultInfo();
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

	it('should set up Event 4B: IOF V2 results: IOF V3 courses: not georef', function() {
  	manager.showCreateTab();
    element(by.id('rg2-event-name')).clear().sendKeys('Event 4B: Ellenbrook with Milton Rigg results');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(2).click();
    element(by.id('rg2-club-name')).clear().sendKeys('HH');
    element(by.id('rg2-event-date')).clear().sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
    // no comments for this event
	});

	it('should add courses for Event 4B: IOF V2 results: IOF V3 courses: not georef', function() {
	  element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV3coursesnogeoref.xml');
	  manager.acknowledgeCourseInfo();
	});

	it('should report invalid results for Event 4B: IOF V2 results: IOF V3 courses: not georef', function() {
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/IOFV3resultsparseerror.xml');
		rg2.acknowledgeWarning('Error processing XML file');
	});

  it('should report a missing ResultList in XML results', function() {
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV2invalidresults.xml');
    rg2.acknowledgeWarning('ResultList element missing.');
  });
  
	it('should add results for Event 4B: IOF V2 results: IOF V3 courses: not georef', function() {
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV3results.xml');
		manager.acknowledgeResultInfo();
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

});
