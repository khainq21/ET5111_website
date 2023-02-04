const db = require("../models")

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary')
                    return item
                })
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })

        } catch (e) {
            reject(e)
        }

    })
}

let handleEditSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 2,
                    Message: 'Missing parameter!'
                })
            }
            let specialty = await db.Specialty.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (specialty) {
                specialty.name = data.name;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                if (data.image) {
                    specialty.image = data.image;
                }
                await specialty.save();

                resolve({
                    errCode: 0,
                    Message: 'Specialty is Updated'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Specialty not found!'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    Message: 'Missing parameter!'
                })
            } else {
                // get description specialty
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'image']
                })
                if (data) {
                    // get doctor_infor
                    let doctorSpecialty = []
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        //find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    // append doctorId & provinceId to data
                    data.doctorSpecialty = doctorSpecialty
                } else {
                    data = {}
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    handleEditSpecialty: handleEditSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,

}