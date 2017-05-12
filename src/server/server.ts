import * as express from 'express';
import * as path from 'path';
import * as uuid from 'uuid/v4';
import * as os from 'os';
import * as fs from 'fs';
import * as multer from 'multer';
import { MongoClient, ObjectID } from 'mongodb';
import * as bodyParser from 'body-parser';

let app = express();
let router = express.Router();
let mongo = null;

app.use(bodyParser.json());

MongoClient.connect("mongodb://192.168.99.100:27017/image-hub", function (err, db) {
    // console.log('connecting to mongodb');
    if(!err) {
        console.log('connected to mongodb');
        mongo = db;
    } else {
        console.error(err);
    }
});

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

router.get('/api/collection', function (req, res) {
    mongo.collection('collection').find().toArray(function (err, result) {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            // console.log(result);
            res.send(result);
        }
    });
});

router.post('/api/collection', function (req, res) {
    console.log('New collection: ' + JSON.stringify(req.body));
    mongo.collection('collection').save(req.body, function (err, record) {
        if(!err) {
            console.log('success: ' + record);
        } else {
            console.error('error: ' + err);
        }
    });
    res.sendStatus(200);
});

router.delete('/api/collection/:id', function (req, res) {
    console.log('Deleting item ' + req.params.id);
    mongo.collection('collection').remove({_id: new ObjectID(req.params.id)}, function (err, result) {
        if(!err){
            console.log('success: ' + result);
        } else {
            console.error(err);
        }
    });
    res.sendStatus(200);
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
