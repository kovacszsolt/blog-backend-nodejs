/**
 * /admin/user/init/
 */
const init = (app, userObject, config) => {
    app.get(config.root + 'user/init/', (req, res) => {
        userObject.countDocuments({}, (err, count) => {
            if (count === 0) {
                new userObject({
                    username: "smith.zsolt@gmail.com",
                    password: "123"
                }).save((err, newObject) => {
                    res.json({status: "new"});
                });
            } else {
                res.json({status: "old"});
            }
        });
    });
};

/**
 * /admin/user/login/
 */
const login = (app, userCollection, sessionCollection, config) => {
    app.post(config.root + 'user/login/', (req, res, next) => {
        if (JSON.stringify(Object.keys(req.body)) === JSON.stringify(['username', 'password'])) {
            userCollection.findOne({username: req.body.username, password: req.body.password}, (err, result) => {
                if (result === null) {
                    res.json({status: "error"});
                } else {
                    sessionCollection.findOneAndUpdate({_id: req.headers.authorization}, {
                        $set: {
                            user: {
                                _id: result._id,
                                username: result.username
                            }
                        }
                    }, {new: true}).then((_res) => {
                        res.json({status: "ok"});
                    })
                }
            });
        }
    });
};

/**
 * /admin/user/add/
 */
const add = (app, userObject, config) => {
    app.post(config.root + 'user/add/', (req, res, next) => {
        if (JSON.stringify(Object.keys(req.body)) === JSON.stringify(['username', 'password'])) {
            userObject.countDocuments({username: req.body.username}, (err, count) => {
                if (count === 0) {
                    new userObject({
                        username: req.body.username,
                        password: req.body.password
                    }).save((err, newObject) => {
                        res.json({status: "ok", value: newObject._id});
                    });
                } else {
                    res.status(500).send({status: 'double_title'});
                }
            });
        }
    });
};

/**
 * /admin/user/:id/
 */
const get = (app, userObject, config) => {
    app.get(config.root + 'user/:id/', (req, res, next) => {
        userObject.findById(req.params.id, (err, result) => {
            if ((result === null) || (err !== null)) {
                res.json({status: "error"});
            } else {
                res.json({
                    status: 'ok', value: {
                        username: result.username,
                        password: ''
                    }
                });
            }
        });
    });
};

/**
 * /admin/user/save/:id/
 */
const modify = (app, userObject, config) => {
    app.put(config.root + 'user/save/:id/', (req, res, next) => {
        userObject.findById(req.params.id, (err, result) => {
            if ((result === null) || (err !== null)) {
                res.json({status: "error"});
            } else {
                userObject.countDocuments({username: req.body.username, _id: {'$ne': req.params.id}}, (err, count) => {
                    console.log('count', count);
                    if (count === 0) {
                        userObject.findOneAndUpdate({_id: req.params.id}, {
                            $set: {
                                username: req.body.username,
                                password: req.body.password
                            }
                        }, {new: true}).then((_res) => {
                            res.json({status: "ok"});
                        })
                    } else {
                        res.json({status: "error", value: "double_username"});
                    }
                });
            }
        });
    });
};

/**
 * /admin/user/list/
 */
const list = (app, userObject, config) => {

    app.get(config.root + 'user/list/', (req, res) => {
        userObject.countDocuments({}, (err, count) => {
            if (count === 0) {
                res.json([]);
            } else {
                const docs = [];
                userObject.find({}, (error, documents) => {
                    documents.forEach((doc) => {
                        docs.push({_id: doc._id, username: doc.username, createdAt: doc.createdAt});
                    });
                    res.json({status: "ok", value: docs});
                });
            }
        });
    });
};

module.exports = {
    init,
    login,
    add,
    get,
    modify,
    list
};

