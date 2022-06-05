
// 登录用户类型 rescuer customer
var userType = 'r'
// 登录 rescuer
$('body').on('click', '.loginBox .submit1', async function () {
    userType = 'r'
    localStorage.setItem('userType', 'r');
    var form = $('.loginBox .ab-tabs-con .is-active');
    var userid = form.find('.userid').val();
    var password = form.find('.password').val();
    let obj = {
        userid: userid,
        password: password,
    }
    console.log(obj);
    try {
        $(this).addClass('is-loading')
        // let res = await loginApi(obj);
        toastGlobal('success')
        // 跳转 订单 页面
        router.push('/order');
    } catch (e) {
        console.log(e);
    } finally {
        $(this).removeClass('is-loading')
    }
})

// 登录 customer
$('body').on('click', '.loginBox .submit2', async function () {
    userType = 'c'
    localStorage.setItem('userType', 'c');
    var form = $('.loginBox .ab-tabs-con .is-active');
    var userid = form.find('.userid').val();
    var password = form.find('.password').val();
    let obj = {
        userid: userid,
        password: password,
    }
    console.log(obj);
    try {
        // $(this).addClass('is-loading')
        // let res = await loginApi(obj);
        toastGlobal('success')
        // 跳转 getHelp 页面
        router.push('/getHelp');
    } catch (e) {
        console.log(e);
    } finally {
        $(this).removeClass('is-loading')
    }
})

// 重置密码 submit3
$('body').on('click', '.loginBox .submit3', async function () {
    var form = $('.loginBox .ab-tabs-con .is-active');
    var phoneReset = form.find('.phoneReset').val();
    var codeReset = form.find('.codeReset').val();
    var passwordReset = form.find('.passwordReset').val();

    let obj = {
        phoneReset: phoneReset,
        codeReset: codeReset,
        passwordReset: passwordReset,
    }
    console.log(obj);
    try {
        // $(this).addClass('is-loading')
        // let res = await loginApi(obj);
        toastGlobal('reset success')
        if (userType == 'c') {
            // 跳转 getHelp 页面
            router.push('/getHelp');
        } else {
            router.push('/order');
        }
    } catch (e) {
        console.log(e);
    } finally {
        $(this).removeClass('is-loading')
    }
})

// 点击变成 手机号登录
$('body').on('click', '.loginBox .changeDivItem1', async function () {
    $('.loginType1').removeClass('active');
    $('.loginType2').addClass('active');
})
// 点击变成 用户ID登录
$('body').on('click', '.loginBox .changeDivItem3', async function () {
    $('.loginType2').removeClass('active');
    $('.loginType1').addClass('active');
})

// 点击忘记密码
$('body').on('click', '.loginBox .changeDivItem2', async function () {
    $('.loginNormal').hide();
    $('.resetPwd').show();
})

// 点击返回
$('body').on('click', '.loginBox .backImgBox', async function () {
    $('.loginNormal').show();
    $('.resetPwd').hide();
})

// 点击 sendCode
$('body').on('click', '.loginBox .sendCode', async function () {
    toastGlobal('sent success');
})

