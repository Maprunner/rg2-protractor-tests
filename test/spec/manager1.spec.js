const { browser } = require('protractor');

describe('RG2 Manager 1', function() {
  var rg2 = require('../page/rg2.page.js');
  var manager = require('../page/manager.page.js');

  // mousex = (x + 954) / 2.6, mousey = y/2.6
  // 310, 1286: control 187
  var h1 = {x:486, y:494};
  // 304, 1372: correct control 187
  var h2 = {x:484, y:528};
  // 766, 394: control 193
  var h3 = {x:662, y:152};
  // 730, 700: correct control 193
  var h4 = {x:648, y:269};

  describe("The manager login page", function (){

  it('should show the login screen', function() {
    manager.startManager();
  });

  it('should reject invalid user names and passwords', function() {
    manager.login('', '');
    // no user name or password: error reported
    rg2.acknowledgeWarning("Please enter user name");

    // user name too short: error reported
    manager.login('abc', '');
    rg2.acknowledgeWarning("Please enter user name");

    // password too short: error reported
    manager.login('hhhhh', 'xyz');
    rg2.acknowledgeWarning("at least five characters");

  });

  it('should allow a valid login', function() {
    manager.login();
  });
  });

  describe("The logged in manager page", function (){

  it('should show the map tab', function() {
    manager.showMapTab();
  });

  it('should accept a map name', function() {
    element(by.id('rg2-map-name')).clear().sendKeys('Ellenbrook protractor test map non-georef');
  });

  it('should remove a map name', function() {
    // set back to empty to test validation
    element(by.id('rg2-map-name')).clear().sendKeys('');
  });

  it('should report a map file type error', function() {
    element(by.id('rg2-map-name')).clear().sendKeys('Ellenbrook protractor test map non-georef');
    element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV1courses.xml');
    // invalid file type: error reported
    rg2.acknowledgeWarning('Only .jpg and .gif files are supported at present.');
  });

  it('should allow upload to be cancelled', function() {
    element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.jpg');
    manager.cancelAddMap();
  });

  it('should upload a non-georeferenced map', function() {
    manager.addMap();
    rg2.acknowledgeWarning("has been added");
  });

  it('should report event name validation errors', function() {
    manager.showCreateTab();
    manager.createEvent("Event name is not valid");
  });

  it('should report map validation errors', function() {
    element(by.id('rg2-event-name')).sendKeys('Event 1-01: Ellenbrook');
    manager.createEvent("No map selected");
    // first entry is "Select map" so does nothing useful
    element(by.id('rg2-map-selected')).all(by.css('option')).get(0).click();
    manager.createEvent("No map selected");
  });

  it('should report club validation errors', function() {
    element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    manager.createEvent("Club name is not valid");
  });

  it('should report date validation errors', function() {
    manager.enterClubName('HH');
    manager.createEvent("Date is not valid");
  });

  it('should report event level validation errors', function() {
    manager.enterDate('2015-01-01');
    manager.createEvent("Event level is not valid");
  });

  it('should allow the event level to be set', function() {
    // first entry is "Select event level" so does nothing useful
    manager.enterLevel(0);
    manager.createEvent("Event level is not valid");
    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
    // missing data: error reported
    manager.createEvent("No course information");
  });

  it('should allow comments to be entered', function() {
    element(by.id('rg2-event-comments')).sendKeys('IOF V2 course file, CSV results, map not georeferenced');
  });

  it('should report results file validation errors', function() {
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.jpg');
    // invalid file type: error reported
    rg2.acknowledgeWarning("Results file type is not recognised");
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.csv');
    manager.acknowledgeResultInfo();
    manager.createEvent("Check your course XML file.");
  });

  it('should report invalid course file type', function() {
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.jpg');
    // invalid file type: error reported
    rg2.acknowledgeWarning("File is not a valid XML course file");
  });

  it('should report course file validation errors: V1.0.0', function() {
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV1courses.xml');
    rg2.acknowledgeWarning('Invalid IOF file format. Version 1.0.0 not supported.');
  });

  it('should report course file validation errors: CourseData missing', function() {
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV2invalidcourses.xml');
    rg2.acknowledgeWarning('CourseData element missing.');
  });

  it('should accept a valid course file', function() {
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV2courses.xml');
    manager.acknowledgeCourseInfo();
  });

  it('should allow you to adjust the controls', function() {
    // drag and drop not working in Chromedriver at present: https://code.google.com/p/chromedriver/issues/detail?id=841 
    // so this doesn't align controls as expected
    // drag h1 to h2
    browser.actions().mouseMove(rg2.map, h1).mouseDown().mouseMove(rg2.map, h2).mouseUp().perform();
    // lock h2
    browser.actions().click().perform();
    // zoom to force redraw test
    rg2.zoomIn();
    rg2.zoomOut();
    // drag h3 to h4
    browser.actions().mouseMove(rg2.map, h3).mouseDown().mouseMove(rg2.map, h4).mouseUp().perform();
    
    // temporary test of locking and unlocking handle until drag and drop works above
    browser.actions().mouseMove(rg2.map, {x: 500, y: 300}).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, {x: 600, y: 500}).mouseDown().mouseUp().perform();
  });

  it('should allow you to map results to courses', function() {
    // map results to courses
    element(by.id('rg2-alloc-0')).all(by.css('option')).get(4).click();
  });

  it('should create Event 1-01: CSV results: IOF V2 courses: map not georef', function() {
    manager.createEventCancel();
    manager.createEvent();
  });
});

});
