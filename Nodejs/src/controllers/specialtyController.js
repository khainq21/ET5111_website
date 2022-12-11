import specialtyService from '../service/specialtyService';

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

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    handleEditSpecialty: handleEditSpecialty,

}