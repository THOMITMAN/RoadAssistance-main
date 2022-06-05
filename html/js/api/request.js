
// 接口域名, 开发，生产环境不需要了
// let domain = 'http://101.200.142.192:5001'
// 接口开头地址
let baseUrl = '/api'

// 请求统一处理函数
function request(options) {
  return new Promise((resolve, reject) => {
    $.ajax({
      // 默认添加请求头
      headers: {
        // "auth": getToken(),
        // "Content-Type": "application/json",
      },
      type: options.type ? options.type : 'post',
      dataType: "json",
      // url: domain + options.url,
      url: baseUrl + options.url,
      // json 格式
      // data: options.data ? JSON.stringify(options.data) : {},
      // formData 格式
      data: options.data ? options.data : {},
      // processData: false,
      success: function (result) {
        if (!result.success) {
          toastGlobal(res.msg, {icon: 'error'})
          reject(result)
        } else {
          resolve(result)
        }
      },
      error: function (result) {
        toastGlobal('network error', {icon: 'error'});
        reject(result)
      },
    })
  })
}
