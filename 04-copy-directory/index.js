const path = require('path');
const fs = require('fs');

const parentDirPath = path.join(__dirname, 'files');
const dirPathCopy = path.join(__dirname, 'files-copy');

//check is dir exists
fs.access(dirPathCopy, (err) => {
  if (err) {
    //create parent copy folder
    createDir();
  } else {
    fs.rm(dirPathCopy, { recursive: true }, (err) => {
      if (err) throw err;
      createDir();
    });
  }
});

// function for copying files and, if directories are found, creating copies of them and recursively traversing
const readAndCopyDirectory = (dirPath) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const fileCopyPath = filePath.replace('files', 'files-copy');

      // checking path is file or directory
      fs.stat(filePath, (err, stats) => {
        // base case - file
        if (!stats.isDirectory()) {
          fs.copyFile(filePath, fileCopyPath, (err) => {
            if (err) throw err;
          }); // recursive case - directory
        } else {
          // create nested folder
          fs.mkdir(fileCopyPath, { recursive: true }, (err) => {
            if (err) throw err;
          });
          //execute recursion
          readAndCopyDirectory(filePath);
        }
      });
    });
  });
};

function createDir() {
  //create parent copy folder
  fs.mkdir(dirPathCopy, { recursive: true }, (err) => {
    if (err) throw err;
    console.log(`CREATE ORIG ${dirPathCopy} is created!`);
    readAndCopyDirectory(parentDirPath);
  });
}
