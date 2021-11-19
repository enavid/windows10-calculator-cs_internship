const fs = require('fs');
const path = require('path');

function readFile(req, res) {
    var filePath = path.join(__dirname, '../client/', req.url);

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('Not found error 404');
            res.end()
        } else {
            if (req.url.includes('js')) {
                res.setHeader('Content-Type', 'application/javascript')
            }
            res.writeHead(200);
            res.write(data);
            res.end();
        }
    })
}

module.exports = readFile;