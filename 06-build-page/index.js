const path = require('path');
const fs = require('fs');

const templateHtml = path.join(__dirname, 'template.html'); //D:\JSprojects\rs\HTML-builder\06-build-page\template.html

const projectDist = path.join(__dirname, 'project-dist');

//create dist folder
fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readFile(templateHtml, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const componentsArr = data.match(/{{.*}}/g);

  const componentsPathArr = componentsArr.map((component) => {
    const fileName = `${component.match(/\w+/g)}.html`;
    return path.join(__dirname, 'components', fileName);
  });

  console.log('arrays', componentsArr, componentsPathArr);

  data.replace(/{{.+}}/g, (component) => {
    const result = fs.writeFile(templateHtml, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
    return componentsPathArr[componentsArr.indexOf(component)];
  });
});

console.log('please check my work later. I didnt have enough time to finish');
