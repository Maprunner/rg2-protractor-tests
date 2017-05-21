describe('RG2 Manager 4', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');

  it('should allow you to log on as manager', function() {
 		manager.startManager();
 		manager.login();
    manager.showCreateTab();
  });

  it('should not allow you to load results with no map', function() {
    element(by.id('rg2-load-results-file')).click();
    rg2.acknowledgeWarning("Please load a map file before adding results.");
  });

  it('should not allow you to load courses with no map', function() {
    element(by.id('rg2-load-course-file')).click();
    rg2.acknowledgeWarning("Please load a map file before adding courses.");
  });

  it('should load a map and world file', function() {
    manager.showMapTab();
    element(by.id('rg2-map-name')).clear().sendKeys('Ellenbrook protractor test map georef');
    element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.jpg');
    element(by.id('rg2-load-georef-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.jgw');
    manager.addMap();
    rg2.acknowledgeWarning("has been added");
  });

	it('should start creating an event', function() {
    manager.showCreateTab();
    element(by.id('rg2-event-name')).sendKeys('Event 4-01: Ellenbrook with Milton Rigg results');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    manager.enterClubName('HH');
    manager.enterDate('2015-04-01');
    manager.enterLevel(3);
    element(by.id('rg2-event-comments')).sendKeys('IOF V3 course file, IOF V2 results, not georeferenced');
	  element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV3courses.xml');
	  manager.acknowledgeCourseInfo();
  });

  it('should report invalid results file type', function() {
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

	it('should create Event 4-01: IOF V2 results: IOF V3 courses: not georef', function() {
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV2results.xml');
		manager.acknowledgeResultInfo();
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

	it('should set up Event 4-02: IOF V2 results: IOF V3 courses: not georef', function() {
  	manager.showCreateTab();
    element(by.id('rg2-event-name')).clear().sendKeys('Event 4-02: Ellenbrook with Milton Rigg results');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    manager.enterClubName('HH');
    manager.enterDate('2015-04-02');
    manager.enterLevel(4);
    // no comments for this event
	});

	it('should add courses for Event 4-02', function() {
	  element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV3coursesnogeoref.xml');
	  manager.acknowledgeCourseInfo();
    // move controls a bit
    browser.actions().dragAndDrop(rg2.map, {x : 100, y : 100}).perform();
    // lock map and controls and try again
    manager.lockMap();
    browser.actions().dragAndDrop(rg2.map, {x : 30, y : 20}).perform();
	});

	it('should report invalid results', function() {
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/IOFV3resultsparseerror.xml');
		rg2.acknowledgeWarning('Error processing XML file');
	});

  it('should report a missing ResultList in XML results', function() {
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV2invalidresults.xml');
    rg2.acknowledgeWarning('ResultList element missing.');
		manager.acknowledgeResultInfo();
  });

	it('should add results for Event 4-02', function() {
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV3results.xml');
		manager.acknowledgeResultInfo();
    manager.enterClubName('HHOC');
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

});
