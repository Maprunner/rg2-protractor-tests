const { browser, element } = require("protractor");
const { threeSeconds } = require("./rg2.page");

var ResultPage = function() {
  var EC = protractor.ExpectedConditions;
  this.body = element(by.id('rg2-result-list'));
  this.resultsTab = element(by.id('rg2-results-tab'));
  this.courselist = element(by.id('rg2-result-list')).all(by.css('H3'));
  this.showTrack = element(by.id('rg2-result-list')).all(by.css('.showtrack'));
  this.showCourse = element(by.id('rg2-result-list')).all(by.css('.showcourse'));
  this.showScoreCourse = element(by.id('rg2-result-list')).all(by.css('.showscorecourse'));
  this.statsTable = element(by.id('rg2-stats-summary'));
    
  this.showResultsTab = function() {
    this.resultsTab.click();
    browser.wait(EC.visibilityOf(this.body), 2000);
    expect(this.body.isDisplayed()).toBe(true);
  };
  
  this.openResultsList = function (index) {
    table = element(by.id('table-' + (index + 1)));
    // click on course for requested results
    this.courselist.get(index).click();
    // if they are not displayed then we have just closed the list so click again
    if (!table.isDisplayed()) {
      this.courselist.get(index).click();
    }
    browser.wait(EC.visibilityOf(table), 2000)
    expect(table.isDisplayed()).toBe(true);
  };

  this.toggleTrackForRunner = function(course, runner) {
    browser.sleep(500);
    element(by.id('table-' + (course + 1))).all(by.css('.showtrack')).get(runner).click();
  };

  this.toggleReplayCourseForRunner = function(course, runner) {
    element(by.id('table-' + (course + 1))).all(by.css('.showreplay')).get(runner).click();
  };

  this.showScoreCourseForRunner = function(course, runner) {
    element(by.id('table-' + (course + 1))).all(by.css('.showscorecourse')).get(runner).click();
  };

  this.showStatsForRunner = function(course, runner) {
    var resultlist = element(by.id('table-' + (course + 1))).all(by.css('.resultrow'));
    expect(this.statsTable.isDisplayed()).toBe(false);
    browser.actions().doubleClick(resultlist.get(parseInt(runner, 10))).perform();
    browser.wait(EC.visibilityOf(this.statsTable), 5000);
    expect(this.statsTable.isDisplayed()).toBe(true);
};

  this.closeStatsForRunner = function() {
    expect(this.statsTable.isDisplayed()).toBe(true);
    browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    expect(this.statsTable.isDisplayed()).toBe(false);
    };

};

module.exports = new ResultPage();