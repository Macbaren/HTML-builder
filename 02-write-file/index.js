const fs = require('fs');
const path = require('path');
const { stdout, stdin, stderr, exit } = require('process');

stdout.write('Enter Your Text!\n');

const textFile = path.join(__dirname, 'text.txt');

fs.appendFile(textFile, '', function (err) {
  if (err) throw err;
});

// create file and add data or add data to existing file
function writeToFile(data) {
  fs.appendFile(textFile, data, (err) => {
    if (err) throw err;
  });
}

// listener console input
stdin.on('data', (data) => {
  const str = data.toString().trim();
  if (str === 'exit') {
    exit();
  }
  writeToFile(data);
});

// listener ctrl-c clicking
process.on('SIGINT', () => {
  exit(1);
});

// listener exit event
process.on('exit', (code) => {
  if (code === 0) {
    stdout.write('You have entered "exit".\nGood Luck Learning Node');
  } else if (code === 1) {
    stdout.write('You have clicked "ctrl-c".\nGood Luck Learning Node');
  } else {
    stderr.write(`Somthing wrong. App is finished with code: ${code}`);
  }
});
