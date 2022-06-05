let express = require('express');
let app = express()

let { createProxyMiddleware } = require('http-proxy-middleware');
const options = {
  // target: 'http://101.200.142.192:5001',
  target: 'http://192.168.5.60:5001',
  changeOrigin: true,
  ws: true,
  secure: true,
  pathRewrite: {
    '/api': '/api',
  },
};

// app.use('/', express.static('./html'))
app.use('/', express.static(__dirname))
app.use('/api', createProxyMiddleware(options));

app.listen(3000,()=>{
  console.log("server running at http://localhost:3000")
})