require('dotenv').config({
    path: 'D:/Web20221/ET5111_website/Nodejs/src/.env'
})
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"khaihust ET1" <khai.ngquang21@gmail.com>', // sender address
        to: dataSend.receiversEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "ET5011", // plain text body
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên webside của Khải</p>
        <p>Thông tin chi tiết đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là chính xác, vui lòng bấm vào đương link bên dưới 
        để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>
        <div>Cảm ơn bạn đã tin dùng dịch vụ của chúng tôi!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Khai's website</p>
        <p>Details of appointment booking:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the above information is correct, please click on the link below
        to confirm and complete the procedure to book an appointment.
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>
        <div>Thank you for trusting our service!</div>
        `
    }
    return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
}
