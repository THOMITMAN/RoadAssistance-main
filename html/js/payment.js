
function paymentInit() {
  var query = getObjFromUrlParams(location.href);
  console.log(query);
  if (query && query.id) {
    loadScript();
  } else {
    toastGlobal('order is not exist', {icon: 'error'});
  }
}
paymentInit();


$('body').on('click', '#step7', function () {
  $('.step7').show();
  $('.step8').hide();
});


$('body').on('click', '#step8', function () {
  $('.step7').hide();
  $('.step8').show();
});

$('body').on('click', '.payOrderSubmit', function () {
  $('.step7').hide();
  $('.step8').hide();
  toastGlobal('pay success');
  router.push('/getHelp');
});



