/**
 * /admin/session/add/
 * /admin/session/list/
 */
const add = (app, sessionObject) => {

    app.get('/admin/session/add/', (req, res) => {
        const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        new sessionObject({host: ip}).save((err, newObject) => {
            res.json({id: newObject._id});
        });
    });

    app.get('/admin/session/list/', (req, res) => {
        sessionObject.find({}, function (error, documents) {
            res.json(documents);
        });
    });
};

module.exports = {
    add
};

