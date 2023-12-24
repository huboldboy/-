var http = require('http')
var fs = require('fs')
http
    .createServer(function(req, res) {
        var url = req.url
        var file = './' + url
        fs.readFile(file, function(err, data) {
            if (err) {
                res.writeHeader(404, {
                    'content-type': 'text/html;charset="utf-8"'
                })
                res.write('<h1>404错误</h1><p>你要找的页面不存在</p>')
                res.end()
            } else {
                res.writeHeader(200, {
                    'content-type': 'text/html;charset="utf-8"'
                })
                res.write(data)
                res.end()
            }
        })
    })
    .listen(8080) //端口号