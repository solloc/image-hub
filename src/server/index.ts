import * as express from 'express';
import * as path from 'path';

let app = express();

app.use('/lib', express.static(path.resolve(__dirname, 'lib')));

app.get('/', function (req, res) {
    console.log('got a request ...... 1234 ... finally...');
    // res.send('Hello World!')
    // res.sendFile('../client/index.html');
    res.sendFile(path.resolve(__dirname,'../client/index.html'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000')
});
