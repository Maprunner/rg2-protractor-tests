describe('RG2 Manager 5', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');
  var draw = require('../page/draw.page.js');

  var btnDrawCourses = element(by.id('btn-draw-courses'));
  var btnNoResults = element(by.id('btn-no-results'));
  
  it('should allow you to log on as manager', function() {
 		manager.startManager();
 		manager.login();
  });

	it('should upload a map in GIF format', function() {
  	manager.showMapTab();
	  element(by.id('rg2-map-name')).sendKeys('London Colney protractor test');
	  element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/data/londoncolney.gif');
	  manager.addMap();
		rg2.acknowledgeWarning('has been added');
	});
	
	// need to log on again to flush new map out of system
	// possible bug for later
  it('should allow you to log on as manager', function() {
 		manager.startManager();
 		manager.login();
  });

	it('should create Event 5-01: no results: no courses: not georef', function() {
  	manager.showCreateTab();
    btnDrawCourses.click();
		rg2.acknowledgeWarning();
    element(by.id('rg2-event-name')).sendKeys('Event 5-01: London Colney');
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    manager.enterClubName('HH');
    manager.enterDate('2015-05-01');
    manager.enterLevel(2);
    btnNoResults.click();
	  element(by.id('rg2-event-comments')).sendKeys('no course file, no results, not georeferenced');
    btnDrawCourses.click();
    element(by.id('rg2-new-course-name')).clear().sendKeys('45 minute score');
    browser.actions().mouseMove(rg2.map).click().perform();
    browser.actions().mouseMove(rg2.map).click().perform();
		manager.createEvent();
		rg2.acknowledgeWarning('has been added');
	});

  it('should load the event just created', function() {
    rg2.loadRG2();
    rg2.getNewestEvent();
    rg2.checkTitle('Event 5-01: London Colney 2015-05-01');
  });

  it('should show and hide the about dialog with event info', function() {
    rg2.showAboutDialog();
    expect(element(by.id('rg2-event-stats')).getText()).toContain('no course file, no results, not georeferenced');
    rg2.hideAboutDialog();
  });

   it('should allow you to add your details', function() {
    draw.showDrawTab();
    draw.courses.get(1).click();
    draw.enterName('London Colney test runner');
    draw.enterTime('10:01');
  });
  
  it('should allow you to upload a GPX file', function() {
    draw.loadGPSFile(rg2.dir + '/test/data/verulamium.gpx');
    draw.saveGPSRoute();
    rg2.acknowledgeWarning("Your route has been saved.");
  });

});
