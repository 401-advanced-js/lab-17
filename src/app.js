'use strict';
const files = require('./files.js');
let file = process.argv.slice(2).shift();
files.alterFile(file);