describe('RG2 GPS', function() {
	var rg2 = require('../page/rg2.page.js');
	var draw = require('../page/draw.page.js');
	
	it('should allow you to show the draw tab', function() {
   	rg2.loadRG2();
 		rg2.getEvent('68');
    draw.showDrawTab();
  });

  it('should warn about a missing file', function() {
    draw.courses.get(1).click();
    draw.names.get(2).click();
    draw.addComment('Protractor test comment');
	  draw.loadGPSFile(rg2.dir + '/test/data/verulamium.abc');
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("File not found");
  });

  it('should warn about an invalid file', function() {
	  draw.loadGPSFile(rg2.dir + '/test/data/invalid.gpx');
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("File is not valid XML");
  });

  it('should warn about wrong file type', function() {
	  draw.loadGPSFile(rg2.dir + '/test/data/ellenbrook.csv');
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("File type not recognised");
  });

  it('should allow you to upload a GPX file to a non-georeferenced Verulamium map', function() {
	  draw.loadGPSFile(rg2.dir + '/test/data/verulamium.gpx');
  });
  
  it('should allow you change tabs when uploading a normal route', function() {
    rg2.showEventsTab();
    draw.showDrawTab();
  });

  it('should allow you to adjust the GPX route', function() {
	  browser.actions().dragAndDrop(rg2.map, {x: 100, y: 100}).perform();
	  draw.undoGPSAdjust();
	  browser.actions().dragAndDrop(rg2.map, {x: 50, y: 200}).perform();
	  draw.lockBackground();
	  browser.actions().dragAndDrop(rg2.map, {x: 50, y: 200}).perform();
  });

  it('should save the GPX route', function() {
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("Your route has been saved");
  });
  
  it('should allow you to add a second GPS result for the same person', function() {
    draw.courses.get(1).click();
    draw.names.get(2).click();
    draw.addComment('Second GPS result test');
	  draw.loadGPSFile(rg2.dir + '/test/data/ellenbrook.gpx');
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("Your route has been saved");
  });

  it('should allow you to load a georeferenced Ellenbrook event', function() {
 		rg2.getEvent('158');
    draw.showDrawTab();
  });

  it('should allow you to upload a TCX file to a georeferenced map', function() {
    draw.courses.get(1).click();
    draw.names.get(1).click();
    draw.addComment('Protractor test comment');
	  draw.loadGPSFile(rg2.dir + '/test/data/ellenbrook.tcx');
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning("Your route has been saved");
  });
  
  it('should warn you if the GPX file does not match the map location', function() {
    draw.courses.get(2).click();
    draw.names.get(6).click();
    draw.addComment('Protractor test comment');
	  draw.loadGPSFile(rg2.dir + '/test/data/verulamium.gpx');
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

  it('should select a Verulamium score event', function() {
    rg2.loadRG2();
    rg2.getEvent('103');
    draw.showDrawTab();
  });
  
  it('should allow you to upload a GPX file', function() {
    draw.courses.get(1).click();
    draw.names.get(2).click();
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