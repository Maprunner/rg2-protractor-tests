const { browser } = require('protractor');

describe('RG2 drawing', function() {
  var rg2 = require('../page/rg2.page.js');
  var course = require('../page/course.page.js');
  var draw = require('../page/draw.page.js');

it('should load RG2', function() {
  rg2.loadRG2('', 'Routegadget 2');
});

// it('should show and hide the about dialog with no event selected', function() {
//   rg2.showAboutDialog();
//   expect(element(by.id('rg2-about-dialog')).getText()).toContain('Routegadget 2 (RG2)');
//   expect(element(by.id('rg2-about-dialog')).getText()).not.toContain('Event statistics');
//   rg2.hideAboutDialog();
// });

// it('should select a Mardley Heath normal event', function() {
//   rg2.getEvent(0);
//   rg2.showAboutDialog();
//   expect(element(by.id('rg2-event-stats')).getText()).toContain('Mardley courses and results: 2020-07-01');
//   rg2.hideAboutDialog();
// });

// it('should display and hide a course', function() {
//   course.showCoursesTab();
//   course.list.first().click();
//   course.list.get(3).click();
//   course.list.get(3).click();
//   course.list.first().click();
// });

// it('should allow you to draw a Yellow route', function() {
//   const yellow = {};
//   // required click locations for controls
//   // start is at center of rg2-map-canvas since that is how browser.actions is written
//   // index 1 and 3 are not at controls deliberately
//   yellow.x = [632, 450, 489, 480, 492, 531, 611, 642, 693, 756, 847, 782, 749, 727, 644, 563, 519];
//   yellow.y = [316, 400, 452, 420, 393, 315, 310, 380, 363, 313, 332, 454, 397, 471, 513, 481, 507];
  
//   var i, x, y, oldx, oldy;
//   var deltax = [];
//   var deltay = [];
//   for (i = 1; i < yellow.x.length; i = i + 1) {
//     deltax.push(parseInt(yellow.x[i] - yellow.x[i -1], 10));
//     deltay.push(parseInt(yellow.y[i] - yellow.y[i - 1], 10));
//   }

//   draw.showDrawTab();
//   // select Yellow course
//   draw.courses.get(4).click();
//   draw.names.get(2).click();
//   draw.addComment('Yellow draw test');
//   // move to centre of canvas
//   browser.actions().mouseMove(rg2.map).perform();
//   // move to each control
//   for (i = 0; i < deltax.length; i = i + 1) {
//     browser.actions().mouseMove({x: deltax[i], y: deltay[i]}).mouseDown().mouseUp().perform();
//   }
//   draw.saveRoute();
//   rg2.acknowledgeRouteSaved();  
// });

// it('should allow you to upload a Light Blue route', function() {
//   draw.showDrawTab();
//   // select Short Blue course
//   draw.courses.get(1).click();
//   draw.names.get(3).click();
//   draw.addComment('GPX upload test');
//   draw.loadGPSFile(rg2.dir + '/test/formatdata/Mardley_Heath_Short_Blue.gpx');
//   draw.saveGPSRoute();
//   rg2.acknowledgeRouteSaved();  
// });

it('should select a Trent Park score event', function() {
  rg2.getEvent(1);
  rg2.showAboutDialog();
  expect(element(by.id('rg2-event-stats')).getText()).toContain('Trent Park score course and results: 2020-07-02');
  rg2.hideAboutDialog();
});

it('should allow you to draw your course', function () {
  const score = {};
  // required click locations for controls
  // start is at center of rg2-map-canvas since that is how browser.actions is written
  score.x = [632, 583, 582, 655, 695, 699, 724, 714];
  score.y = [316, 453, 516, 569, 609, 469, 445, 390];
  
  var i, x, y, oldx, oldy;
  var deltax = [];
  var deltay = [];
  for (i = 1; i < score.x.length; i = i + 1) {
    deltax.push(parseInt(score.x[i] - score.x[i -1], 10));
    deltay.push(parseInt(score.y[i] - score.y[i - 1], 10));
  }
  draw.showDrawTab();
  // select score course
  draw.courses.get(1).click();
  draw.names.get(82).click();
  draw.addComment('Score draw test');
  // move to centre of canvas
  browser.actions().mouseMove(rg2.map).perform();
  // move to each control
  for (i = 0; i < deltax.length; i = i + 1) {
    browser.actions().mouseMove({x: deltax[i], y: deltay[i]}).mouseDown().mouseUp().perform();
  }
  draw.saveRoute();
  rg2.acknowledgeRouteSaved();
});

it('should allow you to upload a score route', function() {
  draw.showDrawTab();
  browser.sleep(1000);
  // select score course
  draw.courses.get(1).click();
  draw.names.get(2).click();
  draw.addComment('GPX upload test');
  draw.loadGPSFile(rg2.dir + '/test/formatdata/Trent_Park_score_2019.gpx');
  draw.saveGPSRoute();
  rg2.acknowledgeRouteSaved();  
});

// it('should select a Mardley courses with no results', function() {
//   rg2.getEvent(2);
//   rg2.showAboutDialog();
//   expect(element(by.id('rg2-event-stats')).getText()).toContain('Mardley courses no results: 2020-07-03');
//   rg2.hideAboutDialog();
// });

// it('should select a Mardley drawn course S&F together no results', function() {
//   rg2.getEvent(3);
//   rg2.showAboutDialog();
//   expect(element(by.id('rg2-event-stats')).getText()).toContain('Mardley drawn course S&F together no results: 2020-07-04');
//   rg2.hideAboutDialog();
// });

// it('should select a Trent Park score no results', function() {
//   rg2.getEvent(4);
// ;  rg2.showAboutDialog();
//   expect(element(by.id('rg2-event-stats')).getText()).toContain('Trent Park score no results: 2020-07-05');
//   rg2.hideAboutDialog();
// });

});
