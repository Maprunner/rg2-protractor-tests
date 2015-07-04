describe('RG2', function() {
	var rg2 = require('../page/rg2.page.js');
	var course = require('../page/course.page.js');
  var result = require('../page/result.page.js');
  var cbxTrackList = element.all(by.css('.tracklist'));
  var cbxShowTrack = element.all(by.css('.showtrack'));
  var cbxShowReplay = element.all(by.css('.showreplay'));
  var cbxShowScoreCourse = element.all(by.css('.showscorecourse'));

  it('should load RG2', function() {
  	rg2.loadRG2();
  });

  it('should show and hide the about dialog with no event selected', function() {
    rg2.showAboutDialog();
    expect(element(by.id('rg2-about-dialog')).getText()).toContain('Routegadget 2 (RG2)');
    expect(element(by.id('rg2-about-dialog')).getText()).not.toContain('Event statistics');
    rg2.hideAboutDialog();
  });

  it('should select a Mardley Heath normal event', function() {
    rg2.getEvent('143');
    // pause to allow touch drag, pinch zoom and mouse wheel scroll manual input
    browser.sleep(15000);
    rg2.showAboutDialog();
    expect(element(by.id('rg2-event-stats')).getText()).toContain('SEOA Middle Champs: Mardley Heath: 2014-04-27');
    rg2.hideAboutDialog();
  });

  it('should toggle controls on and off', function() {
    rg2.toggleControls();
    rg2.toggleControls();

  });  

  it('should display and hide the info panel', function() {
    rg2.hideInfoPanel();
		rg2.showInfoPanel();
		rg2.resizeHideInfoPanel();
    rg2.resizeShowInfoPanel();
  });
  
  it('should zoom in and out', function() {
    rg2.zoomIn();
    rg2.zoomIn();
    rg2.zoomOut();
    rg2.resetZoom();

  });  

  it('should ignore a right click', function() {
    browser.actions().click(rg2.map, protractor.Button.RIGHT).perform();
  });
  
  it('should allow the map to be dragged', function() {
    browser.actions().
      dragAndDrop(rg2.map, {x: 100, y: 100}).
      perform();
  });
  
  it('should display and hide a course', function() {
    course.showCoursesTab();
    course.list.first().click();
    course.list.get(3).click();
    course.list.get(3).click();
    course.list.first().click();
  });
  
  it('should display and hide all courses', function() {
    course.showAllCourses();
    course.hideAllCourses();
 });
  
  it('should display and hide a route', function() {  
    expect(rg2.trackNames.isDisplayed()).toBe(false);
    cbxTrackList.first().click();
    expect(rg2.trackNames.isDisplayed()).toBe(true);
    cbxTrackList.get(3).click();
    cbxTrackList.first().click();
    cbxTrackList.get(3).click();
    expect(rg2.trackNames.isDisplayed()).toBe(false);

  });  
  
  it('should display and hide all routes for a course', function() {
    expect(rg2.trackNames.isDisplayed()).toBe(false);
    cbxTrackList.last().click();
    expect(rg2.trackNames.isDisplayed()).toBe(true);
    cbxTrackList.last().click();
    expect(rg2.trackNames.isDisplayed()).toBe(false);
  });

  it('should display and hide all routes for all courses', function() {
    expect(rg2.trackNames.isDisplayed()).toBe(false);
    element.all(by.css('.alltracks')).first().click();
    expect(rg2.trackNames.isDisplayed()).toBe(true);
    element.all(by.css('.alltracks')).first().click();
    expect(rg2.trackNames.isDisplayed()).toBe(false);
  });

  it('should load a Highfield event and show a course and routes', function() {
  	rg2.loadRG2('#128&course=4&route=48,74');
    expect(rg2.trackNames.isDisplayed()).toBe(true);
    rg2.zoomIn();
    rg2.zoomIn();
  });

  it('should show the configuration dialog', function() {
		rg2.showOptionsDialog();
  });

  it('should set the map intensity', function() {
		rg2.spin('map intensity', '-');
		rg2.spin('map intensity', '+');
		rg2.spin('map intensity', 0);
		rg2.spin('map intensity', 100);
  });

  it('should set the route intensity', function() {
		rg2.spin('route intensity', '-');
		rg2.spin('route intensity', '+');
		rg2.spin('route intensity', 0);
		rg2.spin('route intensity', 100);
  });

  it('should set the route width', function() {
		rg2.spin('route width', '-');
		rg2.spin('route width', '+');
		rg2.spin('route width', 1);
		rg2.spin('route width', 10);
    rg2.spin('route width', 4.5);
  });
  
  it('should set the font size', function() {
		rg2.spin('font', '-');
		rg2.spin('font', '+');
		rg2.spin('font', 5);
		rg2.spin('font', 30);
    rg2.spin('font', 13);
  });
  
  it('should set the course width', function() {
		rg2.spin('course width', '-');
		rg2.spin('course width', '+');
		rg2.spin('course width', 1);
		rg2.spin('course width', 10);
    rg2.spin('course width', 3.5);
  });

  it('should set the control size', function() {
		rg2.spin('control size', '-');
		rg2.spin('control size', '+');
		rg2.spin('control size', 3);
		rg2.spin('control size', 50);
    rg2.spin('control size', 21);
  });
    
    
  it('should toggle other options', function() {
		rg2.showGPSSpeed();
		rg2.showThreeSeconds();
		rg2.snap();
		rg2.showGPSSpeed();
		rg2.showThreeSeconds();
		rg2.snap();
  });

  it('should change language', function() {
    // started in English
    expect(element(by.css('.rg2-options-dialog')).element(by.css('.ui-dialog-title')).getText()).toEqual('Configuration options');
    // select German
    rg2.languages.get(1).click();
    browser.sleep(1000);
    expect(element(by.css('.rg2-options-dialog')).element(by.css('.ui-dialog-title')).getText()).toEqual('Konfigurations-Optionen');
    // select English
    rg2.languages.get(0).click();
    browser.sleep(1000);
    expect(element(by.css('.rg2-options-dialog')).element(by.css('.ui-dialog-title')).getText()).toEqual('Configuration options');
    // select current language so nothing changes
    rg2.languages.get(0).click();
    expect(element(by.css('.rg2-options-dialog')).element(by.css('.ui-dialog-title')).getText()).toEqual('Configuration options');
  });

  it('should hide the configuration dialog', function() {
		rg2.hideOptionsDialog();
  });

  it('should allow the window to be resized', function() {
  	rg2.checkTitle('Highfield Park Saturday League 2013-06-01');
  	browser.manage().window().setSize(750, 500);
    rg2.hideInfoPanel();
    rg2.showInfoPanel();
    rg2.resizeHideInfoPanel();
    rg2.resizeShowInfoPanel();
 		rg2.checkTitle('Highfield Park Saturday League');
 		browser.manage().window().setSize(480, 360);
  	rg2.checkTitle('');
    rg2.hideInfoPanel();
    rg2.showInfoPanel();
    rg2.resizeHideInfoPanel();
    rg2.resizeShowInfoPanel();
  	browser.manage().window().setSize(1024, 768);
  	rg2.checkTitle('Highfield Park Saturday League 2013-06-01');
    rg2.hideInfoPanel();
    rg2.showInfoPanel();
    rg2.resizeHideInfoPanel();
    rg2.resizeShowInfoPanel();
  });

  it('should start up in Norwegian', function() {
    rg2.loadRG2("?lang=no");
    rg2.showOptionsDialog();
    expect(element(by.css('.rg2-options-dialog')).element(by.css('.ui-dialog-title')).getText()).toEqual('Brukervalg');
  });

  it('should start up in French', function() {
    rg2.loadRG2("?lang=fr");
    rg2.showOptionsDialog();
    expect(element(by.css('.rg2-options-dialog')).element(by.css('.ui-dialog-title')).getText()).toEqual('Options de configuration');
  });

  it('should set the map intensity to 0%', function() {
    rg2.spin('map intensity', 0);
    rg2.hideOptionsDialog();
  });

  it('should select a Trent Park score event and warn about 0% map intensity', function() {
    rg2.loadRG2('#153');
    rg2.acknowledgeWarning('Your saved settings have 0% map intensity so the map is invisible.');
    rg2.showOptionsDialog();
    rg2.spin('map intensity', 100);
    rg2.hideOptionsDialog();
  });

  it('should show the Trent Park about dialog', function() {
    rg2.showAboutDialog();
    expect(element(by.id('rg2-event-stats')).getText()).toContain('Boxing Day Score: Trent Park: 2013-12-26');
    rg2.hideAboutDialog();
  });

  it('should show an individual score course', function() {
    result.showResultsTab();
    result.openResultsList(0);
    expect(rg2.trackNames.isDisplayed()).toBe(false);
    cbxShowScoreCourse.first().click();
  });
});