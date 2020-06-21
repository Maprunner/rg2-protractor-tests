const { browser } = require('protractor');

describe('RG2 Manager Edit', function() {
  var rg2 = require('../page/rg2.page.js');
  var manager = require('../page/manager.page.js');
  
  var btnDeleteEvent = element(by.id('btn-delete-event'));
  var btnDeleteRoute = element(by.id('btn-delete-route'));
  var btnUpdateEvent = element(by.id('btn-update-event'));
  var dlgConfirmEditEvent = element(by.css('.rg2-confirm-update-dialog'));
  var dlgConfirmDeleteEvent = element(by.css('.rg2-confirm-delete-event-dialog'));
  var dlgConfirmDeleteRoute = element(by.css('.rg2-confirm-route-delete-dialog'));
  
  it('should allow you to log on as manager', function() {
     manager.startManager();
     manager.login();
  });

  it('should select an event and update event details', function() {
    manager.showEditTab();
    element(by.id('rg2-event-selected')).element(by.cssContainingText('option', '174:')).click();
    element(by.id('rg2-event-name-edit')).sendKeys(':edit');
    element(by.id('rg2-club-name-edit')).sendKeys(':edit');
    element(by.id('rg2-event-date-edit')).sendKeys('2014-14-01');
    element(by.id('rg2-event-date-edit')).sendKeys(protractor.Key.ENTER);
    element(by.id('rg2-event-level-edit')).all(by.css('option')).get(1).click();
    element(by.id('rg2-edit-event-comments')).sendKeys(' edit');
    btnUpdateEvent.click();
    dlgConfirmEditEvent.element(by.buttonText('Cancel')).click();
    btnUpdateEvent.click();
    dlgConfirmEditEvent.element(by.buttonText('Update event')).click();
    rg2.acknowledgeWarning("has been updated");
  });

  it('should delete a route', function() {
    element(by.id('rg2-event-selected')).element(by.cssContainingText('option', '157:')).click();
    // no easy way to wait for this event to load...
    browser.sleep(5000)
    element(by.id('rg2-route-selected')).element(by.cssContainingText('option', 'Simon Errington')).click();
    btnDeleteRoute.click();
    dlgConfirmDeleteRoute.element(by.buttonText('Cancel')).click();
    btnDeleteRoute.click();
    dlgConfirmDeleteRoute.element(by.buttonText('Delete route')).click();
    rg2.acknowledgeWarning();
  });


  it('should delete an event', function() {
    element(by.id('rg2-event-selected')).element(by.cssContainingText('option', '171:')).click();
    btnDeleteEvent.click();
    dlgConfirmDeleteEvent.element(by.buttonText('Cancel')).click();
    btnDeleteEvent.click();
    dlgConfirmDeleteEvent.element(by.buttonText('Delete event')).click();
    rg2.acknowledgeWarning("has been deleted");
  });
});
