'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
app.use('/docs',express.static('./docs'));

app.listen(port, () => {console.log('Port 3000')})