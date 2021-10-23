$(document).ready(function() {
    $('#deposit_list').DataTable({
        "paging":   false,
        "ordering": false,
        "info":     false
    });

    $('#gst_percentage').keyup(function() {
        var gst = this.value;
        var amount = $('#amount').val();
        var gstAmount = (gst / 100) * amount;
        var netAmount = amount - gstAmount;
        $('#gst_amount').text(gstAmount);
        $('#net_amount').text(netAmount);
    });
});
