const multer = require('multer');
const fs = require('fs-extra');
const sessionMethod = require('./session/session');
const rootMethod = require('./root');
const userMethod = require('./user/user');
const postMethod = require('./post/post');
const categoryMethod = require('./category/category');
const commonMethod = require('./common');
const mongoose = require('mongoose');
const {Schema} = mongoose;

class adminWeb {

    constructor(express, bodyParser, db, config) {
        this.express = express;
        this.db = db;
        this.config = config;
        this.bodyParser = bodyParser;
        this.init();
        this.models();
    }

    init() {
        fs.ensureDirSync(this.config.tmp_upload_path);
        fs.ensureDirSync(this.config.upload_files);
    }

    models() {
        this.sessionSchema = new Schema({
            host: String,
            user: Object
        }, {timestamps: true});
        this.sessionObject = this.db.model('session', this.sessionSchema);

        this.userSchema = new Schema({
            username: String,
            password: String
        }, {timestamps: true});
        this.userObject = this.db.model('user', this.userSchema);

        this.categorySchema = new Schema({
            title: String,
            slug: String
        }, {timestamps: true});
        this.categoryObject = this.db.model('category', this.categorySchema);

        this.postSchema = new Schema({
            title: String,
            slug: String,
            intro: String,
            content: String,
            category: [{ type: Schema.Types.ObjectId, ref: 'category' }],
            file: Object
        }, {timestamps: true});
        this.postObject = this.db.model('post', this.postSchema);


    }


    start() {
        const app = this.express();
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.config.tmp_upload_path)
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now())
            }
        });

        const upload = multer({storage: storage});
        app.set('port', this.config.port);
        app.use(this.bodyParser.json());
        app.use(this.bodyParser.urlencoded({extended: true}));
        app.use('/images', this.express.static('images'));
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', this.config.allow_origin);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader("Access-Control-Allow-Headers", "*");
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });

        this.serverCheckHeader(app);
        this.serverRoot(app);
        this.serverUser(app);
        this.serverSession(app);
        this.serverPost(app, upload);
        this.serverCategory(app, upload);
        app.listen(app.get('port'), () => {
            console.log('admin running on port', app.get('port'))
        });
    }

    serverCategory(app, upload) {
        categoryMethod.list(app, this.categoryObject, this.config);
        categoryMethod.add(app, this.categoryObject, upload, this.config);
        categoryMethod.modify(app, this.categoryObject, upload, this.config);
        categoryMethod.get(app, this.categoryObject, this.config);
        commonMethod.remove(app, 'category', this.categoryObject, this.config);
    }

    serverPost(app, upload) {
        postMethod.list(app, this.postObject, this.config);
        postMethod.add(app, this.postObject, upload, this.config);
        postMethod.modify(app, this.postObject, upload, this.config);
        postMethod.get(app, this.postObject, this.config);
        commonMethod.remove(app, 'post', this.postObject, this.config);
    }

    serverUser(app) {
        userMethod.list(app, this.userObject, this.config);
        userMethod.init(app, this.userObject, this.config);
        userMethod.add(app, this.userObject, this.config);
        userMethod.modify(app, this.userObject, this.config);
        commonMethod.remove(app, 'user', this.userObject, this.config);
        userMethod.login(app, this.userObject, this.sessionObject, this.config);
        userMethod.get(app, this.userObject, this.config);

    }

    serverSession(app) {
        sessionMethod.add(app, this.sessionObject, this.config);
        commonMethod.remove(app, 'session', this.sessionObject, this.config);
    }

    serverRoot(app) {
        rootMethod.root(app, this.config);
    }

    serverCheckHeader(app) {
        app.all('*', (req, res, next) => {
            if (req.method === 'OPTIONS') {
                // always allow the OPTIONS
                next();
            } else {
                if (this.config.no_header_url.map(q => req.url.substr(0, q.length) === q).includes(true)) {
                    next();
                } else {
                    if (req.headers.authorization === undefined) {
                        res.status(500).send({status: 'no header authorization'});
                    } else {
                        this.sessionObject.findById(req.headers.authorization, (err, currentSession) => {
                            if (err || (currentSession === null)) {
                                res.status(500).send({status: 'wrong header authorization'});
                            } else {
                                if (this.config.no_user_url.includes(req.url)) {
                                    next();
                                } else {
                                    if (currentSession.user === undefined) {
                                        res.status(500).send({status: 'no user'});
                                    } else {
                                        next();
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    }
}

module.exports = adminWeb;
