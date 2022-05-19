const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'secret-folder');

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(function (file) {
    const filePath = path.join(__dirname, 'secret-folder', file);
    fs.stat(filePath, (err, stats) => {
      if (!stats.isDirectory()) {
        const [fileName, fileExt] = file.split('.');
        const filesize = (stats.size / 1028).toFixed(3);
        console.log(`<${fileName}>-<${fileExt}>-<${filesize}kb>`);
      }
    });
    console.log(file);
  });
});
