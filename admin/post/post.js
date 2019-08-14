const slug = require('slug');

const util = require('../../common/util');
const fs = require('fs-extra');

/**
 * /post/save/:id/
 */
const modify = (app, postObject, upload, config) => {
    app.post(config.root + 'post/save/:id/', upload.single('image'), (req, res, next) => {
        postObject.findById(req.params.id, (err, result) => {
            const _originalPost = result;
            if ((result === null) || (err !== null)) {
                res.json({status: "error"});
            } else {
                postObject.countDocuments({title: req.body.title, _id: {'$ne': req.params.id}}, (err, count) => {
                    if (count === 0) {
                        postObject.findOneAndUpdate({_id: req.params.id}, {
                            $set: {
                                title: req.body.title,
                                slug: slug(req.body.title).toLowerCase(),
                                intro: req.body.intro,
                                content: req.body.content,
                                file: (req.file === undefined) ? {} : req.file
                            }
                        }, {new: true}).then((_res) => {
                            if (req.file) {
                                if (_originalPost.file) {
                                    fs.removeSync(config.upload_files + _originalPost.slug + '.' + util.getFileExtension(_originalPost.file.originalname));
                                }
                                fs.copySync(req.file.path, config.upload_files + slug(req.body.title).toLowerCase() + "." + util.getFileExtension(req.file.originalname));
                                fs.removeSync(req.file.path);
                            }
                            res.json({status: "ok"});
                        })
                    } else {
                        res.json({status: "error", value: "double_title"});
                    }
                });
                /*

                 */

            }
        });
    });
};

/**
 * /post/list/
 */
const list = (app, postObject, config) => {
    app.get(config.root + 'post/list/', (req, res) => {
        postObject.countDocuments({}, (err, count) => {
            if (count === 0) {
                res.json([]);
            } else {
                postObject.find({}, (error, documents) => {
                    res.json(documents);
                }).populate('category');
            }
        });

    });
};

/**
 * /post/add/
 */
const add = (app, postObject, upload, config) => {
    app.post(config.root + 'post/save/0/', upload.single('image'), (req, res, next) => {
        console.log(Object.keys(req.body));
        if (JSON.stringify(Object.keys(req.body)) === JSON.stringify(['title', 'intro', 'content', 'category'])) {
            postObject.countDocuments({title: req.body.title}, (err, count) => {
                if (count === 0) {
                    _add_save(postObject, req, res, config);
                } else {
                    if (req.file) {
                        fs.removeSync(req.file.path);
                    }
                    res.status(500).json({status: "error", value: "double_title"});
                }
            });
        } else {
            res.status(500).json({status: "error", value: "unkown"});
        }
    });
};

const _add_save = (postObject, req, res, config) => {
    let _category='';
    try {
         _category = JSON.parse(req.body.category);
    } catch (e) {
        _category = JSON.parse('[' + req.body.category + ']');
    }
    const _slug = slug(req.body.title).toLowerCase();
    new postObject({
        title: req.body.title,
        slug: _slug,
        intro: req.body.intro,
        category: _category,
        content: req.body.content,
        file: (req.file === undefined) ? {} : req.file
    }).save((err, newObject) => {
        if (req.file) {
            fs.copySync(req.file.path, config.upload_files + _slug + "." + util.getFileExtension(req.file.originalname));
            fs.removeSync(req.file.path);
            res.json({status: "ok", value: newObject._id});
        } else {
            res.json({status: "ok", value: newObject._id});
        }
    });
};

/**
 * /post/:id/
 */
const get = (app, postObject, config) => {
    app.get(config.root + 'post/:id/', (req, res, next) => {
        postObject.findById(req.params.id, (err, result) => {
            if ((result === null) || (err !== null)) {
                res.json({status: "error"});
            } else {
                res.json({status: 'ok', value: result});
            }
        });
    });
};

module.exports = {
    list,
    add,
    modify,
    get
};
