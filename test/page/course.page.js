var CoursePage = function() {
  var EC = protractor.ExpectedConditions;
  this.body = element(by.id('rg2-course-list'));
  this.coursesTab = element(by.id('rg2-courses-tab'));
  this.list = element.all(by.css('.courselist'));
  this.allCourses = element.all(by.css('.allcourses')).first();
    
  this.showCoursesTab = function() {
    this.coursesTab.click();
    browser.wait(EC.visibilityOf(this.body), 2000);
    expect(this.body.isDisplayed()).toBe(true);
  };
  
  this.showCourse = function(index) {
     expect(this.list.get(index).getAttribute('checked')).toBeFalsy;
     this.list.get(index).click();
     expect(this.list.get(index).getAttribute('checked')).toBeTruthy;
  };
  
  this.hideCourse = function(index) {
     expect(this.list.get(index).getAttribute('checked')).toBeTruthy;
     this.list.get(index).click();
     expect(this.list.get(index).getAttribute('checked')).toBeFalsy;
  };

  this.showAllCourses = function() {
     this.allCourses.click();
     expect(this.allCourses.getAttribute('checked')).toBeTruthy;
  };

  this.hideAllCourses = function() {    
     this.allCourses.click();
     expect(this.allCourses.getAttribute('checked')).toBeFalsy;
  };
};

module.exports = new CoursePage();