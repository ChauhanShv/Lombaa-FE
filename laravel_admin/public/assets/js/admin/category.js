$(document).ready(function () {
    var isParent = $("#parenttId");
    if ((isParent).is(':checked')) {
        $("#cattId").hide();
    }
    
    $("#parenttId").on('click', function(){

        $("#cattId").toggle();
    
    });
});