'use strict';

console.log('Castle 0.0.1');

const testFolder = './';
const fs = require('fs');
var path = require('path');

function BuildApp(appPath)
{
  console.log("building " + appPath);

  var indexHtmlSource = '<!DOCTYPE html>\n' +
    '<html lang = "en">\n' +
    '<head>\n' +
    '<link rel="manifest" href="manifest.json">\n' +
    '<link rel="apple-touch-icon" href="single-page-icon.png">\n' +
    '<meta charset="UTF-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '<meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
    '<title>Document</title>\n' +
    '<script src="core.js"></script>\n';

  var files = fs.readdirSync(appPath + "/source");

  files.forEach(file =>
  {
    var ext = path.extname(file);

    var name = file.substring(0, file.length - ext.length);
    if (ext === ".js" || ext === ".ts")
    {

      indexHtmlSource += '<script src="' + file + '"></script>\n';

      
      if (fs.existsSync(appPath + "/source/" + name + ".html"))
      {
        var contentsXML = fs.readFileSync(appPath + "/source/" + name + ".html", 'utf8');
        var contentsJS = fs.readFileSync(appPath + "/source/" + name + ".js", 'utf8');
        var content = "Design." + name + "=`\n";
        content += contentsXML + "\n`;\n\n";
        content += contentsJS;

        try
        {
          fs.writeFileSync(appPath + "/html/" + name + ".js", content, 'utf8');
        }
        catch (e)
        {
        }
      }
      else
      {
        //Just copy

        fs.copyFile(appPath + "/source/" + file, appPath + "/html/" + file, (err) =>
        {
          if (err) throw err;
          console.log('source.txt was copied to destination.txt');
        });
      }
    }
    else if (ext === ".css")
    {
      indexHtmlSource += '<link rel="stylesheet" href="' + file + '"/>\n';

      fs.copyFile(appPath + "/source/" + file, appPath + "/html/" + file, (err) =>
      {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
      });
    }
    console.log(file);
  });

  try
  {
    indexHtmlSource += `
  </head>
   <body onload="Main()">
   </body>
  </html>
  `;

    fs.writeFileSync(appPath + "/html/index.html", indexHtmlSource, 'utf8');
  } catch (e)
  {
  }
}

function CreateApp(templateName, appName)
{
  console.log("Creating " + appName);

  if (!fs.existsSync(appName))
  {
    fs.mkdirSync(appName);
  }

  if (!fs.existsSync(appName + "\\source"))
  {
    fs.mkdirSync(appName + "\\source");
  }

  if (!fs.existsSync(appName + "\\html"))
  {
    fs.mkdirSync(appName + "\\html");
  }

  var appPath = "./" + appName;

  //Copy core lib
  fs.copyFile(__dirname + "/core.js", appPath + "/html/core.js", (err) =>
  {
    if (err) throw err;
    console.log('core.js copied');
  });

  //Copy the template into the destination
  var files = fs.readdirSync(__dirname + "/Templates/"+ templateName);

  files.forEach(file =>
  {
    fs.copyFile(__dirname + "/Templates/" + templateName + "/" + file,
      appPath + "/source/" + file, (err) =>
      {
        if (err) throw err;
        console.log(file + ' copied');
      });
  });
}

//Command line
if (process.argv[2] === "build")
{
  BuildApp("./" + process.argv[3]);
}
else if (process.argv[2] === "create")
{
  var templateName = process.argv[3];
  var appName = process.argv[4];  
  CreateApp(templateName, appName);
}


