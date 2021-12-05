$(document).ready(function () {

    var isParent = $("#parenttId");
    if ((isParent).is(':checked')) {
        $("#cattId").hide();
    }
    
    $("#parenttId").on('click', function(){

        $("#cattId").toggle();
    
    });

    $("#uploadField").hide();
    $("#imageButton").on('click', function(){
        $("#uploadField").toggle();
        $("#imageDisplay").toggle();
        $(this).text(function(i, text){
            return text === "Change Icon" ? "Cancel" : "Change Icon";
        })
    });
});


$(this).text($(this).text() == 'Order by Alphabet' ? 'Order by Category' : 'Order by Alphabet');
