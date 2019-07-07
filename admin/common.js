const remove = (app, path, _object, config) => {
    app.delete(config.root + path + '/:id/', (req, res, next) => {
        _object.deleteOne({_id: req.params.id}, (err) => {
            res.json({status: 'ok'});
        });
    });
};

module.exports = {
    remove
};
