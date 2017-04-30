import * as express from 'express';
import * as path from 'path';
import * as uuid from 'uuid/v4';
import * as os from 'os';
import * as fs from 'fs';
import * as multer from 'multer';

let app = express();
let router = express.Router();

// let upload = multer();



let storage = multer.diskStorage({
   destination: function (req, file, cb) {
       let filePath = path.join(os.tmpdir(),'image-hub-files');
       fs.mkdir(filePath, function () {
           console.log('Storage: ' + filePath);
           cb(null, filePath);
       })},
    filename: function (req, file, cb) {
       let fileName = uuid() + '.' + file.originalname.split('.').pop();
        cb(null, fileName);
    }
   }
);

let upload = multer({ storage: storage }).array('filesToUpload');

// let upload = multer({ storage: storage });



// console.log('api: ' + req.originalUrl);
// let filePath = path.join(os.tmpdir(),'image-hub-files');
// console.log('writing to path: ' + filePath);
//
// fs.mkdir(filePath,function () {
//     let newFileName = uuid();
//     let fullName = path.join(filePath, newFileName);
//     console.log('File name: ' + fullName);
//     fs.open(fullName, 'w', function () {
//         console.log('done writing?');
//     });
// });







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

// router.get('/api/file', function (req, res) {
//     console.log('get api');
//    res.send('result of /api/file');
// });




router.post('/api/file', function (req, res) {
    console.log('api: ' + req.originalUrl);

    // let filePath = path.join(os.tmpdir(),'image-hub-files');
    // console.log('writing to path: ' + filePath);
    //
    // fs.mkdir(filePath,function () {
    //     let newFileName = uuid();
    //     let fullName = path.join(filePath, newFileName);
    //     console.log('File name: ' + fullName);
    //     fs.open(fullName, 'w', function () {
    //        console.log('done writing?');
    //     });
    // });
    upload(req, res, function (err) {
        if(err) {
            console.error(err);
            return;
        }
    });
    // os.tmpdir()

    // let tempFile = uuid();

    res.send('file uploaded successfully');
    // res.sendStatus(500);
    // res.sendStatus(404);
});

router.get('/*', function (req, res) {
    console.log('home: ' + req.originalUrl);
    res.sendFile(path.resolve(process.cwd(),'dist/client/index.html'));
});

router.get('/*', function (req, res) {
    console.log('fallback: ' + req.originalUrl);
});

router.post('/*', function (req, res) {
    console.log('fallback post: ' + req.originalUrl);
});

router.all('/*', function (req, res) {
    console.log('most generic fallback');
});


app.all('*', function (req, res) {
    console.log('does any of those fallbacks work?');
    res.send();
});

app.listen(3000, function () {
    console.log('Image hub server listening on port 3000')
});
