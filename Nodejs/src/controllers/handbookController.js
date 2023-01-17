import handbookService from "../service/handbookService";

let createHandbook = async (req, res) => {
    try {
        let infor = await handbookService.createHandbook(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            message: "Error form server!"
        })
    }
}

let getAllHandbook = async (req, res) => {
    try {
        let data = await handbookService.getAllHandbook()
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            message: "Error form server!"
        })
    }
}

let handleEditHandbook = async (req, res) => {
    try {
        let data = await handbookService.handleEditHandbook(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            message: "Error form server!"
        })
    }
}


let getDetailHandbookById = async (req, res) => {
    try {
        let data = await handbookService.getDetailHandbookById(req.query.id)
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
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    handleEditHandbook: handleEditHandbook,
    getDetailHandbookById
}