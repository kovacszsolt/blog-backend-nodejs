const util = require('./util');

const fs = require('fs');
const ROOT = process.cwd() + '/';
const config = () => {
    if (fs.existsSync(ROOT + 'config.json')) {
        return require(ROOT + 'config.json');
    } else {
        //const _config = require(ROOT + 'config.example.json');
        console.log(process.env);
        const _config = {};
        _config.port = process.env["PORT"];
        _config.mongo_server = process.env["MONGO_SERVER"];
        _config.mongo_database = process.env["MONGO_DATABASE"];
        _config.tmp_upload_path = process.env["TMP_UPLOAD_PATH"];
        _config.upload_files = process.env["UPLOAD_FILES"];
        _config.allow_origin = process.env["ALLOW_ORIGIN"];
        _config.root = process.env["ROOT"];
        _config.no_header_url = process.env["NO_HEADER_URL"];
        _config.no_header_url = process.env["NO_USER_URL"];

        _config.swagger = {};
        _config.swagger.start = process.env["SWAGGER_START"];
        _config.swagger.allow_origin = process.env["SWAGGER_ALLOW_ORIGIN"];
        _config.swagger.schemes = process.env["SWAGGER_SCHEMES"];
        _config.swagger.port = process.env["SWAGGER_PORT"];
        _config.swagger.host = process.env["SWAGGER_HOST"];
        _config.swagger.basePath = process.env["SWAGGER_BASEPATH"];
        _config.swagger.url = process.env["SWAGGER_URL"];
        _config.swagger.files = process.env["SWAGGER_FILES"];

        _config.mail = {};
        _config.mail.server = process.env["MAIL_SERVER"];
        _config.mail.port = process.env["MAIL_PORT"];
        _config.mail.secure = process.env["MAIL_SECURE"];
        _config.mail.username = process.env["MAIL_USERNAME"];
        _config.mail.password = process.env["MAIL_PASSWORD"];

        return _config;
    }
}

const getParam = (__name, __default = '') => {
    let __return = __default;
    if (process.env[__name] !== undefined) {
        __return = process.env[__name];
    }
    return __return;
}

module.exports = config();
