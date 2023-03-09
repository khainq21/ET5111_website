import specialtyService from '../service/specialtyService';

// chứa các hàm nhận và gửi yêu cầu cũng như phản hồi từ phía client lên hệ thống
// ở đây là các yêu cầu liên quan tới chuyên khoa

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error form server!"
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let specialties = await specialtyService.getAllSpecialty()
        return res.status(200).json(specialties)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error form server!"
        })
    }
}

let handleEditSpecialty = async (req, res) => {
    let data = req.body
    let message = await specialtyService.handleEditSpecialty(data)
    return res.status(200).json(message)
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let data = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            message: "Error form server!"
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    handleEditSpecialty: handleEditSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,

}