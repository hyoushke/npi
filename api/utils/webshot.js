const nodemailer = require('nodemailer');

const path = require('path');
const ROOT_PATH = path.dirname(process.mainModule.filename);


exports.webshot = () => {

    const webshot = require('webshot');
    const fs      = require('fs');
     
    var renderStream = webshot('https://www.radarbox24.com/@11.30547,121.26473,z6');
    var file = fs.createWriteStream('google.png', {encoding: 'binary'});
     
    renderStream.on('data', function(data) {
      file.write(data.toString('binary'), 'binary');
    });

    return true;

}

