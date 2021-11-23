$(document).ready(function () {
    var category = $("#catId");
    console.log(category);
    $("#parentId").change(function () {
        if ($(this).is(':checked')) {
            console.log("checked")
            $("#catId").attr("disabled", false);
        }
        else {
            console.log("unchecked")
            $("#catId").attr("disabled", "disabled");
        }
    });
});