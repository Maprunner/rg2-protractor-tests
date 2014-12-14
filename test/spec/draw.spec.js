describe('RG2 draw', function() {
	var rg2 = require('../page/rg2.page.js');
	var draw = require('../page/draw.page.js');
	var course = require('../page/draw.page.js');
		 
	it('should load a Verulamium event and show the draw tab', function() {
 		rg2.loadRG2('#1');
    draw.showDrawTab();
  });

  it('should allow you to start drawing a route', function() {
    browser.actions().click(rg2.map, {x:0, y:0}).perform();
		//warning: no name/course selected
		rg2.acknowledgeWarning('Please select course');
    draw.courses.get(1).click();
    draw.names.get(1).click();
    draw.addComment('Protractor draw test');
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
 		rg2.getEvent('102');
    draw.showDrawTab();
  });
  
   it('should allow you to start drawing a score course route', function() {
    draw.courses.get(1).click();
    draw.names.get(1).click();
    draw.addComment('Verulamium score draw test');
    // add first point
    browser.actions().click(rg2.map).perform();
  });

  it('should allow you to reset everything', function() {
		draw.resetDrawingCancel();
		draw.resetDrawing();
  });

	it('should allow you to load a Hertford event with no results', function() {
 		rg2.getEvent('141');
    draw.showDrawTab();
  });
  
   it('should allow you to add a result and draw a route', function() {
    draw.courses.get(1).click();
    browser.sleep(2000);

    draw.enterName('');
    draw.enterName('Hertford test runner');
    browser.sleep(2000);

    draw.enterTime('12.34');
    browser.sleep(2000);

    draw.addComment('No results Hertford draw test');
    // add first point
    browser.actions().click(rg2.map).perform();
  });

});