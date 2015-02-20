describe('RG2 Manager 1', function() {
  var rg2 = require('../page/rg2.page.js');
  var manager = require('../page/manager.page.js');

  var btnMoveMapAndControls = element(by.id('btn-move-map-and-controls'));
  var btnCreateEvent = element(by.id('btn-create-event'));

  it('should show the login screen', function() {
    manager.startManager();
  });

  it('should reject invalid user names and passwords', function() {
    manager.login('', '');
    // no user name or password: error reported
    rg2.acknowledgeWarning();

    // user name too short: error reported
    manager.login('abc', '');
    rg2.acknowledgeWarning();

    // password too short: error reported
    manager.login('hhhhh', 'xyz');
    rg2.acknowledgeWarning();

  });

  it('should allow a valid login', function() {
    manager.login();
  });

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

  it('should accept a map name again', function() {
    element(by.id('rg2-map-name')).clear().sendKeys('Ellenbrook protractor test map non-georef');
    element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.xml');
    // invalid file type: error reported
    rg2.acknowledgeWarning('Only .jpg and .gif files are supported at present.');
  });

  it('should allow upload to be cancelled', function() {
    element(by.id('rg2-load-map-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.jpg');
    manager.addMapCancel();
  });

  it('should upload a non-georeferenced map', function() {
    manager.addMap();
    rg2.acknowledgeWarning("has been added");
  });

  it('should report event name validation errors', function() {
    manager.showCreateTab();
    btnCreateEvent.click();
    // missing data: error reported
    rg2.acknowledgeWarning("Event name is not valid");
  });

  it('should report map validation errors', function() {
    element(by.id('rg2-event-name')).sendKeys('Event 1: Ellenbrook');
    btnCreateEvent.click();
    // missing data: error reported
    rg2.acknowledgeWarning("No map selected");
    // first entry is "Select map" so does nothing useful
    element(by.id('rg2-map-selected')).all(by.css('option')).get(0).click();
    btnCreateEvent.click();
    rg2.acknowledgeWarning("No map selected");
  });

  it('should report club validation errors', function() {
    element(by.id('rg2-map-selected')).all(by.css('option')).get(1).click();
    btnCreateEvent.click();
    // missing data: error reported
    rg2.acknowledgeWarning("Club name is not valid");
  });

  it('should report date validation errors', function() {
    element(by.id('rg2-club-name')).sendKeys('HH');
    btnCreateEvent.click();
    // missing data: error reported
    rg2.acknowledgeWarning("Event date is not valid.");
  });

  it('should report event level validation errors', function() {
    element(by.id('rg2-event-date')).clear().sendKeys('2014-12-01');
    element(by.id('rg2-event-date')).sendKeys(protractor.Key.ENTER);
    btnCreateEvent.click();
    // missing data: error reported
    rg2.acknowledgeWarning("Event level is not valid");
  });

  it('should allow the event level to be set', function() {
    // first entry is "Select event level" so does nothing useful
    element(by.id('rg2-event-level')).all(by.css('option')).get(0).click();
    btnCreateEvent.click();
    // missing data: error reported
    rg2.acknowledgeWarning("Event level is not valid");
    element(by.id('rg2-event-level')).all(by.css('option')).get(4).click();
    // missing data: error reported
    btnCreateEvent.click();
    rg2.acknowledgeWarning("No course information");
  });

  it('should allow comments to be entered', function() {
    element(by.id('rg2-event-comments')).sendKeys('IOF V2 course file, CSV results.not georeferenced');
  });

  it('should report results file validation errors', function() {
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/highfield.jpg');
    // invalid file type: error reported
    rg2.acknowledgeWarning("Results file type is not recognised");
    element(by.id('rg2-load-results-file')).sendKeys(rg2.dir + '/test/data/ellenbrook.csv');
    manager.acknowledgeResultInfo();
    // missing data: error reported
    btnCreateEvent.click();
    rg2.acknowledgeWarning('Check your course XML file.');
  });

  it('should report course file validation errors', function() {
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/highfield.jpg');
    // invalid file type: error reported
    rg2.acknowledgeWarning("File is not a valid XML course file");
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV1courses.xml');
    rg2.acknowledgeWarning('Invalid IOF file format. Version 1.0.0 not supported.');
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV2invalidcourses.xml');
    rg2.acknowledgeWarning('CourseData element missing.');
    element(by.id('rg2-load-course-file')).sendKeys(rg2.dir + '/test/data/ellenbrookIOFV2courses.xml');
    manager.acknowledgeCourseInfo();
  });

  it('should allow final adjustments', function() {
    // map results to courses
    element(by.id('rg2-alloc-0')).all(by.css('option')).get(4).click();
    // move controls a bit
    browser.actions().dragAndDrop(rg2.map, {
      x : 100,
      y : 100
    }).perform();
    // lock map and controls and try again
    btnMoveMapAndControls.click();
    browser.actions().dragAndDrop(rg2.map, {
      x : 30,
      y : 20
    }).perform();
  });

  it('should create Event 1: CSV results: IOF V2 courses: not georef', function() {
    manager.createEventCancel();
    manager.createEvent();
    rg2.acknowledgeWarning('has been added');
  });

});
