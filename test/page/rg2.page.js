const { browser } = require("protractor");

var RG2Page = function() {
  var EC = protractor.ExpectedConditions;
  this.map = element(by.id('rg2-map-canvas'));
  this.header = element(by.id('rg2-header-container'));
  this.infoPanel =element(by.id('rg2-info-panel')); 
  this.infoPanelIcon =element(by.id('rg2-hide-info-panel-icon'));
  this.resizePanelIcon =element(by.id('rg2-resize-info-icon'));
  this.btnAbout = element(by.id('btn-about'));
  this.btnShowSplits = element(by.id('btn-show-splits'));
  this.btnOptions = element(by.id('btn-options'));
  this.btnZoomIn = element(by.id('btn-zoom-in'));
  this.btnZoomOut = element(by.id('btn-zoom-out'));
  this.btnReset = element(by.id('btn-reset'));
  this.btnToggleControls = element(by.id('btn-toggle-controls'));
  this.aboutDialog = element(by.id('rg2-about-dialog'));
  this.stats = element(by.id('rg2-event-stats'));
  this.managerLink = element(by.id('rg2-manager-link'));
  this.optionControls = element(by.id('rg2-option-controls'));
  this.body = element(by.id('rg2-event-list'));
  this.eventsTab = element(by.id('rg2-events-tab'));
  this.splitsTable = element(by.id('rg2-splits-table'));
  this.dlgWarning = element(by.css('.rg2-warning-dialog'));
  this.dlgRouteSaved = element(by.css('.rg2-share-dialog'));
  this.languages = element(by.id('rg2-select-language')).all(by.css('option'));
  this.dimMap = element(by.id('rg2-dim-spinner'));
  this.dimRoute = element(by.id('rg2-dim-route-spinner'));
  this.routeWidth = element(by.id('rg2-route-width-spinner'));
  this.fontSize = element(by.id('rg2-names-spinner'));
  this.courseWidth = element(by.id('rg2-course-width-spinner'));
  this.controlSize= element(by.id('rg2-control-circle-spinner'));
  this.GPSspeed = element(by.id('chk-show-GPS-speed'));
  this.threeSeconds = element(by.id('chk-show-three-seconds'));
  this.snapToggle = element(by.id('chk-snap-toggle'));
  this.splitsbrowser = element(by.id('rg2-splitsbrowser'));
  this.dir = 'c:/xampp/htdocs/rg2-protractor-tests';
  this.eventTitle = element(by.id('rg2-event-title'));
  this.eventlist = element(by.id('rg2-event-list')).all(by.css('li'));
  this.trackNames = element(by.id('rg2-track-names'));

  this.hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
  };
  
  this.loadRG2 = function(hash, title) {
    var url;
    if (hash !== undefined) {
      url = 'http://localhost/rg2-protractor-tests/instrumented/rg2/' + hash;
    } else {
      url = 'http://localhost/rg2-protractor-tests/instrumented/rg2/';
    }
    // not an angular app so need this
    browser.ignoreSynchronization = true;
    // shouldn't need this bit it seems to force a reload which sometimes doesn't happen if you just change the hash
    browser.get('http://localhost');
    browser.get(url);
    browser.manage().window().setSize(1280, 800);
    browser.wait(EC.urlIs(url), 20000);
    browser.wait(EC.visibilityOf(this.eventTitle), 5000);
    // event title gets updated after first render so wait for that to have happened
    browser.sleep(1000)
    expect(browser.getTitle()).toEqual(title);
     if (!hash) {
       expect(element(by.id('rg2-event-list')).isDisplayed()).toBe(true);
     };
  };

  this.checkTitle = function(title) {
    if (title) {
      expect(this.eventTitle.isDisplayed()).toBe(true);
      expect(this.eventTitle.getText()).toEqual(title);
    } else {
      expect(this.eventTitle.isDisplayed()).toBe(false);
    }
  };
  
  this.acknowledgeWarning = function(text) {
    browser.wait(EC.visibilityOf(this.dlgWarning), 10000);
    expect(this.dlgWarning.isDisplayed()).toBe(true);
    if (text) {
      expect(this.dlgWarning.getText()).toContain(text);
    }
    this.dlgWarning.element(by.buttonText('Close')).click();
    expect(this.dlgWarning.isPresent()).toBe(false);
  };
  
  this.acknowledgeRouteSaved = function(text) {
    browser.wait(EC.visibilityOf(this.dlgRouteSaved), 10000);
    expect(this.dlgRouteSaved.isDisplayed()).toBe(true);
    browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    expect(this.dlgRouteSaved.isPresent()).toBe(false);
  };

  this.loadSplitsbrowser = function() {
    this.splitsbrowser.click();
    browser.sleep(2000);
  };
  
  this.getEvent = function(id) {
    this.showEventsTab();
    this.body.element(by.id("event-" + id)).click();
    browser.sleep(1000);
  };

  this.getNewestEvent = function() {
    this.showEventsTab();
    this.eventlist.first().click();
    browser.sleep(1000);
  };

  this.showEventsTab = function() {
    this.eventsTab.element(by.id('ui-id-1')).click();
    expect(this.body.isDisplayed()).toBe(true);
  };

  this.showAboutDialog = function(eventLoaded) {
    expect(this.aboutDialog.isDisplayed()).toBe(false);
    this.btnAbout.click();
    expect(this.aboutDialog.isDisplayed()).toBe(true);
    expect(element(by.css('.rg2-about-dialog')).element(by.css('.ui-dialog-title')).getText()).toContain('RG2 Version');
    expect(this.managerLink.isDisplayed()).toBe(true);
  };

  this.hasStats = function () {
    expect(this.stats.isDisplayed()).toBe(true);
  }

  this.hideAboutDialog = function() {
    expect(this.aboutDialog.isDisplayed()).toBe(true);
    element(by.css('.rg2-about-dialog')).element(by.buttonText('Ok')).click();
    expect(this.aboutDialog.isDisplayed()).toBe(false);
  };

  this.showSplits = function() {
    expect(this.splitsTable.isDisplayed()).toBe(false);
    this.btnShowSplits.click();
    expect(this.splitsTable.isDisplayed()).toBe(true);
  };

  this.hideSplits = function() {
    expect(this.splitsTable.isDisplayed()).toBe(true);
    element(by.css('.rg2-splits-table')).element(by.buttonText('Ok')).click();
    //element(by.css('.rg2-splits-table')).sendKeys(protractor.Key.ESCAPE);
    expect(this.splitsTable.isDisplayed()).toBe(false);
  };
  
  this.showOptionsDialog = function() {
    expect(this.optionControls.isDisplayed()).toBe(false);
    this.btnOptions.click();
    expect(this.optionControls.isDisplayed()).toBe(true);
  };

  this.hideOptionsDialog = function() {
    expect(this.optionControls.isDisplayed()).toBe(true);
    element(by.css('.rg2-options-dialog')).element(by.buttonText('Close')).click();
    expect(this.optionControls.isDisplayed()).toBe(false);
  };

  this.showInfoPanel = function() {
    expect(this.infoPanel.isDisplayed()).toBe(false);
    this.infoPanelIcon.click();
    expect(this.infoPanel.isDisplayed()).toBe(true);
  };

  this.hideInfoPanel = function() {
    expect(this.infoPanel.isDisplayed()).toBe(true);
    this.infoPanelIcon.click();
    expect(this.infoPanel.isDisplayed()).toBe(false);
  };

  this.resizeHideInfoPanel = function() {
    expect(this.infoPanel.isDisplayed()).toBe(true);
    this.resizePanelIcon.click();
    expect(this.infoPanel.isDisplayed()).toBe(false);
  };

  this.resizeShowInfoPanel = function() {
    expect(this.infoPanel.isDisplayed()).toBe(false);
    this.resizePanelIcon.click();
    expect(this.infoPanel.isDisplayed()).toBe(true);
  };

  this.zoomIn = function() {
    this.btnZoomIn.click();
  };

  this.zoomOut = function() {
    this.btnZoomOut.click();
  };

  this.resetZoom = function() {
    this.btnReset.click();
  };

  this.toggleControls = function() {
    this.btnToggleControls.click();
  };
  
  this.spin = function(action, val) {
    var spinner;
    switch (action) {
    case 'map intensity':
      spinner = this.dimMap;
      break;
    case 'route intensity':
      spinner = this.dimRoute;
      break;
    case 'route width':
      spinner = this.routeWidth;
      break;
    case 'font':
      spinner = this.fontSize;
      break;
    case 'course width':
      spinner = this.courseWidth;
      break;
    case 'control size':
      spinner = this.controlSize;
      break;
    default:
      return;
   }
    
    switch (val) {
    case '+':
      spinner.element(by.css('.ui-spinner-up')).click();
      break;
    case '-':
      spinner.element(by.css('.ui-spinner-down')).click();
      break;
    default:
      spinner.element(by.css('input')).clear().sendKeys(val);
      // need to click to get it accepted: not ideal but it works
      spinner.element(by.css('.ui-spinner-down')).click();
      break;
   }

  };

  this.showGPSSpeed = function() {
    this.GPSspeed.click();
  };
  
  this.showThreeSeconds = function() {
    this.threeSeconds.click();
  };

  this.snap = function() {
    this.snapToggle.click();
  };
};

module.exports = new RG2Page();