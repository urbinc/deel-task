const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./router');
const { getProfile } = require('./middleware/getProfile');
const { errorHandler } = require('./middleware/errorHandler');

require('./models');

const app = express();

app.use(bodyParser.json());
app.use(getProfile);
app.use(router);
app.use(errorHandler);

exports.app = app;
