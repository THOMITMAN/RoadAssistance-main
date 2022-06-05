

function loginApi(data) {
  return request({
    url: '/login',
    type: 'post',
    data: data,
  })
}

function testApi(data) {
  return request({
    url: '/login',
    type: 'post',
    data: data,
  })
}

function registerApi(data) {
  return request({
    url: '/register',
    type: 'post',
    data: data,
  })
}
// 提交地理位置
function submitProblemApi(data) {
  return request({
    url: '/submitProblem',
    type: 'post',
    data: data,
  })
}
// 获取订单状态
function getOrderStatusApi(data) {
  return request({
    url: '/getOrderStatus',
    type: 'post',
    data: data,
  })
}