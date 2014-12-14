describe('RG2 Manager 4', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');
    
  it('should allow you to log on as manager', function() {
 		manager.startManager();
 		manager.login();
  });
  
	it('should create Event 4A: IOF V2 results: IOF V3 courses: not georef', function() {
  	manager.showCreateTab();
    element(by.id('rg2-event-name')).sendKeys('Event 4A: Ellenbrook with Milton Rigg results');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(2).click();
    element(by.id('rg2-club-name')).sendKeys('HH');
    element(by.id('rg2-event-date')).sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
    element(by.id('rg2-event-comments')).sendKeys('IOF V3 course file, IOF V2 results, not georeferenced');
	  element(by.id('rg2-load-course-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/miltonriggIOFV3courses.xml');
	  element(by.id('rg2-load-results-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/miltonriggIOFV1results.xml');
		rg2.acknowledgeWarning('Invalid IOF file format');
	  element(by.id('rg2-load-results-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/miltonriggIOFV2results.xml');
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

	it('should create Event 4B: IOF V2 results: IOF V3 courses: not georef', function() {
  	manager.showCreateTab();
    element(by.id('rg2-event-name')).clear().sendKeys('Event 4B: Ellenbrook with Milton Rigg results');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(2).click();
    element(by.id('rg2-club-name')).clear().sendKeys('HH');
    element(by.id('rg2-event-date')).clear().sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
    element(by.id('rg2-event-comments')).clear().sendKeys('IOF V3 course file, IOF V3 results, not georeferenced');
	  element(by.id('rg2-load-course-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/miltonriggIOFV3courses.xml');
	  element(by.id('rg2-load-results-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/miltonriggIOFV3results.xml');
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

});
