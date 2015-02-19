describe('RG2 replay', function() {
	var rg2 = require('../page/rg2.page.js');
	var result = require('../page/result.page.js');
	var course = require('../page/course.page.js');
	
  var animationControls = element(by.id('rg2-animation-controls'));
  var optionControls = element(by.id('rg2-option-controls'));
  
  var trackNames = element(by.id('rg2-track-names'));
  var clockSlider = element(by.id('rg2-clock-slider'));

  var btnStartStop = element(by.id('btn-start-stop'));
  var btnFaster = element(by.id('btn-faster'));
  var btnSlower = element(by.id('btn-slower'));
  var btnFullTails = element(by.id('btn-full-tails'));

  var btnToggleNames = element(by.id('btn-toggle-names'));
  var btnMassStart = element(by.id('btn-mass-start'));
  var btnRealTime = element(by.id('btn-real-time'));
    
  var spnTailsUp = element(by.id('rg2-tails-spinner')).element(by.css('.ui-spinner-up'));
  var spnTailsDown = element(by.id('rg2-tails-spinner')).element(by.css('.ui-spinner-down'));
  var startOption = element(by.id('rg2-control-select')).all(by.css('option'));
  var cbxTrackList = element.all(by.css('.tracklist'));

  var cbxShowReplay = element.all(by.css('.showreplay'));
  var cbxAllCourseReplay = element.all(by.css('.allcoursereplay'));
  var cbxAllCourseTracks = element.all(by.css('.allcoursetracks'));

  it('should select a Trent Park score event with a georeferenced map', function() {
    rg2.loadRG2();
    rg2.getEvent('135');
    rg2.checkTitle('Boxing Day Score: Trent Park 2013-12-26');
    course.showCoursesTab();
  });

  it('should show the course for a score event', function() {
    course.showCourse(0);
  });

  it('should hide the course for a score event', function() {
    course.hideCourse(0);
  });

  it('should show and hide all courses for a score event', function() {
    course.showAllCourses();
    course.hideAllCourses();
  });

  it('should show an individual course for a score event', function() {
  	result.showResultsTab();
  	// open result accordion
    result.list.first().click();
    // selct runner
    result.showScoreCourse.first().click();
  });

  it('should allow replay for a score event', function() {
    cbxShowReplay.first().click();
    expect(animationControls.isDisplayed()).toBe(true);
		// start
    btnStartStop.click();
    browser.sleep(1000);
  });
  
  it('should show the splits table for a georeferenced map', function() {
  	rg2.showSplits();
		rg2.hideSplits();
  });

  it('should show a Welwyn event with no splits and GPS routes only', function() {
    rg2.getEvent('154');
    rg2.checkTitle('Herts ARC 2014: Welwyn Garden City 2014-08-05');
  	result.showResultsTab();
  });

  it('should allow replay for an event with no splits and GPS routes only', function() {
    cbxShowReplay.first().click();
    expect(animationControls.isDisplayed()).toBe(true);
		// start
    btnStartStop.click();
    rg2.showOptionsDialog();
    rg2.showGPSSpeed();
    browser.sleep(2000);
    rg2.showGPSSpeed();
    rg2.hideOptionsDialog();

  });

  it('should show a Rothamsted event with no splits and drawn and GPS routes', function() {
    rg2.getEvent('119');
    rg2.checkTitle('Herts ARC 2013 Race 8: Rothamsted 2013-06-25');
    result.showResultsTab();
  });

  it('should allow replay for an event with no splits and drawn and GPS routes', function() {
    cbxShowReplay.get(0).click();
    cbxShowReplay.get(1).click();
    expect(animationControls.isDisplayed()).toBe(true);
    btnStartStop.click();
    browser.sleep(5000);
  });
  

  
  it('should select a Mardley Heath event and show the results tab', function() {
  	rg2.loadRG2('#157&course=1&route=2');
    // got a route in the URL
    expect(trackNames.isDisplayed()).toBe(true);
  });

  it('should display and hide courses', function() {
    result.showCourse.first().click();
    result.showCourse.first().click();
  });

  it('should display and hide tracks', function() {
    result.openResultsList(0);
    result.showTrack.get(1).click();
    expect(trackNames.isDisplayed()).toBe(true);
    result.showTrack.first().click();
    expect(trackNames.isDisplayed()).toBe(true);
    result.showTrack.get(1).click();  
    expect(trackNames.isDisplayed()).toBe(false);
    cbxAllCourseTracks.first().click();
    expect(trackNames.isDisplayed()).toBe(true);
    cbxAllCourseTracks.first().click();
    expect(trackNames.isDisplayed()).toBe(false);
  });

  it('should show event stats in the about dialog', function() {
    rg2.showAboutDialog();
    rg2.hideAboutDialog();
  });
  
  it('should allow runners to be selected for replay', function() {
    expect(animationControls.isDisplayed()).toBe(false);
    cbxShowReplay.first().click();
    expect(animationControls.isDisplayed()).toBe(true);
    cbxShowReplay.get(2).click();
    expect(animationControls.isDisplayed()).toBe(true);
    cbxShowReplay.first().click();
    expect(animationControls.isDisplayed()).toBe(true);
    cbxShowReplay.get(2).click();
    expect(animationControls.isDisplayed()).toBe(false);
    cbxAllCourseReplay.first().click();
    expect(animationControls.isDisplayed()).toBe(true);
    cbxAllCourseReplay.first().click();
    expect(animationControls.isDisplayed()).toBe(false);
  });

  it('should show animation', function() {
    cbxShowReplay.first().click();
    expect(animationControls.isDisplayed()).toBe(true);
    // start
    btnStartStop.click();
    browser.sleep(1000);
    cbxShowReplay.get(1).click();
    btnFaster.click();
    // stop
    btnStartStop.click();
    cbxAllCourseReplay.first().click();
    // start
    btnStartStop.click();
    browser.sleep(1000);
    btnSlower.click();
    btnSlower.click();
    btnSlower.click();
    btnSlower.click();
    btnSlower.click();
    btnSlower.click();
    btnSlower.click();
    btnFaster.click();
    btnFaster.click();
    btnFaster.click();
    btnFaster.click();
    btnFaster.click();
    btnFaster.click();
    btnFaster.click();
    btnFaster.click();
    btnFullTails.click();
    startOption.get(2).click();
    browser.sleep(1000);
    btnFullTails.click();
    spnTailsUp.click();
    spnTailsUp.click();
    browser.sleep(1000);
    btnToggleNames.click();
    btnMassStart.click();
    btnToggleNames.click();
    browser.sleep(1000);
    startOption.first().click();
    btnToggleNames.click();
    spnTailsDown.click();
    browser.actions().dragAndDrop(clockSlider, {x: 50, y: 0}).perform();
    browser.sleep(1000);
    btnRealTime.click();
    browser.sleep(1000);
    browser.actions().dragAndDrop(clockSlider, {x: 10, y: 0}).perform();
    browser.sleep(1000);
    // stop
    btnStartStop.click();
    cbxAllCourseReplay.first().click();
    expect(animationControls.isDisplayed()).toBe(false);
  });

  it('should allow replay from control and by control', function() {
    expect(animationControls.isDisplayed()).toBe(false);
    cbxShowReplay.first().click();
    cbxShowReplay.get(1).click();
    expect(animationControls.isDisplayed()).toBe(true);
    // start from control 2
    startOption.get(2).click();
    btnMassStart.click();
    // start
    btnStartStop.click();
    browser.sleep(6000);
    // replay by control
    startOption.last().click();
    browser.sleep(6000);
    // stop
    btnStartStop.click();
    cbxShowReplay.first().click();
    cbxShowReplay.get(1).click();
  });
  
  it('should show the splits table', function() {
  	rg2.showSplits();
		rg2.hideSplits();
    expect(animationControls.isDisplayed()).toBe(false);
    cbxShowReplay.first().click();
  	rg2.showSplits();
		rg2.hideSplits();

  });
    
  it('should load Splitsbrowser', function() {
    rg2.loadSplitsbrowser();
  });
});