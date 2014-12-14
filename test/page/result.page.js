var ResultPage = function() {

	this.body = element(by.id('rg2-result-list'));
	this.resultsTab = element(by.id('rg2-results-tab'));
  this.list = element(by.id('rg2-result-list')).all(by.css('H3'));
  this.showTrack = element(by.id('rg2-result-list')).all(by.css('.showtrack'));
  this.showCourse = element(by.id('rg2-result-list')).all(by.css('.showcourse'));
  this.showScoreCourse = element(by.id('rg2-result-list')).all(by.css('.showscorecourse'));
    
	this.showResultsTab = function() {
		this.resultsTab.element(by.id('ui-id-3')).click();
		expect(this.body.isDisplayed()).toBe(true);
	};

};

module.exports = new ResultPage();