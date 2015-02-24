var ManagerPage = function() {
	 var rg2 = require('../page/rg2.page.js');
	this.loginTab = element(by.id('rg2-login-tab'));
  this.loginBody = element(by.id('rg2-manage-login'));
	this.mapTab = element(by.id('rg2-map-tab'));
  this.mapBody = element(by.id('rg2-manage-map'));
	this.btnLogin = element(by.id('btn-login'));
  this.createTab = element(by.id('rg2-create-tab'));
  this.createBody = element(by.id('rg2-manage-create'));
  this.editTab = element(by.id('rg2-edit-tab'));
  this.editBody = element(by.id('rg2-manage-edit'));
	this.dlgConfirmCreateEvent = element(by.css('.rg2-confirm-create-event-dialog'));
	this.btnCreateEvent = element(by.id('btn-create-event'));
	this.dlgConfirmAddMap = element(by.css('.rg2-confirm-add-map-dialog'));
	this.dlgResultInfo = element(by.css('.rg2-result-info-dialog'));
	this.dlgCourseInfo = element(by.css('.rg2-course-info-dialog'));
	this.btnAddMap = element(by.id('btn-add-map'));
	this.btnMoveMapAndControls = element(by.id('btn-move-map-and-controls'));
  this.btnScoreEvent = element(by.id('btn-score-event'));
  
	this.startManager = function() {
		// not an angular app so need this
		browser.ignoreSynchronization = true;
    browser.manage().window().setSize(1280, 800);
 		browser.get('http://localhost/rg2-protractor-tests/instrumented/rg2/?manage');
 		browser.sleep(1000);
 		expect(this.loginBody.isDisplayed()).toBe(true);
	};
	  
	this.login = function(user, password) {
		// log in properly if not sent anything else
		if (arguments.length < 2) {
			user = 'hhhhh';
			password = 'aaaaa';
		}
 		element(by.id('rg2-user-name')).clear().sendKeys(user);
		element(by.id('rg2-password')).clear().sendKeys(password);
		this.btnLogin.click();
 		browser.sleep(1000);
		if (arguments.length < 2) {
    	expect(this.createBody.isDisplayed()).toBe(true);
  	} else {
 			expect(this.loginBody.isDisplayed()).toBe(true);
  	}
	};
	
	this.createEvent = function (expectedError) {
		this.btnCreateEvent.click();
		if (expectedError) {
		  rg2.acknowledgeWarning(expectedError);
		} else {
  	  this.dlgConfirmCreateEvent.element(by.buttonText('Create event')).click();
		  browser.sleep(2000);
		}
	 };
	 	
	this.addMap = function () {
	  this.btnAddMap.click();
  	this.dlgConfirmAddMap.element(by.buttonText('Add map')).click();
	  browser.sleep(2000);
	};
	
	this.createEventCancel = function () {
		this.btnCreateEvent.click();
  	this.dlgConfirmCreateEvent.element(by.buttonText('Cancel')).click();
	};
	
	this.enterDate = function (date) {
	  // need enter to get date accepted and escape to close date picker
   element(by.id('rg2-event-date')).clear().sendKeys(date).sendKeys(protractor.Key.ENTER).sendKeys(protractor.Key.ESCAPE);
	};
	
  this.enterLevel = function (level) {
    element(by.id('rg2-event-level')).all(by.css('option')).get(level).click();
  };
  
  
  this.enterClubName = function (name) {
    element(by.id('rg2-club-name')).clear().sendKeys(name);
  };

	this.addMapCancel = function () {
		this.btnAddMap.click();
		this.dlgConfirmAddMap.element(by.buttonText('Cancel')).click();
	};
	
	this.acknowledgeResultInfo = function() {
		expect(this.dlgResultInfo.isDisplayed()).toBe(true);
		this.dlgResultInfo.element(by.buttonText('Ok')).click();
		expect(this.dlgResultInfo.isDisplayed()).toBe(false);
	};

	this.acknowledgeCourseInfo = function() {
		expect(this.dlgCourseInfo.isDisplayed()).toBe(true);
		this.dlgCourseInfo.element(by.buttonText('Ok')).click();
		expect(this.dlgCourseInfo.isDisplayed()).toBe(false);
	};
	
	this.showMapTab = function() {
		this.mapTab.click();
		expect(this.mapBody.isDisplayed()).toBe(true);
	};

	this.showEditTab = function() {
		this.editTab.click();
		expect(this.editBody.isDisplayed()).toBe(true);
	};

	this.showCreateTab = function() {
		this.createTab.click();
		expect(this.createBody.isDisplayed()).toBe(true);
	};
	
	this.lockMap = function() {
	  this.btnMoveMapAndControls.click();
	};
  
  this.setScoreEvent = function() {
    this.btnScoreEvent.click();
  };

};

module.exports = new ManagerPage();