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

app.enable('strict routing');





app.use(router);


router.get('/node_modules*', function (req, res) {
    let returning = path.join(process.cwd(), req.originalUrl);
   // console.log('module: ' + req.originalUrl + ' ==> ' + returning);
   res.sendFile(returning);
});

router.get('/app*', function (req, res) {
    let returning = path.join(process.cwd(), 'dist/client', req.originalUrl);
    // console.log('app: ' + req.originalUrl + ' ==> ' + returning);
    res.sendFile(returning);
});

router.get('/favicon.ico', function (req, res) {
    // console.log('favicon: ' + req.originalUrl);
    res.sendFile(path.resolve(process.cwd(),'dist/assets/favicon.ico'));
});

router.post('/api/file', function (req, res) {
    console.log('api: ' + req.originalUrl);

    upload(req, res, function (err) {
        if(err) {
            console.error(err);
            return;
        }
    });

    res.send('file uploaded successfully.');
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
