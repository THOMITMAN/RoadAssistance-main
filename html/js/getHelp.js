
loadScript();

$('body').on('click', '#getCenter', async function () {
  var form = $('#mapInfo');
  // 位置名称
  var locate = form.find('.locate').val();
  if (!locate) {
    toastGlobal('please input your location', {
      icon: 'warning',
    })
    return;
  }
  // startSearch();

  var request = {
    query: locate,
    fields: ['name', 'geometry'],
  };
  // console.log(request);
  service.findPlaceFromQuery(request, function (results, status) {
    console.log(status);
    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      myMap.setCenter(results[0].geometry.location);
    }
  });

  // let res = await searchPlaceGoogleApi({
  //   input: 'University of Wollongong',
  //   inputtype: 'textquery',
  //   language: 'en',
  // });
  // console.log(res);
//   getCenter()
//   var p1 = new google.maps.LatLng(45.463688, 9.18814);
//   var p2 = new google.maps.LatLng(46.0438317, 9.75936230000002);
//
//   alert(calcDistance(p1, p2));
//
// //calculates distance between two points in km's
//   function calcDistance(p1, p2) {
//     return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
//   }

  // var directionsService = new google.maps.DirectionsService();
  // var directionsDisplay = new google.maps.DirectionsRenderer();
  // directionsDisplay.setMap(myMap);
  // var request = {
  //   origin: { lat: 25.034010, lng: 121.562428 },
  //   destination: { lat: 25.037906, lng: 121.549781 },
  //   travelMode: 'DRIVING'
  // };
  // directionsService.route(request, function (result, status) {
  //   if (status == 'OK') {
  //     // 回傳路線上每個步驟的細節
  //     console.log(result.routes[0].legs[0].steps);
  //     directionsDisplay.setDirections(result);
  //   } else {
  //     console.log(status);
  //   }
  // });

})

function getCenter() {
  if (myMap) {
    // 返回地图的中心的纬度/经度。
    var center = myMap.getCenter();
    console.log(center);
    // 返回当前地图类型。
    console.log(myMap.getMapTypeId());
  }
}


$('body').on('click', '.imgItem', function () {
  // $(this).siblings().removeClass('active');
  // $(this).addClass('active');
  var check = $(this).find('input');
  var val = check.prop('checked');
  console.log(val);
  check.prop("checked",function(){
    return !val;
  });
  // check.attr("checked",'checked');
  // check.val(!val);
});

let timer;
let step2Ok = false;
// 提交问题表单
$('body').on('click', '#submitMapInfo', async function () {
  var form = $('#mapInfo');
  // 位置名称
  var locate = form.find('.locate').val();
  // 手机号码
  var phonenumber = form.find('.phone').val();
  // description
  var description = form.find('.description').val();
  // rego
  var rego = form.find('.rego').val();
  // other
  var other = form.find('.other').val();
  // 选中 问题图片的顺序
  // var index = $('.problemBox .active').parent().find('.imgItem').index(this);
  // console.log(index);
  var checkArr = [];
  var checkList = $('.problemBox').find('input').each(function() {
    var c = $(this);
    if (c.prop('checked') ==true) {
      checkArr.push(c.val());
    }
  });
  console.log(checkArr);


  var obj = {
    locate: locate,
    phonenumber: phonenumber,
    index: checkArr.join(','),
    description: description,
    rego: rego,
    other: other,
  }

  try {
    $(this).addClass('is-loading')
    // let res = await submitProblemApi(obj);
    toastGlobal('submit success')

    // 提交成功之后，轮询 调用接口，获取系统是否接单
    timer = setInterval(function () {
      console.log('getOrderInfo');
      getOrderInfo();
    }, 3000)

    setTimeout(function () {
      step2Ok = true;
    }, 2000)

    $('.step1').hide();
    $('.step2').show();
  } catch (e) {
  } finally {
    $(this).removeClass('is-loading')
  }
});

//轮询 调用接口，获取系统是否接单
function getOrderInfo() {

  try {
    // let res = await getOrderStatusApi(obj);
    // 判断系统是否 接单
    if (step2Ok) {
      // 如果已经接单，停止定时器
      clearInterval(timer);
      // 显示成功接单
      $('.step1').hide();
      $('.step2').hide();
      $('.step3').show();

      // 2秒后，显示 Waiting for Order Payment 界面
      setTimeout(function () {
        $('.step1').hide();
        $('.step2').hide();
        $('.step3').hide();
        $('.step4').show();
      }, 2000)
    }
  } catch (e) {

  } finally {

  }
}

// 点击 Click to Payment Page
$('body').on('click', '#toPay', function () {
  $('.step1').hide();
  $('.step2').hide();
  $('.step3').hide();
  $('.step4').hide();
  $('.step5').hide();
  router.push('/payment', {
    id: localStorage.getItem('orderId')
  })
});



