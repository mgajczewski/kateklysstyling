var fs = require('fs');

var pagesPath = './../Downloaded';
var pathFromPageToCustomCss = './../Repo/custom.css';


var htmlPageRegex = /.*\.html/;
var inlineCustomStyleRegex = /<style type="text\/css" id="wp-custom-css">[\s\S]*<\/style>/g;
var linkToCustomStylesheet = '<link rel="stylesheet" id="wp-custom-css" href="' + pathFromPageToCustomCss + '" type="text/css" media="all">';

function getHtmlFileNames() {
  var files = fs.readdirSync(pagesPath);

  var htmlFiles = [];
  files.forEach(function (fileName) {
    if (htmlPageRegex.test(fileName)) {
      htmlFiles.push(fileName);
    }
  });
  return htmlFiles;
}

function replaceInlineStyle(fileName) {
  var fullPath = pagesPath + '/' + fileName;

  var data = fs.readFileSync(fullPath, 'utf-8');

  if (inlineCustomStyleRegex.test(data)) {
    data = data.replace(inlineCustomStyleRegex, linkToCustomStylesheet);
    fs.writeFileSync(fullPath, data);
    console.log('File ' + fileName + ' modified');
  }
  else {
    console.log('File ' + fileName + ' skipped');
  }
}

function main() {
  var fileNames = getHtmlFileNames();
  fileNames.forEach(function (fileName) {
    replaceInlineStyle(fileName);
  });
}

main();
