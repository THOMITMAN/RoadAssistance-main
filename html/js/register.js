
// 注册rescuer
$('body').on('click', '.registerBox .submit1', async function () {
  var form = $('.registerBox .ab-tabs-con .is-active');
  var firstName = form.find('.firstName').val();
  var lastName = form.find('.lastName').val();
  var email = form.find('.email').val();
  var password = form.find('.password').val();
  var phonenumber = form.find('.phonenumber').val();
  var platenumber = form.find('.platenumber').val();
  let obj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phonenumber: phonenumber,
    platenumber: platenumber,
  }
  console.log(obj);
  try {
    $(this).addClass('is-loading')
    let res = await registerApi(obj);
    toastGlobal('register success')
    localStorage.setItem('userType', 'r');
  } catch (e) {
  } finally {
    $(this).removeClass('is-loading')
  }
})

// 注册customer
$('body').on('click', '.registerBox .submit2', async function () {
  var form = $('.registerBox .ab-tabs-con .is-active');
  var firstName = form.find('.firstName').val();
  var lastName = form.find('.lastName').val();
  var email = form.find('.email').val();
  var password = form.find('.password').val();
  var phonenumber = form.find('.phonenumber').val();
  var platenumber = form.find('.platenumber').val();
  let obj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phonenumber: phonenumber,
    platenumber: platenumber,
  }
  console.log(obj);
  try {
    $(this).addClass('is-loading')
    let res = await registerApi(obj);
    toastGlobal('register success')
    localStorage.setItem('userType', 'c');
  } catch (e) {
  } finally {
    $(this).removeClass('is-loading')
  }
})