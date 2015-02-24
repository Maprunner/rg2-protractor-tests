describe('RG2 Manager 2', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');
  
  it('should reject an invalid password', function() {
 		manager.startManager();
	  // wrong password: error reported
 		manager.login('hhhhh', '12345');
		rg2.acknowledgeWarning("Login failed");
	 	});

  it('should allow you to log on as manager', function() {
 		manager.login();
  });

	it('should upload a georeferenced map', function() {
		manager.showMapTab();
	  element(by.id('rg2-map-name')).clear().sendKeys('Ellenbrook protractor test map georef');
	  element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.jpg');
	  element(by.id('rg2-load-georef-file')).sendKeys(rg2.dir + '/test/data/ellenbrookinvalid.jgw');
	  element(by.id('rg2-load-georef-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.jgw');
	  manager.addMap();
		rg2.acknowledgeWarning("has been added");
	});

  it('should warn if the course file does not match map georeference', function() {
    manager.showCreateTab();
    element(by.id('rg2-event-name')).clear().sendKeys('Event 2-01: Ellenbrook');
    element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    manager.enterClubName('HH');
    manager.enterDate('2015-02-01');
    manager.enterLevel(4);
    element(by.id('rg2-event-comments')).clear().sendKeys('IOF V3 Condes course file, CSV results, georeferenced');
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/heartwoodIOFV3Georefcourses.xml');
    rg2.acknowledgeWarning("Your course file does not match the map co-ordinates. ");
    manager.acknowledgeCourseInfo();
  });

	it('should accept IOF V3 Condes georef courses', function() {
	  element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV3courses.xml');
		manager.acknowledgeCourseInfo();
  });

  it('should accept a spklasse results file', function() {
	  // missing data: error reported
    manager.createEvent("No results information");
		// read spklasse results
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/spklasse.csv');
	  manager.acknowledgeResultInfo();
  });

  it('should create Event 2-01: CSV results: IOF V3 Condes courses: georef', function() {
		// change to SI csv results
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.csv');
	  manager.acknowledgeResultInfo();
    manager.enterLevel(3);
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

  it('should accept IOF V2 georef courses', function() {
    manager.showCreateTab();
    element(by.id('rg2-event-name')).clear().sendKeys('Event 2-02: Ellenbrook');
    element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    manager.enterClubName('HH');
    manager.enterDate('2015-02-02');
    manager.enterLevel(2);
    element(by.id('rg2-event-comments')).clear().sendKeys('IOF V2 course file, CSV results, georeferenced');
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV2Georefcourses.xml');
    manager.acknowledgeCourseInfo();
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/miltonriggIOFV2results.xml');
    manager.acknowledgeResultInfo();
    manager.createEvent();
    rg2.acknowledgeWarning('has been added');
  });

  it('should accept IOF V3 OCAD georef courses', function() {
    manager.showCreateTab();
    element(by.id('rg2-event-name')).clear().sendKeys('Event 2-03: Ellenbrook');
    element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    manager.enterClubName('HH');
    manager.enterDate('2015-02-03');
    manager.enterLevel(2);
    element(by.id('rg2-event-comments')).clear().sendKeys('IOF V3 OCAD course file, CSV results, georeferenced');
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV3OCADcourses.xml');
    manager.acknowledgeCourseInfo();
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.csv');
    manager.acknowledgeResultInfo();
    manager.createEvent();
    rg2.acknowledgeWarning('has been added');
  });
});
