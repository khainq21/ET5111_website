import db from '../models/index';
require('dotenv').config({
    path: 'D:/Web20221/ET5111_website/Nodejs/src/.env'
})
import emailService from './emailService';

//findOrCreate: find neu chua co -> create 


let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date
                || !data.fullName
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {

                // gui email to user
                await emailService.sendSimpleEmail({
                    receiversEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: "https://www.facebook.com/60Centuries",
                })

                // update or insert to table booking( sequelize findOrCreate)
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    //if email is not exist-> create user with email = data.email, roleId = R3
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                        // them data tu data truyen vao-> tao thong tin user trong table User
                    }
                })
                //create data to table bookings
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        //find
                        where: { patientId: user[0].id },
                        //not found -> create
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        },
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
}