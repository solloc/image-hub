import * as express from 'express';
import * as path from 'path';

let app = express();

app.get('/', function (req, res) {
    console.log('got a request ...');
    // res.send('Hello World!')
    // res.sendFile('../client/index.html');
    res.sendFile(path.resolve(__dirname,'../client/index.html'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000')
});
