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
        // $("#imageButton").toggle("Cancel");
        // $(this).text($(this).text() == 'Change Icon'? 'Change Icon' : 'Cancel');
        // var btn = document.getElementById("imageButton");
        // btn.innerHTML = 'Cancel';
    });
});


$(this).text($(this).text() == 'Order by Alphabet' ? 'Order by Category' : 'Order by Alphabet');


// $(document).ready(function () {
//     var category = $("#catId");
//     console.log(category);
//     $("#parentId").change(function () {
//         if ($(this).is(':checked')) {
//             console.log("checked")
//             $("#catId").attr("disabled", false);
//         }
//         else {
//             console.log("unchecked")
//             $("#catId").attr("disabled", "disabled");
//         }
//     });
// });

// $(document).ready(function () {
//     var parent = $('#catId option:selected').val();
//     if (!parent) {
//         $("#parentId").prop("checked", false);
//         $("#catId").attr("disabled", true);
//         console.log($("#catId"));
//     }
//     else {
//         $("#parentId").prop("checked", true);
//         $("#catId").attr("disabled", false);
//     }
//     $("#parentId").change(function () {
//         // var category = document.getElementById("catId");
//         // console.log("category", category)
//         if ($(this).is(':checked')) {
//             console.log("checked");
//             // $("#s2id_catId").attr("disabled", "disabled");
//             $("#catId").attr("disabled", true);
//             $('#catId').selectpicker('refresh');
//             // category.selectpicker('refersh')
//         }
//         else {
//             console.log("unchecked")
//             $("#catId").removeAttr('disabled');
//             $("#catId").selectpicker('refresh');
//         }
//     });
// });