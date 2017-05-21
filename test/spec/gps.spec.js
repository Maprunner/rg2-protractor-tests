describe('RG2 GPS', function() {
	var rg2 = require('../page/rg2.page.js');
	var draw = require('../page/draw.page.js');
  var result = require('../page/result.page.js');
  var cbxAllCourseTracks = element.all(by.css('.allcoursetracks'));  
  // dodgy maths alert: mousex = (x + 646) / 1.76, mousey = y/1.76
  // start handle at 817, 729
  var hStart = {x:830, y:414};
  // end handle at 862, 617
  var hEnd = {x:857, y:351};
  // handle 1 near control 6 on the track at 96, 523
  var h1 = {x:422,  y:297};
  // handle 2 on the track at 615, 146
  var h2 = {x:716, y:83};
  
	it('should allow you to show the draw tab', function() {
   	rg2.loadRG2('#143', 'Verulamium Saturday League 2013-10-05');
    rg2.checkTitle('Verulamium Saturday League 2013-10-05');
    draw.showDrawTab();
  });

  it('should allow you to enter details', function() {
    draw.courses.get(1).click();
    draw.names.get(2).click();
    draw.addComment('Protractor test comment');
  });

  it('should warn about a missing file', function() {
	  draw.loadGPSFile(rg2.dir + '/test/data/verulamium.abc');
		rg2.acknowledgeWarning("Unable to open GPS file");
  });

  it('should warn about an invalid file', function() {
    draw.loadGPSFile(rg2.dir + '/test/data/invalid.gpx');
		rg2.acknowledgeWarning("File is not valid XML");
  });

  it('should warn about wrong file type', function() {
	  draw.loadGPSFile(rg2.dir + '/test/data/ellenbrook.csv');
		rg2.acknowledgeWarning("File type not recognised");
  });

  it('should allow you to upload a GPX file to a non-georeferenced Verulamium map', function() {
	  draw.loadGPSFile(rg2.dir + '/test/data/verulamium.gpx');
  });

  it('should allow you to drag the track', function() {
    browser.actions().mouseMove(rg2.map, {x:800, y:100}).mouseDown().mouseMove(rg2.map, {x:900, y:50}).mouseUp().perform();
    draw.undoGPSAdjust();
  });

  it('should allow you to lock the start handle', function() {
    browser.actions().mouseMove(rg2.map, hStart).mouseDown().mouseUp().perform();
    // hStart locked
  });

  it('should allow you to rotate the track with one handle locked', function() {
    browser.actions().mouseMove(rg2.map, {x:850, y:50}).mouseDown().mouseMove(rg2.map, {x:900, y:50}).mouseUp().perform();
    draw.undoGPSAdjust();
    // hStart locked
  });

  it('should allow you to unlock the start handle', function() {
    browser.actions().mouseMove(rg2.map, hStart).mouseDown().mouseUp().perform();
    // no handles locked
  });

  it('should not allow you to delete the last handle', function() {
    browser.actions().mouseMove(rg2.map, hEnd).click(protractor.Button.RIGHT).perform();
    // no handles locked
  });

  it('should allow you to lock the last handle', function() {
    browser.actions().mouseMove(rg2.map, hEnd).mouseDown().mouseUp().perform();
    // hEnd locked
  });

  it('should allow you to rotate the track with one handle locked', function() {
    browser.actions().mouseMove(rg2.map, {x:500, y:50}).mouseDown().mouseMove(rg2.map, {x:550, y:55}).mouseUp().perform();
    draw.undoGPSAdjust();
    // hEnd locked
  });

  it('should allow you to unlock the last handle', function() {
    browser.actions().mouseMove(rg2.map, hEnd).mouseDown().mouseUp().perform();
    // no handles locked
  });

  it('should allow you to add, lock and unlock h1', function() {
    browser.actions().mouseMove(rg2.map, h1).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, h1).mouseDown().mouseUp().perform();
    browser.actions().click(protractor.Button.RIGHT).perform();
    // no handles locked
  });

  it('should allow you to delete an unlocked handle', function() {
    browser.actions().mouseMove(rg2.map, h1).perform();
    browser.actions().click(protractor.Button.RIGHT).perform();
    // no handles locked
  });

  it('should allow you to add and lock a new handle', function() {
    browser.actions().mouseMove(rg2.map, h1).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, h1).mouseDown().mouseUp().perform();
    // h1 locked
  });

  it('should allow you to rotate the track with one locked handle', function() {
    browser.actions().mouseMove(rg2.map, {x:830, y:50}).mouseDown().mouseMove(rg2.map, {x:900, y:50}).mouseUp().perform();
    draw.undoGPSAdjust();
    // h1 locked
  });

  it('should allow you to lock the last handle', function() {
    browser.actions().mouseMove(rg2.map, hEnd).mouseDown().mouseUp().perform();
    // h1, hEnd locked
  });

  it('should do nothing if you drag  when not on a handle (case 1)', function() {
    browser.actions().mouseMove(rg2.map, {x:800, y:400}).mouseDown().mouseMove(rg2.map, {x:850, y:450}).mouseUp().perform();
    draw.undoGPSAdjust();
    // h1, hEnd locked
  });

  it('should do nothing if you drag a locked handle (case 2)', function() {
    browser.actions().mouseMove(rg2.map, h1).mouseDown().mouseMove(rg2.map, {x:850, y:450}).mouseUp().perform();
    draw.undoGPSAdjust();
    // h1, hEnd locked
  });

  it('should allow you to scale part of the track by dragging an unlocked handle between start and two locked handles (case 3)', function() {
    browser.actions().mouseMove(rg2.map, hStart).mouseDown().mouseMove(rg2.map, {x:850, y:450}).mouseUp().perform();
    draw.undoGPSAdjust();
    // h1, hEnd locked
  });

  it('should allow you change tabs when uploading a normal route', function() {
    rg2.showEventsTab();
    draw.showDrawTab();
  });

  it('should allow you to scale part of the track by dragging an unlocked handle between end and two locked handles (case 4)', function() {
    // h1, hEnd locked
    browser.actions().mouseMove(rg2.map, hEnd).mouseDown().mouseUp().perform();
    // h1 locked
    browser.actions().mouseMove(rg2.map, hStart).mouseDown().mouseUp().perform();
    // h1, hStart locked
    browser.actions().mouseMove(rg2.map, hEnd).mouseDown().mouseMove(rg2.map, {x:850, y:450}).mouseUp().perform();
    draw.undoGPSAdjust();
    // h1, hStart locked
  });

  it('should allow you to shear around a handle between two locked handles (case 5)', function() {
    // h1, hStart locked
    browser.actions().mouseMove(rg2.map, h2).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, h2).mouseDown().mouseUp().perform();
    browser.actions().mouseMove(rg2.map, h1).mouseDown().mouseUp().perform();
    // h2, hStart locked
    browser.actions().mouseMove(rg2.map, h1).mouseDown().mouseMove(rg2.map, {x:500, y:300}).mouseUp().perform();
    draw.undoGPSAdjust();
    // h2, hStart locked
  });

  it('should allow you to adjust the GPX route', function() {
	  browser.actions().dragAndDrop(rg2.map, {x: 20, y: 25}).perform();
	  draw.undoGPSAdjust();
	  browser.actions().dragAndDrop(rg2.map, {x: 10, y: 20}).perform();
    draw.undoGPSAdjust();
	  draw.lockBackground();
	  browser.actions().dragAndDrop(rg2.map, {x: 30, y: 20}).perform();
	});
  
  it('should save the GPX route', function() {
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("Your route has been saved.");
  });

  it('should allow you to add a second GPS result for the same person', function() {
    draw.courses.get(1).click();
    draw.names.get(2).click();
    draw.addComment('Second GPS result test');
	  draw.loadGPSFile(rg2.dir + '/test/data/ellenbrook.gpx');
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("Your route has been saved.");
  });

  it('should allow you to load a georeferenced Ellenbrook event', function() {
 		rg2.getEvent('158');
    rg2.showAboutDialog();
    expect(element(by.id('rg2-event-stats')).getText()).toContain(' Ellenbrook Saturday League: 2014-09-06');
    rg2.hideAboutDialog();
    draw.showDrawTab();
  });

  it('should allow you to upload a TCX file to a georeferenced map', function() {
    draw.courses.get(1).click();
    draw.names.get(1).click();
    draw.addComment('Protractor test comment');
	  draw.loadGPSFile(rg2.dir + '/test/data/ellenbrook.tcx');
  });
  
  it('should allow you to autofit the route', function() {
	  draw.autofit();
  });
  
  it('should allow you to adjust the autofit offset', function() {
    draw.adjustOffset(10);
	  draw.adjustOffset('+');
    draw.adjustOffset(0);
    draw.adjustOffset('-');
    draw.adjustOffset('+');
  });
  
  it('should allow you to save the adjusted route', function() {
	  draw.saveGPSRoute();
    browser.sleep(2000);
		rg2.acknowledgeWarning("Your route has been saved");
  });
  
  it('should warn you if the GPX file does not match the map location', function() {
    browser.sleep(1000);
    draw.courses.get(2).click();
    browser.sleep(1000);

    draw.names.get(6).click();
    browser.sleep(1000);

    draw.addComment('Protractor test comment');
    browser.sleep(2000);

	  draw.loadGPSFile(rg2.dir + '/test/data/verulamium.gpx');
    browser.sleep(2000);

		rg2.acknowledgeWarning("Your GPS file does not match the map");
  });
  
	it('should allow you to load a Hertford event with no results', function() {
 		rg2.getEvent('141');
    draw.showDrawTab();
  });
  
  it('should allow you to add a result and upload a GPS file', function() {
    draw.courses.get(1).click();
    draw.enterName('Hertford GPS test runner');
    draw.enterTime('22:22');
    draw.addComment('GPS Hertford test');
	  draw.loadGPSFile(rg2.dir + '/test/data/ellenbrook.tcx');
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("Your route has been saved");
  });

  it('should allow you to display the results tab', function() {
    result.showResultsTab();
  });
  
  it('should allow you to open the results list', function() {
    result.openResultsList(0);
  });
  
  it('should allow you to display all routes for this course', function() {
    expect(rg2.trackNames.isDisplayed()).toBe(false);
    cbxAllCourseTracks.first().click();
    expect(rg2.trackNames.isDisplayed()).toBe(true);
  });

  it('should allow you to hide all routes for this course', function() {
    cbxAllCourseTracks.first().click();
    expect(rg2.trackNames.isDisplayed()).toBe(false);
  });

  it('should select a Verulamium score event', function() {
   	rg2.loadRG2('#143', 'Verulamium Saturday League 2013-10-05');
    rg2.checkTitle('Verulamium Saturday League 2013-10-05');
    draw.showDrawTab();
  });

  it('should allow you to select a course', function() {
    draw.courses.get(1).click();
  });

  it('should allow you to select a name', function() {
    draw.names.get(2).click();
  });

  it('should allow you to upload a GPX file', function() {
    draw.loadGPSFile(rg2.dir + '/test/data/verulamium.gpx');
  });
  
  it('should allow you change tabs when uploading a score route', function() {
    rg2.showEventsTab();
    draw.showDrawTab();
  });
  
  it('should allow you to adjust a route', function() {
    // click to force test of handles on route
    browser.actions().click(rg2.map).perform();
  });
});