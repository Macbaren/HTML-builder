const fs = require('fs');
const path = require('path');

const getPath = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(getPath, 'utf-8');

let data = '';

stream.on('data', (chunk) => (data += chunk));
stream.on('end', () => console.log(data));
