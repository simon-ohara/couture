require('/assets/tailor.js')
//stylesheet('/assets/application.css');

describe("Tailor", function() {
  template('_templates/tailor.html');

  describe("Initialisation", function() {

    it("should instantiate the tailor object", function() {
      expect(Tailor).toBeDefined();
    });

    it("should store the measurements as a string", function() {
      expect(typeof(Tailor.measurements)).toBe("string");
    });

    it("should match the class attribute of the html tag", function() {
      // TODO:  fails if modernizr includes webp and data-uri shims from community add-ons
      expect(Tailor.measurements).toEqual($('html').attr('class'));
    });

    describe("when tailor session exists", function() {
      // assumes the html tag is given a class signifying the tailor session exists
      beforeEach(function() {
        $('html').addClass("measured");
        Tailor.measure_up();
      });

      it("should set session flag to true", function() {
        expect(Tailor.has_measured).toBeTruthy();
      });

      it("should NOT send measurements to the server", function() {
        spyOn(Tailor, 'send_measurements');
        Tailor.measure_up();
        expect(Tailor.send_measurements).not.toHaveBeenCalled();
      });
    });

    describe("when the tailor session does not exist", function() {
      beforeEach(function() {
        $('html').removeClass("measured");
        Tailor.measure_up();
      });

      it("should set the session flag to false", function() {
        expect(Tailor.has_measured).toBeFalsy();
      });

      it("should send measurements to the server", function() {
        spyOn(Tailor, 'send_measurements');
        Tailor.measure_up();
        expect(Tailor.send_measurements).toHaveBeenCalled();
      });
    });

  });

  describe("Notifying the server", function() {
    it("should call send_measurements with the measurements string", function() {
      spyOn(Tailor, 'send_measurements');
      Tailor.measure_up();
      expect(Tailor.send_measurements).toHaveBeenCalledWith(Tailor.measurements);
    });

    it("should send_measurements the server with the ajax api", function() {
      spyOn($, 'ajax').andCallThrough();
      Tailor.measure_up();
      expect($.ajax).toHaveBeenCalled();
    });

    it("should use the POST method for ajax call", function() {
      var ajaxSpy = spyOn($, 'ajax').andCallThrough();
      Tailor.measure_up();
      expect(ajaxSpy.mostRecentCall.args[0].type).toEqual("POST");
    });

    it("should send the measurements string as data", function() {
      var ajaxSpy = spyOn($, 'ajax').andCallThrough();
      Tailor.measure_up();
      expect(ajaxSpy.mostRecentCall.args[0].data).toEqual(Tailor.measurements);
    });

    it("should be posting to the styler controller", function() {
      var ajaxSpy = spyOn($, 'ajax').andCallThrough();
      Tailor.measure_up();
      expect(ajaxSpy.mostRecentCall.args[0].url).toEqual("#");
    });
  });
});