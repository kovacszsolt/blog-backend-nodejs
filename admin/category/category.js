const slug = require('slug');

const util = require('../../common/util');
const fs = require('fs-extra');

/**
 * /category/save/:id/
 */
const modify = (app, categoryObject, upload, config) => {
    console.log('alma');
    app.post(config.root + 'category/save/:id/', (req, res, next) => {
        categoryObject.findById(req.params.id, (err, result) => {
            const _originalCategory = result;
            if ((result === null) || (err !== null)) {
                console.log('err',err);
                res.json({status: "error"});
            } else {
                categoryObject.countDocuments({title: req.body.title, _id: {'$ne': req.params.id}}, (err, count) => {
                    if (count === 0) {
                        categoryObject.findOneAndUpdate({_id: req.params.id}, {
                            $set: {
                                title: req.body.title,
                                slug: slug(req.body.title).toLowerCase(),
                                intro: req.body.intro,
                                content: req.body.content,
                                file: (req.file === undefined) ? {} : req.file
                            }
                        }, {new: true}).then((_res) => {
                            if (req.file) {
                                if (_originalCategory.file) {
                                    fs.removeSync(config.upload_files + _originalCategory.slug + '.' + util.getFileExtension(_originalCategory.file.originalname));
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
 * /category/list/
 */
const list = (app, categoryObject, config) => {
    app.get(config.root + 'category/list/', (req, res) => {
        categoryObject.countDocuments({}, (err, count) => {
            if (count === 0) {
                res.json([]);
            } else {
                categoryObject.find({}, (error, documents) => {
                    res.json(documents);
                });
            }
        });

    });
};

/**
 * /category/add/
 */
const add = (app, categoryObject, upload, config) => {
    app.post(config.root + 'category/save/0/', (req, res, next) => {
        console.log(Object.keys(req.body));
        if (JSON.stringify(Object.keys(req.body)) === JSON.stringify(['title'])) {
            categoryObject.countDocuments({title: req.body.title}, (err, count) => {
                if (count === 0) {
                    _add_save(categoryObject, req, res, config);
                } else {
                    res.status(500).json({status: "error", value: "double_title"});
                }
            });
        } else {
            res.status(500).json({status: "error", value: "unkown"});
        }
    });
};

const _add_save = (categoryObject, req, res, config) => {
    console.log('req.body', req.body);
    const _slug = slug(req.body.title).toLowerCase();
    new categoryObject({
        title: req.body.title,
        slug: _slug,
        intro: req.body.intro,
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
 * /category/:id/
 */
const get = (app, categoryObject, config) => {
    app.get(config.root + 'category/:id/', (req, res, next) => {
        categoryObject.findById(req.params.id, (err, result) => {
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
