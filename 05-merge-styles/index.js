const path = require('path');
const fs = require('fs');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

const outStream = fs.createWriteStream(bundlePath);

// function for copying files and, if directories are found, creating copies of them and recursively traversing
const readAndCopyDirectory = (dirPath) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      // const fileCopyPath = filePath.replace('files', 'files-copy');

      // checking path is file or directory
      fs.stat(filePath, (err, stats) => {
        // base case - file
        if (!stats.isDirectory()) {
          if (path.extname(filePath) === '.css') {
            fs.createReadStream(filePath).pipe(outStream);
          }
          // recursive case
        } else {
          readAndCopyDirectory(filePath);
        }
      });
    });
  });
};
// cold startup
readAndCopyDirectory(stylePath);
