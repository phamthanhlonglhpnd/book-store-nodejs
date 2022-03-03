require('dotenv').config();
import nodemailer from 'nodemailer';

let forgotPasswordEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Polarbear Bookstore " <polarbearbookstore@gmail.com>', // sender address 
        to: data.receiveEmail, // list of receivers
        subject: 'A new password for you to login and continue to use Polarbear Bookstore', // Subject line
        html: getBodyEmail(data)
        
      });
    
}

let getBodyEmail = (data) => {
    let result =   
        `
            <h3>Dear ${data.name}!</h3>
            <p>You receive this email because you forget your password and need a new password.</p>
            <p>Here is your new password</p>
            <div><b>New Password: ${data.newPassword}</b></div>
            <p>Please don't share this password to anyone and try your best to remember it for the next login or you can change the password accordingly.</p>
            <p>Sincerely thank!</p>
        `
    return result;
}

let sendConfirmEmail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: process.env.EMAIL_APP, // generated ethereal user
                  pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
              });
            
              // send mail with defined transport object
              let info = await transporter.sendMail({
                from: '"PolarbearBooking " <nguyenminhoanglhpnd@gmail.com>', // sender address 
                to: data.email, // list of receivers
                subject: getSubjectEmailConfirm(data), // Subject line
                html: getBodyEmailConfirm(data), 
                attachments: [
                    {
                        filename: 'text1.png',
                        content: data.image.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
              });
              resolve(true);
        } catch(e) {
            reject(e);
        }
    })
    
}

let getSubjectEmailConfirm = (data) => {
    let subject = '';
    if(data.language==='vi') {
        subject = 'Xác nhận lịch hẹn khám bệnh'
    }
    if(data.language==='en') {
        subject = 'Confirm the medical examination schedule'
    }
    return subject;
}

let getBodyEmailConfirm = (data) => {
    let result = '';
    if(data.language==='vi') {
        result = 
        `
            <h3>Xin chào ${data.firstName} ${data.lastName}!</h3>
            <p>Bạn nhận được email này vì hệ thống đã xác nhận đặt lịch khám bệnh thành công trên PolarbearBooking</p>
            <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm</p>
            <p>Xin chân thành cảm ơn!</p>
        `
    }
    if(data.language==='en') {
        result = 
        `
            <h3>Dear ${data.lastName} ${data.firstName}!</h3>
            <p>You received this email because the system has confirmed the successful appointment booking on PolarbearBooking</p>
            <p>Prescription/invoice information sent in attachment</p>
            <p>Sincerely thank!</p>
        `
    }
    return result;
}

async function main() {
    
  }

module.exports = {
    forgotPasswordEmail,
    sendConfirmEmail
}