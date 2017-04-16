import * as express from 'express';
import * as path from 'path';

let app = express();
let router = express.Router();

// app.use('/lib', express.static(path.resolve(__dirname, '../client/lib')));
// app.use(express.static(path.join(__dirname, '../client/lib')));
// app.use('/app', express.static(path.resolve(__dirname, '../client/app')));

app.enable('strict routing');
app.use(router);



// router.get('/lib*', function (req, res) {
//     console.log('requested static file:' + req.originalUrl);
//     // console.log('__dirname: ' + __dirname);
//     res.sendFile(path.resolve(__dirname, '../client' + req.originalUrl));
//     // res.send('bla');
// });

// router.get('/node_modules*', function (req, res) {
//     console.log('requested static file:' + req.originalUrl);
//     console.log('path: ' + path.resolve(__dirname, '../..' + req.originalUrl));
//     // console.log('__dirname: ' + __dirname);
//     res.sendFile(path.resolve(__dirname, '../..' + req.originalUrl));
//     // res.send('bla');
// });

// router.get('/app*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, '../client' + req.originalUrl));
// });

router.get('/node_modules*', function (req, res) {
    let returning = path.join(process.cwd(), req.originalUrl);
   // console.log('module: ' + req.originalUrl + ' ==> ' + returning);
   res.sendFile(returning);
});

router.get('/app*', function (req, res) {
    let returning = path.join(process.cwd(), 'dist/client', req.originalUrl);
    console.log('app: ' + req.originalUrl + ' ==> ' + returning);
    res.sendFile(returning);
});

router.get('/favicon.ico', function (req, res) {
    console.log('favicon: ' + req.originalUrl);
    res.sendFile(path.resolve(process.cwd(),'dist/assets/favicon.ico'));
});

router.get('/*', function (req, res) {
    console.log('home: ' + req.originalUrl);
    res.sendFile(path.resolve(process.cwd(),'dist/client/index.html'));
});

router.get('*', function (req, res) {
    console.log('fallback: ' + req.originalUrl);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000')
});
