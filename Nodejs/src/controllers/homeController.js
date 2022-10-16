import db from '../models/index';
import CRUDservice from '../service/CRUDservice';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}
let getCRUD = async (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send(message)
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDservice.getUserById(userId)
        console.log(userData)
        return res.render('editCRUD.ejs', {
            user: userData
        })
    }
    else {
        return res.send("Users not found!")
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDservice.updateUserData(data)

    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let allUser = await CRUDservice.deleteUser(userId)
        return res.render('displayCRUD.ejs', {
            dataTable: allUser
        })
    } else {
        return res.send("Users not found!")
    }
}
// //opject {
//     key:
//     value
// }
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}