'use strict';
const fs = require('fs');

const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const net = require('net');
const client = new net.Socket();

client.connect(3001,'localhost', () => {});

const loadFile = (file) => readFile(file);
const saveFile = (file,buffer) => writeFile(file,buffer);
const convertBuffer = (buffer) => Buffer.from(buffer.toString().trim().toUpperCase());


const alterFile = (file) => {
  loadFile(file)
    .then( buffer => convertBuffer(buffer))
    .then( buffer => saveFile(file,buffer) )
    .then( success => client.write(`Saved ${file}`))
    .catch(error => client.write(`Error ${error}`));
};
module.exports = {loadFile,saveFile,convertBuffer,alterFile};