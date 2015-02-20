var ResultPage = function() {

	this.body = element(by.id('rg2-result-list'));
	this.resultsTab = element(by.id('rg2-results-tab'));
  this.list = element(by.id('rg2-result-list')).all(by.css('H3'));
  this.showTrack = element(by.id('rg2-result-list')).all(by.css('.showtrack'));
  this.showCourse = element(by.id('rg2-result-list')).all(by.css('.showcourse'));
  this.showScoreCourse = element(by.id('rg2-result-list')).all(by.css('.showscorecourse'));
  this.table = element(by.css('.resulttable'));
    
	this.showResultsTab = function() {
    this.resultsTab.click();
		expect(this.body.isDisplayed()).toBe(true);
	};
	
	this.openResultsList = function (index) {
		// click on requested results
		this.list.get(index).click();
		// if they are not displayed then we have just closed the list so click again
		if (!this.table.isDisplayed()) {
		  this.list.get(index).click();
		}
		expect(this.table.isDisplayed()).toBe(true);
	};

};

module.exports = new ResultPage();