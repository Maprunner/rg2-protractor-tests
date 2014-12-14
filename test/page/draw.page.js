var DrawPage = function() {

	this.body = element(by.id('rg2-draw'));
	this.drawTab = element(by.id('rg2-draw-tab'));
	this.btnSaveGPSRoute = element(by.id('btn-save-gps-route'));
  this.btnResetDrawing = element(by.id('btn-reset-drawing'));
  this.courses = element(by.id('rg2-course-select')).all(by.css('option'));
  this.names = element(by.id('rg2-name-select')).all(by.css('option'));
	this.dlgConfirmChangeCourse = element(by.css('.rg2-confirm-change-course'));
	this.dlgConfirmDrawingReset =element(by.css('.rg2-confirm-drawing-reset'));
	this.btnUndo = element(by.id('btn-undo'));
	this.btnThreeSeconds = element(by.id('btn-three-seconds'));
	this.comments = element(by.id('rg2-new-comments'));
	this.file = element(by.id('rg2-load-gps-file'));
	
	this.showDrawTab = function() {
		this.drawTab.element(by.id('ui-id-4')).click();
		expect(this.body.isDisplayed()).toBe(true);
	};
	
	this.addComment = function(comment) {
		this.comments.clear().sendKeys(comment);
	};
	
	this.loadGPSFile = function(file) {
		  this.file.sendKeys(file);
	};

	this.cancelCourseChange = function () {
		expect(this.dlgConfirmChangeCourse.isDisplayed()).toBe(true);
		this.dlgConfirmChangeCourse.element(by.buttonText('Cancel')).click();
		expect(this.dlgConfirmChangeCourse.isPresent()).toBe(false);
	};

	this.doCourseChange = function () {
		expect(this.dlgConfirmChangeCourse.isDisplayed()).toBe(true);
		this.dlgConfirmChangeCourse.element(by.buttonText('Change course')).click();
		expect(this.dlgConfirmChangeCourse.isPresent()).toBe(false);
	};
	
	this.resetDrawing = function () {
	  this.btnResetDrawing.click();
  	this.dlgConfirmDrawingReset.element(by.buttonText('Reset')).click();
	  browser.sleep(1000);
	};

	this.resetDrawingCancel = function () {
	  this.btnResetDrawing.click();
  	this.dlgConfirmDrawingReset.element(by.buttonText('Cancel')).click();
	  browser.sleep(1000);
	};

	this.enterName = function (name) {
		element(by.id('rg2-name-entry')).clear().sendKeys(name);
	};

	this.enterTime = function (time) {
		element(by.id('rg2-time-entry')).clear().sendKeys(time);
	};

	this.undo = function () {
		this.btnUndo.click();
	};

	this.saveGPSRoute = function () {
		this.btnSaveGPSRoute.click();
	};
	
	this.waitThreeSeconds = function () {
		this.btnThreeSeconds.click();
	};		
};

module.exports = new DrawPage();