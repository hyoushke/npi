const nodemailer = require('nodemailer');

const path = require('path');
const ROOT_PATH = path.dirname(process.mainModule.filename);


exports.send_mail = () => {

    const mail_transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: 
        { 
          user: 'mail.hyoushke@gmail.com',
          pass: 'MailService2019!'
        }
    });

    const mail_options = {
        from: 'mail.hyoushke@gmail.com',
        to: 'mail.hyoushke@gmail.com',
        subject: 'Using Node REST API - Inline Attachment',
        
        //html: 'Hello World --> Using Utils Mailer ',
        //attachments: {
        //    path: ROOT_PATH + '/uploads/' + 'test.png'
        //}

        html: '<strong>Inline Attachment Image</strong> <br /><br /> <img src="cid:logo">',
        attachments: {
            filename: 'Logo.png',
            path: ROOT_PATH + '/uploads/' + 'test.jpg',
            cid: 'logo'

        }

    }

    mail_transporter.sendMail(mail_options, (error, info)=>{
        console.log(info);
        console.log(error);
    })

    return true;

}