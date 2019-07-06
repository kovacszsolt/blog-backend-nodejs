const express = require('express');
const swaggerDoc = require('./swaggerDoc');
const app = express(express);
swaggerDoc(app);
app.use((err, req, res, next) => console.log('Error', err));
app.listen(3001, () => console.log('App staet'));
