/**
 *
 * @path 路由地址
 * @component 路由页面组件
 */
let routes = [];
let router = {
  push: (path, query) => {
    let queryStr = ''
    if (query) {
      queryStr = '?'
      for (const pathKey in query) {
        queryStr += `${pathKey}=${query[pathKey]}&`
      }
    }
    window.location.hash = path + queryStr;
  },
}
let currentPath = '/';
let app_div = document.getElementById('app');
function resolveRoute(route) {
  try {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path == route) {
        return routes[i];
      }
    }
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}

async function routerListen(evt) {
  let hash = window.location.hash ? window.location.hash.split('?')[0] : '#/'
  let url = hash.slice(1) || '/';
  if (window.beforeNavTop) {
    window.beforeNavTop(url);
  }
  let route = resolveRoute(url);
  currentPath = url;
  // 加载页面
  let html;

  try {
    app_div.innerHTML = '';
    if (route.html) {
      let resHtml = await fetch(route.html);
      html = await resHtml.text();
      app_div.innerHTML = html;
    }
    if (url == '/getHelp') {
      // document.getElementById('appgethelp').innerHTML = html;
      if (route.js) {
        let id = route.path + 'router';
        addScript(route.js, id, 'body');
      }
      $('#appgethelp').show();
    } else {
      $('#appgethelp').hide();
      if (route.js) {
        let id = route.path + 'router';
        addScript(route.js, id);
      }
    }
    if (window.setNavTop) {
      window.setNavTop(url);
    }
  } catch (e) {
    console.error('页面加载失败')
  }
  // location.reload();
}

window.addEventListener('load', routerListen);
window.addEventListener('hashchange', routerListen);


function addScript(src, id, type) {//手动添加script标签
  let routerId = document.getElementById(id);
  if (!routerId) {
    let script = document.createElement("script");
  
    // script.type = "text/JavaScript";
    script.type = type ? type : "module";
    script.id = id;
  
    script.src = src;
    if (type == 'body') {
      document.getElementsByTagName('body')[0].appendChild(script);
    } else {
      app_div.appendChild(script);
    }
  }
}

function getObjFromUrlParams(str) {
  const objUrl = {};
  const splitArr = str.split('?');
  if (splitArr.length === 1) return objUrl;
  const arrUrl = str.split('?')[1].split('&');
  for (let m = 0; m < arrUrl.length; m++) {
    objUrl[arrUrl[m].split('=')[0]] = arrUrl[m].split('=')[1];
  }
  return objUrl;
}

