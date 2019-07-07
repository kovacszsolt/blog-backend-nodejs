/**
 * /admin/
 */
const root = (app, config) => {
    app.get(config.root, (req, res) => {
        res.json({status: 'ok'});
    });
};

module.exports = {
    root
};

