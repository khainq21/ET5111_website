require('dotenv').config()
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

let sendAttachment = async (dataSend) => {
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
        to: dataSend.email, // list of receivers
        subject: "Kết quả khám bệnh", // Subject line
        text: "ET5011", // plain text body
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientName}-${dataSend.patientId}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                //https://stackoverflow.com/questions/24165410/nodemailer-send-base64-data-uri-as-attachment-how
                encoding: 'base64'
            }
        ]
    });
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên webside của Khải</p>
        <p>Thông tin đơn thuốc va hóa đơn được gửi trong file đính kèm:</p>

        <div>Cảm ơn bạn đã tin dùng dịch vụ của chúng tôi!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Khai's website</p>
        <p>Information on prescriptions and invoices is sent in the attached file:</p>

        <div>Thank you for trusting our service!</div>
        `
    }
    return result
}

let sendRejectEmail = async (dataSend) => {
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
        to: dataSend.email, // list of receivers
        subject: "Lịch hẹn khám bệnh bị từ chối", // Subject line
        text: "ET5011", // plain text body
        html: getBodyHTMLRejectEmail(dataSend),
    });
}

let getBodyHTMLRejectEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì lịch khám bệnh online của bạn đã bị từ chối!</p>
        <p>Lý do từ chối của bác sỹ: ${dataSend.reason}</p>
        <p>Chúng tôi rất tiếc vì điều đó.</p>
        <div>Cảm ơn bạn đã tin dùng dịch vụ của chúng tôi!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
            <h3>Hello ${dataSend.patientName}!</h3>
            <p>You received this email because your online appointment has been declined!</p>
            <p>Reason for the doctor's refusal: ${dataSend.reason}</p>
            <p>We are so sorry about it.</p>
            <div>Thank you for using our service!</div>
        `
    }
    return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
    sendRejectEmail: sendRejectEmail,
}
