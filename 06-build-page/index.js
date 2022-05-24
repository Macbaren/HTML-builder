const path = require('path');
const fs = require('fs');

const projectDist = path.join(__dirname, 'project-dist');

//create dist folder
fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) throw err;
});

//=================== HTML ====================

const templateHtml = path.join(__dirname, 'template.html');

const projectDistIndexHtml = path.join(projectDist, 'index.html');

//read content from template
fs.readFile(templateHtml, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  // create content for remove array
  const componentsArr = data.match(/{{.*}}/g);

  // create path of replacing files array
  const componentsPathArr = componentsArr.map((component) => {
    const fileName = `${component.match(/\w+/g)}.html`;
    return path.join(__dirname, 'components', fileName);
  });

  // replacing
  for (const component of componentsArr) {
    const componentPath = componentsPathArr[componentsArr.indexOf(component)];

    fs.readFile(componentPath, 'utf-8', (err1, data1) => {
      if (err1) {
        return console.log(err1);
      }
      const content = data1;
      processFile(component, content);
    });
  }

  //callback
  function processFile(component, content) {
    data = data.replace(component, content);

    fs.writeFile(projectDistIndexHtml, data, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});

//=================== CSS ====================

const stylePath = path.join(__dirname, 'styles');

const projectDistStyleCss = path.join(projectDist, 'style.css');

const outStream = fs.createWriteStream(projectDistStyleCss);

// function for copying files and, if directories are found, creating copies of them and recursively traversing
const readAndCopyStylesDir = (dirPath) => {
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
          readAndCopyStylesDir(filePath);
        }
      });
    });
  });
};
// cold startup
readAndCopyStylesDir(stylePath);

//=================== ASSETS ====================

const parentAssetsPath = path.join(__dirname, 'assets');

const projectDistAssets = path.join(projectDist, 'assets');

// //create parent copy folder
// fs.mkdir(projectDistAssets, { recursive: true }, (err) => {
//   if (err) throw err;
// });

//check is dir exists
fs.access(projectDistAssets, (err) => {
  if (err) {
    //create parent copy folder
    createDir();
  } else {
    fs.rm(projectDistAssets, { recursive: true }, (err) => {
      if (err) throw err;
      createDir();
    });
  }
});

// function for copying files and, if directories are found, creating copies of them and recursively traversing
const readAndCopyAssetsDir = (dirPath) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);

      const fileCopyPath = filePath.replace('assets', 'project-dist\\assets');

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
          readAndCopyAssetsDir(filePath);
        }
      });
    });
  });
};

function createDir() {
  //create parent copy folder
  fs.mkdir(projectDistAssets, { recursive: true }, (err) => {
    if (err) throw err;
    readAndCopyAssetsDir(parentAssetsPath);
  });
}
// cold startup
// readAndCopyAssetsDir(parentAssetsPath);
