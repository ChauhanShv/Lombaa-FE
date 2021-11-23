$(document).ready(function () {
    var parent = $('#catId option:selected').val();
    if (!parent) {
        $("#parentId").prop("checked", false);
        $("#catId").attr("disabled", true);
        console.log($("#catId"));
    }
    else {
        $("#parentId").prop("checked", true);
        $("#catId").attr("disabled", false);
    }
    $("#parentId").change(function () {
        // var category = document.getElementById("catId");
        // console.log("category", category)
        if ($(this).is(':checked')) {
            console.log("checked");
            // $("#s2id_catId").attr("disabled", "disabled");
            $("#catId").attr("disabled", true);
            $('#catId').selectpicker('refresh');
            // category.selectpicker('refersh')
        }
        else {
            console.log("unchecked")
            $("#catId").removeAttr('disabled');
            $("#catId").selectpicker('refresh');
        }
    });
});