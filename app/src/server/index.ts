import * as express from 'express'

let app = express();

app.get('/', function (req, res) {
    console.log('got a request');
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000')
});