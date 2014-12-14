describe('RG2 Manager 2', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');

  var btnCreateEvent = element(by.id('btn-create-event'));
  
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
	  element(by.id('rg2-map-name')).sendKeys('Ellenbrook protractor test map georef');
	  element(by.id('rg2-load-map-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrook.jpg');
	  element(by.id('rg2-load-georef-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrook.jgw');
	  manager.addMap();
		rg2.acknowledgeWarning("has been added");
	});

	it('should create Event 2: CSV results: IOF V3 courses: georef', function() {
  	manager.showCreateTab();
    element(by.id('rg2-event-name')).sendKeys('Event 2: Ellenbrook');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    element(by.id('rg2-club-name')).sendKeys('HH');
    element(by.id('rg2-event-date')).sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
	  element(by.id('rg2-event-comments')).sendKeys('IOF V3 course file, CSV results, georeferenced');
	  element(by.id('rg2-load-course-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrookIOFV3courses.xml');
	  // missing data: error reported
	  btnCreateEvent.click();
		rg2.acknowledgeWarning();
		// read spklasse results
	  element(by.id('rg2-load-results-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/spklasse.csv');
		// change to SI csv results
	  element(by.id('rg2-load-results-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrook.csv');
	  element(by.id('rg2-alloc-0')).all(by.css('option')).get(4).click();
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

});
