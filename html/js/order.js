
setTimeout(function() {
    $('#noorder').hide();
    $('.newOrder').show();
}, 2000)



$('body').on('click', '.accept', function () {
    $('.accept').hide();
    $('.finish').show();
});

$('body').on('click', '.finish', function () {
    $('.finish').hide();
    $('.newOrder').hide();
    $('#noorder').show();
});
