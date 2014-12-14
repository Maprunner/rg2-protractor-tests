describe('RG2 Manager 1', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');

  var btnMoveMapAndControls = element(by.id('btn-move-map-and-controls'));
  var btnCreateEvent = element(by.id('btn-create-event'));

  it('should show the login screen', function() {
 		manager.startManager();
 	});
 	
  it('should reject invalid user names and passwords', function() {
 		manager.login('', '');
	  // no user name or password: error reported
		rg2.acknowledgeWarning();

	  // user name too short: error reported
 		manager.login('abc', '');
		rg2.acknowledgeWarning();
		
	  // password too short: error reported
 		manager.login('hhhhh', 'xyz');
		rg2.acknowledgeWarning();
		
	});
 		
 	it('should allow a valid login', function() {
		manager.login();
  });

	it('should show the map tab', function() {
		manager.showMapTab();
	});
	
	it('should upload a non-georeferenced map', function() {
	  element(by.id('rg2-map-name')).sendKeys('Ellenbrook protractor test map non-georef');

	  element(by.id('rg2-load-map-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrook.xml');
 	  // invalid file type: error reported
		rg2.acknowledgeWarning();
	  
	  element(by.id('rg2-load-map-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrook.jpg');
	  manager.addMapCancel();
	  manager.addMap();
		rg2.acknowledgeWarning("has been added");

	});

	it('should report validation errors', function() {
  	manager.showCreateTab();

	  btnCreateEvent.click();
	  // missing data: error reported
		rg2.acknowledgeWarning("Event name is not valid");

    element(by.id('rg2-event-name')).sendKeys('Event 1: Ellenbrook');
	  btnCreateEvent.click();
	  // missing data: error reported
		rg2.acknowledgeWarning("No map selected");

	  element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
	  btnCreateEvent.click();
	  // missing data: error reported
		rg2.acknowledgeWarning("Club name is not valid");
		
    element(by.id('rg2-club-name')).sendKeys('HH');
	  btnCreateEvent.click();
	  // missing data: error reported
		rg2.acknowledgeWarning("Event date is not valid");
		
    element(by.id('rg2-event-date')).sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
	  btnCreateEvent.click();
	  // missing data: error reported
		rg2.acknowledgeWarning("Event level is not valid");

    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
	  // missing data: error reported
	  btnCreateEvent.click();
		rg2.acknowledgeWarning("No course information");

	  element(by.id('rg2-event-comments')).sendKeys('IOF V2 course file, CSV results.not georeferenced');

	  element(by.id('rg2-load-results-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/highfield.jpg');
	  // invalid file type: error reported
		rg2.acknowledgeWarning("Results file type is not recognised");

	  element(by.id('rg2-load-results-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrook.csv');
	  // missing data: error reported
	  btnCreateEvent.click();
		rg2.acknowledgeWarning();

	  element(by.id('rg2-load-course-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/highfield.jpg');
	  // invalid file type: error reported
		rg2.acknowledgeWarning("File is not a valid XML event file");

	  element(by.id('rg2-load-course-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrookIOFV1courses.xml');
		rg2.acknowledgeWarning('File is not a valid XML event file');
	  
	  element(by.id('rg2-load-course-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrookIOFV2courses.xml');
	  element(by.id('rg2-alloc-0')).all(by.css('option')).get(4).click();
	  
    // move controls a bit
    browser.actions().dragAndDrop(rg2.map, {x: 100, y: 100}).perform();
    // lock map and controls and try again
    btnMoveMapAndControls.click();
    browser.actions().dragAndDrop(rg2.map, {x: 30, y: 20}).perform();
	});

	it('should create Event 1: CSV results: IOF V2 courses: not georef', function() {
		manager.createEventCancel();
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

});
