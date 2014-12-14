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
	  draw.loadGPSFile('c:/xampp/htdocs/rg2-test-data/test/data/verulamium.abc');
	  draw.saveGPSRoute();
	  // file not found error message
		rg2.acknowledgeWarning();
  });

  it('should warn about an invalid file', function() {
	  draw.loadGPSFile('c:/xampp/htdocs/rg2-test-data/test/data/invalid.gpx');
	  draw.saveGPSRoute();
	  // invalid file format error message
		rg2.acknowledgeWarning();
  });

  it('should allow you to upload a GPX file to a non-georeferenced Verulamium map', function() {	  
	  draw.loadGPSFile('c:/xampp/htdocs/rg2-test-data/test/data/verulamium.gpx');
  });
  
  it('should allow you to adjust the GPX route', function() {
	  browser.actions().dragAndDrop(rg2.map, {x: 100, y: 100}).perform();
	  draw.undo();
	  browser.actions().dragAndDrop(rg2.map, {x: 50, y: 200}).perform();	  
	  draw.saveGPSRoute();
		rg2.acknowledgeWarning();
  });

  it('should allow you to load a georeferenced Ellenbrook event', function() {
 		rg2.getEvent('158');
    draw.showDrawTab();
  });

  it('should allow you to upload a TCX file to a georeferenced map', function() {
    draw.courses.get(1).click();
    draw.names.get(1).click();
    draw.addComment('Protractor test comment');
	  draw.loadGPSFile('c:/xampp/htdocs/rg2-test-data/test/data/ellenbrook.tcx');
	  draw.saveGPSRoute();
		browser.sleep(1000);
		rg2.acknowledgeWarning();
  });
  
  it('should warn you if the GPX file does not match the map location', function() {
    draw.courses.get(2).click();
    draw.names.get(2).click();
    draw.addComment('Protractor test comment');
	  draw.loadGPSFile('c:/xampp/htdocs/rg2-test-data/test/data/verulamium.gpx');
		rg2.acknowledgeWarning();
  });
  
});