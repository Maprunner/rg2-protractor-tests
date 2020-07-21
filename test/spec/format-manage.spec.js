// Format 1: Normal event with results
const { browser } = require('protractor');

describe('RG2 Manager 1', function() {
  var rg2 = require('../page/rg2.page.js');
  var manager = require('../page/manager.page.js');
  var btnDrawCourses = element(by.id('btn-draw-courses'));
  var btnNoResults = element(by.id('btn-no-results'));

  it('should show the login screen', function() {
    manager.startManager();
  });

  it('should allow a valid login', function() {
    manager.login();
  });

  it('should show the map tab', function() {
    manager.showMapTab();
  });

  it('should add a georefenced map of Mardley Heath', function() {
    element(by.id('rg2-map-name')).clear().sendKeys('Mardley Heath');
    element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/formatdata/Mardley-Heath-2020-02-12.gif');
    element(by.id('rg2-load-georef-file')).sendKeys(rg2.dir + '/test/formatdata/Mardley-Heath-2020-02-12.gfw');
    manager.addMap();
    rg2.acknowledgeWarning("has been added");
  });

  it('should add a georefenced map of Trent Park', function() {
    element(by.id('rg2-map-name')).clear().sendKeys('Trent Park');
    element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/formatdata/Trent_Park_Version Dec 2018 v2 OCAD 9.gif');
    element(by.id('rg2-load-georef-file')).sendKeys(rg2.dir + '/test/formatdata/Trent_Park_Version Dec 2018 v2 OCAD 9.gfw');
    manager.addMap();
    rg2.acknowledgeWarning("has been added");
  });

  it('should create Event 1: Mardley normal event', function() {
    manager.showCreateTab();
    element(by.id('rg2-event-name')).sendKeys('Mardley courses and results');
    element(by.id('rg2-map-selected')).all(by.css('option')).get(2).click();
    manager.enterClubName('HH');
    manager.enterDate('2020-07-01');
    manager.enterLevel(1);
    element(by.id('rg2-event-comments')).sendKeys('Results and courses');
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/formatdata/mardley4RG.csv');
    manager.acknowledgeResultInfo();
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/formatdata/MardleyHeath-070320-v4_coursedata.xml');
    manager.acknowledgeCourseInfo();
    manager.createEvent();
  });

  it('should create Event 2: Trent Park score', function() {
    manager.showCreateTab();
    element(by.id('rg2-event-name')).clear().sendKeys('Trent Park score course and results');
    element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    manager.enterClubName('HH');
    manager.enterDate('2020-07-02');
    manager.enterLevel(2);
    manager.setScoreEvent();
    element(by.id('rg2-event-comments')).clear().sendKeys('Score course and results');
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/formatdata/TrentPark.xml');
    manager.acknowledgeCourseInfo();
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/formatdata/trentPark4RG.csv');
    manager.acknowledgeResultInfo();
    manager.mapResultsToCourses(1);
    manager.createEvent();
  });

  it('should log in', function() {
    manager.startManager();
    manager.login();
  });

it('should create Event 3: Mardley courses no results', function() {
  manager.showCreateTab();
  element(by.id('rg2-event-name')).clear().sendKeys('Mardley courses no results');
  element(by.id('rg2-map-selected')).all(by.css('option')).get(2).click();
  manager.enterClubName('HH');
  manager.enterDate('2020-07-03');
  manager.enterLevel(3);
  btnNoResults.click();
  element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/formatdata/MardleyHeath-070320-v4_coursedata.xml');
  manager.acknowledgeCourseInfo();
  manager.createEvent();
});

it('should log in', function() {
  manager.startManager();
  manager.login();
});

it('should create Event 4: Mardley drawn course S&F together no results', function() {
  manager.showCreateTab();
  element(by.id('rg2-event-name')).clear().sendKeys('Mardley drawn course S&F together no results');
  element(by.id('rg2-map-selected')).all(by.css('option')).get(2).click();
  manager.enterClubName('HH');
  manager.enterDate('2020-07-04');
  manager.enterLevel(4);
  btnNoResults.click(); 
  btnDrawCourses.click();
  browser.actions().mouseMove(rg2.map, {x:700, y:500}).mouseDown().mouseUp().perform();
  browser.actions().mouseMove(rg2.map, {x:700, y:500}).mouseDown().mouseUp().perform();
  manager.createEvent();
});

it('should log in', function() {
  manager.startManager();
  manager.login();
});

it('should create Event 5: Trent Park score no results', function() {
  manager.showCreateTab();
  element(by.id('rg2-event-name')).clear().sendKeys('Trent Park score no results');
  element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
  manager.enterClubName('HH');
  manager.enterDate('2020-07-05');
  manager.enterLevel(5);
  btnNoResults.click(); 
  manager.setScoreEvent();
  element(by.id('rg2-event-comments')).clear().sendKeys('');
  element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/formatdata/TrentPark.xml');
  manager.acknowledgeCourseInfo();
  manager.createEvent();
});

});
