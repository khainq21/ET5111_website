import db from "../models"

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
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

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()
            //convert image to string
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

let handleEditClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.descriptionMarkdown || !data.descriptionHTML || !data.address) {
                resolve({
                    errCode: 2,
                    Message: 'Missing parameter!'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (clinic) {
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                if (data.image) {
                    clinic.image = data.image;
                }
                await clinic.save();

                resolve({
                    errCode: 0,
                    Message: 'Clinic is Updated'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Clinic not found!'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    Message: 'Missing parameter!'
                })
            } else {
                // get description clinic
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown', 'image']
                })
                if (data) {
                    // get doctor_infor
                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: inputId
                        },
                        attributes: ['doctorId', 'provinceId']
                    })

                    // append doctorId & provinceId to data
                    data.doctorClinic = doctorClinic
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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    handleEditClinic: handleEditClinic,
    getDetailClinicById: getDetailClinicById,
}
