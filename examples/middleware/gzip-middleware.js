/*
  gzip-middleware.js: Basic example of `connect-gzip` middleware in node-http-proxy

  Copyright (c) 2013 - 2016 Charlie Robbins, Jarrett Cruger & the Contributors.

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var http = require('http'),
    connect = require('connect'),
    httpProxy = require('../../lib/http-proxy.js');

//
// Basic Connect App
//
connect.createServer(
  connect.compress({
    // Pass to connect.compress() the options
    // that you need, just for show the example
    // we use threshold to 1
    threshold: 1
  }),
  function (req, res) {
    proxy.web(req, res);
  }
).listen(8012);

//
// Basic Http Proxy Server
//
var proxy = httpProxy.createProxyServer({
  target: 'http://localhost:9012'
});

//
// Target Http Server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9012);

console.log('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8012'.yellow);
console.log('http server '.blue + 'started '.green.bold + 'on port '.blue + '9012 '.yellow);
