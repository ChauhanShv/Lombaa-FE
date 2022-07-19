$(document).ready(function () {
    $("#uploadField").hide();
    $("#imageButton").on('click', function () {
        $("#uploadField").toggle();
        $("#imageDisplay").toggle();
        $(this).text(function (i, text) {
            return text === "Change Media" ? "Cancel" : "Change Media";
        })
    });
});


// $(this).text($(this).text() == 'Order by Alphabet' ? 'Order by Category' : 'Order by Alphabet');