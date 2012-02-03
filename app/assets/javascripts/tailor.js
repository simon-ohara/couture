(function(window) {
  // private properties & methods

  // public properties & methods
  var properties = {},
      
      methods = {
        measure_up: function() {
          // Initialisation function
          var html_tag = $('html');
          Tailor.has_measured = html_tag.hasClass('measured');
          Tailor.measurements = html_tag.attr('class');
          if(!Tailor.has_measured) Tailor.send_measurements(Tailor.measurements);
        },
        send_measurements: function(measurements) {
          $.ajax({
            type: "POST",
            url: "#",
            data: measurements
          });
        }
      };
  
  // Constructor functionality
  window.Tailor = $.extend({}, methods, properties);

  Tailor.measure_up();

})(window);