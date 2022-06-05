
$('body').on('click', '#pay1', function () {
    $('.step9').show();
    $('.step10').hide();
    $('.step11').hide();

    $('body').addClass('bodyBg');
});
$('body').on('click', '#pay2', function () {
    $('.step9').show();
    $('.step10').hide();
    $('.step11').hide();
    $('body').addClass('bodyBg');
});
$('body').on('click', '#pay3', function () {
    $('.step9').show();
    $('.step10').hide();
    $('.step11').hide();
    $('body').addClass('bodyBg');
});








$('body').on('click', '#step7', function () {
    $('.step10').show();
    $('.step11').hide();
});


$('body').on('click', '#step8', function () {
    $('.step10').hide();
    $('.step11').show();
});

$('body').on('click', '.payOrderSubmit', function () {
    $('.step10').hide();
    $('.step11').hide();
    $('.step9').hide();
    toastGlobal('pay success');
    $('body').removeClass('bodyBg');
});

