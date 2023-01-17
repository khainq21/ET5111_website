import db from "../models"

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {
                await db.Handbook.create({
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

let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll()
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

let handleEditHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 2,
                    Message: 'Missing parameter!'
                })
            }
            let handbook = await db.Handbook.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            if (handbook) {
                handbook.name = data.name;
                handbook.descriptionHTML = data.descriptionHTML;
                handbook.descriptionMarkdown = data.descriptionMarkdown;
                if (data.image) {
                    handbook.image = data.image;
                }
                await handbook.save();

                resolve({
                    errCode: 0,
                    Message: 'handbook is Updated'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'handbook not found!'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    Message: 'Missing parameter!'
                })
            } else {
                // get description handbook
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId
                    }
                })
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
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    handleEditHandbook: handleEditHandbook,
    getDetailHandbookById: getDetailHandbookById,
}