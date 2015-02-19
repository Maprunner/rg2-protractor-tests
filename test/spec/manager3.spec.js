describe('RG2 Manager 3', function() {
	var rg2 = require('../page/rg2.page.js');
	var manager = require('../page/manager.page.js');
	
  var btnScoreEvent = element(by.id('btn-score-event'));

  it('should allow you to log on as manager', function() {
 		manager.startManager();
 		manager.login();
  });

	it('should upload a georeferenced map', function() {
	  manager.showMapTab();
	  element(by.id('rg2-map-name')).sendKeys('Pwll Ddu protractor test map georef');
	  element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/data/pwllddu.jpg');
	  element(by.id('rg2-load-georef-file')).sendKeys(rg2.dir + '/test/data/pwllddu.jgw');
	  manager.addMap();
		rg2.acknowledgeWarning("has been added");
	});

	it('should create Event 3: CSV results: IOF V3 relay courses: georef', function() {
  	manager.showCreateTab();
    element(by.id('rg2-event-name')).sendKeys('Event 3: Pwll Ddu');
    // select invalid map id
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(0).click();
	  // select valid map id
	  element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    element(by.id('rg2-club-name')).sendKeys('HH');
    element(by.id('rg2-event-date')).sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
    btnScoreEvent.click();
	  element(by.id('rg2-event-comments')).sendKeys('IOF V3 relay course file, CSV results, georeferenced');
	  element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/pwlldduIOFV3relay.xml');
	  manager.acknowledgeCourseInfo();
	  element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/pwllddu.csv');
	  manager.acknowledgeResultInfo();
		manager.createEvent();
		rg2.acknowledgeWarning("has been added");
	});

});
