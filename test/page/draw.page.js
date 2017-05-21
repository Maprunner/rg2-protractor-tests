var DrawPage = function() {

	this.body = element(by.id('rg2-draw'));
	this.drawTab = element(by.id('rg2-draw-tab'));
	this.btnSaveGPSRoute = element(by.id('btn-save-gps-route'));
  this.btnSaveRoute = element(by.id('btn-save-route'));
  this.btnAutofit = element(by.id('btn-autofit-gps'));
  this.btnResetDrawing = element(by.id('btn-reset-drawing'));
  this.courses = element(by.id('rg2-course-select')).all(by.tagName('option'));
  this.names = element(by.id('rg2-name-select')).all(by.css('option'));
	this.dlgConfirmChangeCourse = element(by.css('.rg2-confirm-change-course'));
	this.dlgConfirmDrawingReset =element(by.css('.rg2-confirm-drawing-reset'));
	this.btnUndo = element(by.id('btn-undo'));
	this.btnUndoGPSAdjust = element(by.id('btn-undo-gps-adjust'));
	this.btnMoveAll = element(by.id('btn-move-all'));
	this.btnThreeSeconds = element(by.id('btn-three-seconds'));
	this.comments = element(by.id('rg2-new-comments'));
	this.file = element(by.id('rg2-load-gps-file'));
	this.offsetSpinner = element(by.id('rg2-offset-spinner'));

	this.showDrawTab = function() {
		this.drawTab.click();
		expect(this.body.isDisplayed()).toBe(true);
	};
	
	this.addComment = function(comment) {
		this.comments.clear().sendKeys(comment);
	};
	
	this.loadGPSFile = function(file) {
		  this.file.sendKeys(file);
		  browser.sleep(1000);
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

	this.undoGPSAdjust = function () {
		this.btnUndoGPSAdjust.click();
	};

	this.lockBackground = function () {
		this.btnMoveAll.click();
	};

  this.saveRoute = function () {
    this.btnSaveRoute.click();
    browser.sleep(1000);
  };
  
	this.saveGPSRoute = function () {
		this.btnSaveGPSRoute.click();
		browser.sleep(1000);
	};
	
	this.waitThreeSeconds = function () {
		this.btnThreeSeconds.click();
	};
	
	this.autofit = function () {
	  this.btnAutofit.click();
	};
	
	this.adjustOffset = function(val) {
    switch (val) {
    case '+':
      this.offsetSpinner.element(by.css('.ui-spinner-up')).click();
      break;
    case '-':
      this.offsetSpinner.element(by.css('.ui-spinner-down')).click();
      break;
    default:
      this.offsetSpinner.element(by.css('input')).clear().sendKeys(val);
      // need to click to get it accepted: not ideal but it works
      this.offsetSpinner.element(by.css('.ui-spinner-down')).click();
      break;
   }
  };
};

module.exports = new DrawPage();