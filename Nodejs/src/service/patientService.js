import db from '../models/index';
require('dotenv').config()
const Op = require('Sequelize').Op;
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';


//findOrCreate: find neu chua co -> create 

let buildUrlEmail = (doctorId, token) => {

    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date
                || !data.fullName || !data.selectedGender || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {

                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

                // gui email to user
                await emailService.sendSimpleEmail({
                    receiversEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token),
                })

                // update or insert to table booking( sequelize findOrCreate)
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    //if email is not exist-> create user with email = data.email, roleId = R3
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
                        phonenumber: data.phoneNumber
                        // them data tu data truyen vao-> tao thong tin user trong table User
                    }
                })
                //create data to table bookings
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        //find
                        where: {
                            patientId: user[0].id,
                            statusId: {
                                [Op.or]: ['S1', 'S2'],
                            },
                            date: data.date
                        },
                        //not found -> create
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,
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

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    // neu thay thi doi statusid thanh S2
                    appointment.statusId = 'S2'
                    await appointment.save()

                    resolve({
                        errCode: 0,
                        errMessage: 'Update appointment succeed!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Lịch hẹn đã được kích hoạt hoặc không tồn tại-vui lòng kiểm tra lại!"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
}