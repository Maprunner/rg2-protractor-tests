var ReplayPage = function() {
  var rg2 = require('../page/rg2.page.js');
  this.animationControls = element(by.id('rg2-animation-controls'));
  this.optionControls = element(by.id('rg2-option-controls'));
  
  this.trackNames = element(by.id('rg2-track-names'));
  this.clockSlider = element(by.id('rg2-clock-slider'));

  this.btnStartStop = element(by.id('btn-start-stop'));
  this.btnFaster = element(by.id('btn-faster'));
  this.btnSlower = element(by.id('btn-slower'));
  this.btnFullTails = element(by.id('btn-full-tails'));

  this.btnToggleNames = element(by.id('btn-toggle-names'));
  this.btnRealTime = element(by.id('btn-real-time'));
    
  this.spnTailsUp = element(by.id('rg2-tails-spinner')).element(by.css('.ui-spinner-up'));
  this.spnTailsDown = element(by.id('rg2-tails-spinner')).element(by.css('.ui-spinner-down'));
  this.startOption = element(by.id('rg2-control-select')).all(by.css('option'));
  this.cbxTrackList = element.all(by.css('.tracklist'));

  this.cbxShowReplay = element.all(by.css('.showreplay'));
  this.cbxAllCourseReplay = element.all(by.css('.allcoursereplay'));
  this.cbxAllCourseTracks = element.all(by.css('.allcoursetracks'));  

    
	this.start = function() {
    expect(rg2.hasClass(this.btnStartStop, 'fa-pause')).toBe(false);
    expect(rg2.hasClass(this.btnStartStop, 'fa-play')).toBe(true);
    this.btnStartStop.click();
    expect(rg2.hasClass(this.btnStartStop, 'fa-pause')).toBe(true);
    expect(rg2.hasClass(this.btnStartStop, 'fa-play')).toBe(false);
  };
	
	this.stop = function() {
    expect(rg2.hasClass(this.btnStartStop, 'fa-pause')).toBe(true);
    expect(rg2.hasClass(this.btnStartStop, 'fa-play')).toBe(false);
    this.btnStartStop.click();
    expect(rg2.hasClass(this.btnStartStop, 'fa-pause')).toBe(false);
    expect(rg2.hasClass(this.btnStartStop, 'fa-play')).toBe(true);
  };

  this.setRealTime = function() {
    expect(rg2.hasClass(this.btnRealTime, 'fa-users')).toBe(true);
    expect(rg2.hasClass(this.btnRealTime, 'fa-clock-o')).toBe(false);
    this.btnRealTime.click();
    expect(rg2.hasClass(this.btnRealTime, 'fa-users')).toBe(false);
    expect(rg2.hasClass(this.btnRealTime, 'fa-clock-o')).toBe(true);
  };

  this.setMassStart = function() {
    expect(rg2.hasClass(this.btnRealTime, 'fa-users')).toBe(false);
    expect(rg2.hasClass(this.btnRealTime, 'fa-clock-o')).toBe(true);
    this.btnRealTime.click();
    expect(rg2.hasClass(this.btnRealTime, 'fa-users')).toBe(true);
    expect(rg2.hasClass(this.btnRealTime, 'fa-clock-o')).toBe(false);
  };

  this.selectFirstRunner = function (id) {
    expect(this.animationControls.isDisplayed()).toBe(false);
    this.cbxShowReplay.get(id).click();
    expect(this.animationControls.isDisplayed()).toBe(true);
  };
  
  this.selectAnotherRunner = function (id) {
    expect(this.animationControls.isDisplayed()).toBe(true);
    this.cbxShowReplay.get(id).click();
    expect(this.animationControls.isDisplayed()).toBe(true);
  };

  this.removeRunner = function (id) {
    expect(this.animationControls.isDisplayed()).toBe(true);
    this.cbxShowReplay.get(id).click();
    expect(this.animationControls.isDisplayed()).toBe(true);
  };
  
  this.removeLastRunner = function (id) {
    expect(this.animationControls.isDisplayed()).toBe(true);
    this.cbxShowReplay.get(id).click();
    expect(this.animationControls.isDisplayed()).toBe(false);
  };

  this.spinTails = function (direction) {
    if (direction === "up") {
      this.spnTailsUp.click();
    } else {
      this.spnTailsDown.click();
    }  
  };

  this.hideAllCourseTracks = function (id) {
    this.cbxAllCourseTracks.get(id).click();
    // assumes this is the only course being displayed at present
    expect(this.trackNames.isDisplayed()).toBe(false);
    expect(this.animationControls.isDisplayed()).toBe(false);
  };
  
  this.showAllCourseTracks = function (id) {
    this.cbxAllCourseTracks.get(id).click();
    expect(this.trackNames.isDisplayed()).toBe(true);
    expect(this.animationControls.isDisplayed()).toBe(false);
  };

  this.removeAllCourseReplay = function (id) {
    this.cbxAllCourseReplay.get(id).click();
    // assumes this is the only course being displayed at present
    expect(this.trackNames.isDisplayed()).toBe(false);
    expect(this.animationControls.isDisplayed()).toBe(false);
  };
  
  this.addAllCourseReplay = function (id) {
    this.cbxAllCourseReplay.get(id).click();
    expect(this.animationControls.isDisplayed()).toBe(true);
    expect(this.trackNames.isDisplayed()).toBe(true);
  };

  this.goFaster = function () {
    this.btnFaster.click();
  };
  
  this.goSlower = function () {
    this.btnSlower.click();
  };
  
  this.toggleNames = function () {
    expect(this.btnToggleNames.getAttribute('title')).toBe('Show initials');
    this.btnToggleNames.click();
    expect(this.btnToggleNames.getAttribute('title')).toBe('Hide names');
    this.btnToggleNames.click();
    expect(this.btnToggleNames.getAttribute('title')).toBe('Show names');
    this.btnToggleNames.click();
    expect(this.btnToggleNames.getAttribute('title')).toBe('Show initials');
  };
  
  this.showFullTails = function () {
    this.btnFullTails.click();
  };

  this.removeFullTails = function () {
    this.btnFullTails.click();
  };

  this.dragSlider = function (x, y) {
    browser.actions().dragAndDrop(this.clockSlider, {'x': x, 'y': y}).perform();
  }
  
  this.replayByControl = function () {
    this.startOption.last().click();
  }

  this.startAt = function (control) {
    this.startOption.get(control).click();
  }
};

module.exports = new ReplayPage();