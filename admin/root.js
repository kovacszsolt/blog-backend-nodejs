/**
 * /admin/
 */
const root = (app) => {
    app.get('/admin/', (req, res) => {
        res.json({status: 'ok'});
    });
};

module.exports = {
    root
};

