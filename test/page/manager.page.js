var ManagerPage = function() {
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
	this.btnAddMap = element(by.id('btn-add-map'));
		
	this.startManager = function() {
		// not an angular app so need this
		browser.ignoreSynchronization = true;

 		browser.get('http://localhost/instrumented/rg2/?manage');
 		browser.sleep(500);
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
	
	this.createEvent = function () {
		this.btnCreateEvent.click();
  	this.dlgConfirmCreateEvent.element(by.buttonText('Create event')).click();
		browser.sleep(1000);
	 };
	 	
	this.addMap = function () {
	  this.btnAddMap.click();
  	this.dlgConfirmAddMap.element(by.buttonText('Add map')).click();
	  browser.sleep(1000);
	};
	
	this.createEventCancel = function () {
		this.btnCreateEvent.click();
  	this.dlgConfirmCreateEvent.element(by.buttonText('Cancel')).click();

	};

	this.addMapCancel = function () {
	  this.btnAddMap.click();
  	this.dlgConfirmAddMap.element(by.buttonText('Cancel')).click();
	};
	
	this.showMapTab = function() {
		this.mapTab.element(by.id('ui-id-8')).click();
		expect(this.mapBody.isDisplayed()).toBe(true);
	};

	this.showEditTab = function() {
		this.editTab.element(by.id('ui-id-7')).click();
		expect(this.editBody.isDisplayed()).toBe(true);
	};

	this.showCreateTab = function() {
		this.createTab.element(by.id('ui-id-6')).click();
		expect(this.createBody.isDisplayed()).toBe(true);
	};
};

module.exports = new ManagerPage();