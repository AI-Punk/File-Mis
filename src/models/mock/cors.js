var express = require('express');
var fs = require('fs')
var app = express();

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
app.get('/cors/cookie', function (req, res) {
  console.log('receive', req)
    let dataSource = JSON.parse(fs.readFileSync('./hema/hema-data.json').toString());
    let config = JSON.parse(fs.readFileSync('./hema/hema-config.json').toString());
    res.send(JSON.stringify({
      dataSource: dataSource,
      config: config
    }));
})

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
