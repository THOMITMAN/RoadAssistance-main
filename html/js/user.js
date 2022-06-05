
$('body').on('click', '#logout', () => {
  localStorage.setItem('userType', '');
  $('#navNotLogin').show();
  $('#navHasLogin').hide();
  router.push('/');
})



