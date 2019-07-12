const config = require('./common/config');
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminWeb = require('./admin/web');
const swaggerWeb = require('./swagger/web');
const util = require('./common/util');


mongoose.connect('mongodb://' + config.mongo_server + '/' + config.mongo_database, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    const admin = new adminWeb(express, bodyParser, mongoose, config);
    admin.start();
    if (config.swagger.start === "1") {
        const swagger = new swaggerWeb(express, bodyParser, config.swagger);
        swagger.start();
    }
});
util.sendMail(config.mail,"smith.zsolt@gmail.com","blog-backend-nodejs-start","BLOG backend start");