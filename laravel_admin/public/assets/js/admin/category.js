$(document).ready(function () {
    var isParent = $("#parenttId");
    if ((isParent).is(':checked')) {
        $("#cattId").hide();
        $("#fieldId").hide();
    }
    
    $("#parenttId").on('click', function(){
        $("#cattId").toggle();
        $("#fieldId").toggle();
    });
});