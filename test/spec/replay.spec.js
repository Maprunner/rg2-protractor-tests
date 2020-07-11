const { browser } = require('protractor');

describe('RG2 replay', function() {
  var rg2 = require('../page/rg2.page.js');
  var EC = protractor.ExpectedConditions;
  var result = require('../page/result.page.js');
  var course = require('../page/course.page.js');
  var replay = require('../page/replay.page.js');
  var wait = 1000
  // it('should select a Trent Park score event with a georeferenced map', function() {
  //   // invalid hash so just display event list
  //   rg2.loadRG2('#x', 'Routegadget 2');
  //   rg2.getEvent('135');
  //   rg2.checkTitle('Boxing Day Score: Trent Park 2013-12-26');
  //   course.showCoursesTab();
  // });

  // it('should show the course for a score event', function() {
  //   course.showCourse(0);
  // });

  // it('should hide the course for a score event', function() {
  //   course.hideCourse(0);
  // });

  // it('should show and hide all courses for a score event', function() {
  //   course.showAllCourses();
  //   course.hideAllCourses();
  // });

  // it('should show an individual course for a score event', function() {
  //   result.showResultsTab();
  //   // open result accordion
  //   result.openResultsList(0);
  //   // select runner
  //   result.showScoreCourseForRunner(0, 4);
  // });

  // it('should allow replay for a score event', function() {
  //   result.toggleReplayCourseForRunner(0, 0);
  //   replay.start();
  //   browser.sleep(1000);
  // });
  
  // it('should show the splits table for a georeferenced map', function() {
  //   rg2.showSplits();
  //   rg2.hideSplits();
  // });

  // it('should show a Welwyn event with no splits and GPS routes only', function() {
  //   rg2.getEvent('154');
  //   rg2.checkTitle('Herts ARC 2014: Welwyn Garden City 2014-08-05');

  // });

  // it('should show results', function() {
  //   result.showResultsTab();
  //   result.openResultsList(0);
  // });

  // it('should select a runner to animate', function() {
  //   result.toggleReplayCourseForRunner(0, 0);
  //   replay.start();
  // });
  
  // it('should allow display of GPS speed colour-coding', function() {
  //   rg2.showOptionsDialog();
  //   rg2.showGPSSpeed();
  //   browser.sleep(2000);
  //   rg2.showGPSSpeed();
  //   rg2.hideOptionsDialog();

  // });

  // it('should show a Rothamsted event with no splits and drawn and GPS routes', function() {
  //   rg2.loadRG2('#132', 'Herts ARC 2013 Race 8: Rothamsted 2013-06-25');
  //   rg2.checkTitle('Herts ARC 2013 Race 8: Rothamsted 2013-06-25');
  // });

  // it('should allow runners to be selected for replay', function() {
  //   result.showResultsTab();
  //   result.openResultsList(0);
  //   result.toggleReplayCourseForRunner(0, 0);
  //   result.toggleReplayCourseForRunner(0, 1);
  // });

  // it('should allow replay for an event with no splits and drawn and GPS routes', function() {
  //   replay.start();
  //   browser.sleep(3000);
  // });

  it('should select a Mardley Heath event and show the results tab', function() {
    rg2.loadRG2('#157&course=1&route=60', 'SEOA Middle Champs: Mardley Heath 2014-04-27');
    // got a route in the URL
    expect(replay.trackNames.isDisplayed()).toBe(true);
  });

  it('should display and hide courses', function() {
    result.showResultsTab();
    result.openResultsList(5);
    result.openResultsList(5);
    result.openResultsList(8);
  });

  it('should display and hide tracks individually', function() {
    result.openResultsList(2);
    result.toggleTrackForRunner(2, 0);
    expect(replay.trackNames.isDisplayed()).toBe(true);
    result.toggleTrackForRunner(2, 0);
    expect(replay.trackNames.isDisplayed()).toBe(false);
    result.toggleTrackForRunner(2, 0);
    result.toggleTrackForRunner(2, 2);
    expect(replay.trackNames.isDisplayed()).toBe(true);
    result.toggleTrackForRunner(2, 2);
    expect(replay.trackNames.isDisplayed()).toBe(true);
    result.toggleTrackForRunner(2, 0);
    expect(replay.trackNames.isDisplayed()).toBe(false);
  });

  it('should display and hide tracks for a course', function() {
    result.openResultsList(0);
    browser.sleep(2000)
    replay.showAllCourseTracks(0);
    browser.sleep(2000)

    replay.hideAllCourseTracks(0);
    browser.sleep(2000)

  });

  it('should show event stats in the about dialog', function() {
    rg2.showAboutDialog();
    rg2.hasStats();
    rg2.hideAboutDialog();
  });
  
  it('should allow individual runners to be selected for replay', function() {
    result.openResultsList(0);
    expect(replay.animationControls.isDisplayed()).toBe(false);
    result.toggleReplayCourseForRunner(0, 2);
    result.toggleReplayCourseForRunner(0, 0);
    expect(replay.animationControls.isDisplayed()).toBe(true);
    result.toggleReplayCourseForRunner(0, 0);
    result.toggleReplayCourseForRunner(0, 2);
    expect(replay.animationControls.isDisplayed()).toBe(false);
  });

  it('should allow all runners from a course to be selected for replay', function() {
    replay.addAllCourseReplay(0);
    replay.removeAllCourseReplay(0);
  });

  it('should show animation', function() {
    result.toggleReplayCourseForRunner(0, 0);
    replay.start();
    browser.sleep(1000);
    result.toggleReplayCourseForRunner(0, 1);
    replay.goFaster();
    replay.stop();
    replay.removeRunner(0);
    replay.removeLastRunner(1);
    replay.addAllCourseReplay(0);
    replay.start();
    browser.sleep(1000);
    replay.goSlower();
    replay.goSlower();
    replay.goSlower();
    replay.goSlower();
    replay.goSlower();
    replay.goSlower();
    replay.goSlower();
    replay.goFaster();
    replay.goFaster();
    replay.goFaster();
    replay.goFaster();
    replay.goFaster();
    replay.goFaster();
    replay.goFaster();
    replay.goFaster();
    replay.showFullTails();
    replay.startAt(2);
    browser.sleep(1000);
    replay.removeFullTails();
    replay.spinTails('up');
    replay.spinTails('up');
    browser.sleep(1000);
  });
  
  it('should allow real-time and mass-start replay', function() {
    // starts as mass start so change to real time
    replay.setRealTime();
    browser.sleep(1000);
    replay.startAt(0);
    replay.spinTails('down');
    replay.dragSlider(50, 0);
    browser.sleep(1000);
    // changeto be mass start
    replay.setMassStart();
    browser.sleep(1000);
    replay.dragSlider(10, 0);
    browser.sleep(1000);
  });
  
  it('should toggle names', function() {
    replay.toggleNames();

  });
  
  it('should stop animation', function() {
    replay.stop();
    replay.removeAllCourseReplay(0);
  });

  it('should allow replay from control', function() {
    result.toggleReplayCourseForRunner(0, 2);
    result.toggleReplayCourseForRunner(0, 1);
    result.toggleReplayCourseForRunner(0, 0);
    // start from control 2
    replay.startAt(2);
    replay.start();
    browser.sleep(6000);
  });

  it('should allow replay by control', function() {
    // replay by control
    replay.replayByControl();
    browser.sleep(6000);
    replay.stop();
    replay.removeRunner(0);
    replay.removeRunner(2);
    browser.sleep(1000);
    replay.removeLastRunner(1);
    browser.sleep(1000);
  });
  
  // it('should show the splits table', function() {
  //   result.toggleReplayCourseForRunner(0, 0);
  //   rg2.showSplits();
  //   rg2.hideSplits();
  // });
    
  // it('should load Splitsbrowser', function() {
  //   rg2.loadSplitsbrowser();
  // });

});