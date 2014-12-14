var CoursePage = function() {

	this.body = element(by.id('rg2-course-list'));
	this.coursesTab = element(by.id('rg2-courses-tab'));
  this.list = element.all(by.css('.courselist'));
	  
	this.showCoursesTab = function() {
		this.coursesTab.element(by.id('ui-id-2')).click();
		expect(this.body.isDisplayed()).toBe(true);
	};
	
	this.showAllCourses = function() {
    element(by.css('.allcourses')).click();
	};

	this.hideAllCourses = function() {
    element(by.css('.allcourses')).click();
	};
	
	this.showCourse = function(id) {
		if (this.list.get(id).getAttribute("checked") == false) {
     this.list.get(id).click();
     expect(this.list.get(id).getAttribute("checked")).toBe(true);
		}
	};
	
	this.hideCourse = function(id) {
		if (this.list.get(id).getAttribute("checked") == true) {
     this.list.get(id).click();
     expect(this.list.get(id).getAttribute("checked")).toBe(false);
		}
	};
};

module.exports = new CoursePage();