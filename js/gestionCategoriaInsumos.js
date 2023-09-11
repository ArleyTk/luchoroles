// Esta línea indica que el código dentro de la función se ejecutará una vez que el documento HTML esté completamente cargado y listo.
$(document).ready(function() {
    $(".toggle-icon").click(function() {
      var $toggleIcon = $(this);
      var currentState = $toggleIcon.attr("data-state");

      if (currentState === "on") {
        $toggleIcon.removeClass("fa-toggle-on").addClass("fa-toggle-off");
        $toggleIcon.attr("data-state", "off");
      } else {
        $toggleIcon.removeClass("fa-toggle-off").addClass("fa-toggle-on");
        $toggleIcon.attr("data-state", "on");
      }
    });
  });