const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'secret-folder');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  let ind = 1;
  console.log();
  console.log('File # | File Name      | File Extension |       File Size');
  console.log('==========================================================');
  files.forEach((file, index) => {
    const filePath = path.join(__dirname, 'secret-folder', file);
    fs.stat(filePath, (err, stats) => {
      if (!stats.isDirectory()) {
        const [fileName, fileExtention] = file.split('.');
        const fileSize = (stats.size / 1028).toFixed(3);
        console.log(
          `File #${ind}: <${fileName}> \t-     <${fileExtention}>\t -\t<${fileSize}kb>`
        );
        if (index === files.length - 1) {
          console.log(
            '=========================================================='
          );
        }
        ind += 1;
      }
    });
  });
});
