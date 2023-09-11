$(document).ready(function() {
    $(".toggle-icon").click(function() {
        var $toggleIcon = $(this);
        var currentState = $toggleIcon.attr("data-state");

        if (currentState === "on") {
            $toggleIcon.removeClass("bi-toggle2-on").addClass("bi-toggle2-off");
            $toggleIcon.attr("data-state", "off");
            $(this).toggleClass("gris");
        } else {
            $toggleIcon.removeClass("bi-toggle2-off").addClass("bi-toggle2-on");
            $toggleIcon.attr("data-state", "on");
        }
    });
});

function seleccionarImagen(){
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            console.log("Imagen seleccionada:", selectedImage);
        }
    });
    
    input.click();
  }