import patientService from '../service/patientService';

// chứa các hàm nhận và gửi yêu cầu cũng như phản hồi từ phía client lên hệ thống
// ở đây là các yêu cầu liên quan tới bệnh nhân

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error form server!"
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookAppointment(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error form server!"
        })
    }
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
}