describe('RG2 draw', function() {
	var rg2 = require('../page/rg2.page.js');
	var draw = require('../page/draw.page.js');
	var course = require('../page/draw.page.js');

  it('should allow you to load a Hertford event with no results', function() {
    rg2.loadRG2();
    rg2.getEvent('141');
    rg2.checkTitle('Herts Winter ARC: Hertford 2014-04-15');
    draw.showDrawTab();
  });
  
   it('should allow you to add your details', function() {
    draw.courses.get(1).click();
    draw.enterName('');
    draw.enterName('Hertford test runner 1');
    // clear out name
    draw.enterName('');
    // enter name again
    draw.enterName('Hertford test runner 2');
    draw.enterTime('12.34');
    draw.addComment('No results Hertford draw test');
  });
  
   it('should allow you to start drawing a route', function() {
    browser.actions().mouseMove(rg2.map, {x:500, y:200}).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, {x:700, y:250}).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, {x:900, y:200}).mouseDown().mouseUp().perform();
    draw.undo();
  });
  
   it('should chnage the snap settings', function() {
    rg2.showOptionsDialog();
    rg2.snap();
    rg2.hideOptionsDialog();
    browser.actions().mouseMove(rg2.map, {x:950, y:150}).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, {x:1100, y:500}).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, {x:929, y:424}).mouseDown().mouseUp().perform();
  });
  
   it('should allow you to undo even when you have finished', function() {
    draw.undo();
    browser.actions().mouseMove(rg2.map, {x:1000, y:600}).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, {x:929, y:424}).mouseDown().mouseUp().perform();
  });
  
   it('should allow you to save your route', function() {
    draw.saveRoute();
    rg2.acknowledgeWarning('Your route has been saved.');
  });
 
	it('should load a Mardley event and show the draw tab', function() {
 		rg2.loadRG2('#157');
    rg2.checkTitle('SEOA Middle Champs: Mardley Heath 2014-04-27');
    draw.showDrawTab();
  });

  it('should warn you to select a course', function() {
    browser.actions().click(rg2.map, {x:0, y:0}).perform();
		//warning: no name/course selected
		rg2.acknowledgeWarning('Please select course');
  });

  it('should allow you to select a course', function() {
    draw.courses.get(0).click();
    // change to a different course
    draw.courses.get(1).click();
    draw.names.get(1).click();
    draw.addComment('Protractor draw test');
  });

  it('should allow you to start drawing a route', function() {
    // add first point
    browser.actions().mouseMove(rg2.map, {x:0, y:0}).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, {x:100, y:100}).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, {x:200, y:200}).mouseDown().mouseUp().perform();
    draw.waitThreeSeconds();
    browser.actions().mouseMove(rg2.map, {x:300, y:300}).mouseDown().mouseUp().perform();
		draw.undo();
    
  });

  it('should allow you to change course', function() {
    // change course
    draw.courses.get(2).click();
	  // warning: changing course
		draw.cancelCourseChange();
    // change course
    draw.courses.get(3).click();
	  // warning: changing course
		draw.doCourseChange();
  });

	it('should allow you to load a Verulamium score course', function() {
 		rg2.getEvent('103');
    rg2.checkTitle('Verulamium HH Night Champs; Score 2013-01-05');
    draw.showDrawTab();
  });

   it('should allow you to select a course', function() {
    draw.courses.get(1).click();
  });

   it('should allow you to select a runner', function() {
    draw.names.get(1).click();
    draw.addComment('Verulamium score draw test');
  });

   it('should allow you to start drawing a score course route', function() {
    // add first point
    browser.actions().click(rg2.map).perform();
  });
    
  it('should allow you change tabs when drawing a route', function() {
    rg2.showEventsTab();
    draw.showDrawTab();
  });

  it('should allow you to reset everything', function() {
		draw.resetDrawingCancel();
		draw.resetDrawing();
  });

});