const nodemailer=require('nodemailer')
const dotenv=require('dotenv').config({path:'src/.env'})

const sendEmail = async ({ emailId,subject,message }) => {
    try {
 
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
            }
          })

        let mailOptions = {
            from: process.env.EMAIL,
            to: emailId,
            subject: subject,
            text: message
        };

        transporter.sendMail(mailOptions, function (error, data) {
            if(error) {
                console.log('Error ' + error);
            } else {
                console.log('Email sent successfully');
            }
        });
    
    } catch(error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

module.exports={sendEmail}