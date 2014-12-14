describe('RG2 Manager 5', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');

  var btnDrawCourses = element(by.id('btn-draw-courses'));
  var btnNoResults = element(by.id('btn-no-results'));
  var btnScoreEvent = element(by.id('btn-score-event'));
  
  it('should allow you to log on as manager', function() {
 		manager.startManager();
 		manager.login();
  });

	it('should upload a map in GIF format', function() {
  	manager.showMapTab();
	  element(by.id('rg2-map-name')).sendKeys('London Colney protractor test');
	  element(by.id('rg2-load-map-file')).sendKeys('c:/xampp/htdocs/rg2-test-data/test/data/londoncolney.gif');
	  manager.addMap();
		rg2.acknowledgeWarning('has been added');
	});
	
	// need to log on again to flush new map out of system
	// possible bug for later
  it('should allow you to log on as manager', function() {
 		manager.startManager();
 		manager.login();
  });

	it('should create Event 5: no results: no courses: not georef', function() {
  	manager.showCreateTab();
    btnDrawCourses.click();
		rg2.acknowledgeWarning();
    element(by.id('rg2-event-name')).sendKeys('Event 5: London Colney');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    element(by.id('rg2-club-name')).sendKeys('HH');
    element(by.id('rg2-event-date')).sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
    element(by.id('rg2-event-level')).all(by.css('option')).get(2).click();
    btnNoResults.click();
	  element(by.id('rg2-event-comments')).sendKeys('no course file, no results, not georeferenced');
    btnDrawCourses.click();
    element(by.id('rg2-new-course-name')).clear().sendKeys('45 minute score');
    browser.actions().mouseMove(rg2.map).click().perform();
    browser.actions().mouseMove(rg2.map).click().perform();
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

  it('should show and hide the about dialog with event info', function() {
    rg2.showAboutDialog();
    rg2.hideAboutDialog();
  });

});
