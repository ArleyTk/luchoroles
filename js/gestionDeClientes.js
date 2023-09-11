$(document).ready(function () {
    $(".toggle-icon").click(function () {
        var $toggleIcon = $(this);
        var currentState = $toggleIcon.attr("data-state");

        if (currentState === "on") {
            $toggleIcon.removeClass("bi-toggle2-on").addClass("bi-toggle2-off");
            $toggleIcon.attr("data-state", "off");
            $(this).toggleClass("gris");
        } else {
            $toggleIcon.removeClass("bi-toggle2-off").addClass("bi-toggle2-on");
            $toggleIcon.attr("data-state", "on");
            $(this).toggleClass("gris");
        }
    });

    $(".iClienteFrecuente").click(function () {
        $(this).toggleClass("fa-user-plus fa-user-minus");
        $(this).toggleClass("gris");
    });

    
});

