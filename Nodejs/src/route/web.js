import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    //---create user---------
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)

    //-----table user--------
    router.get('/get-crud', homeController.displayGetCRUD)

    //-----edit---delete-----
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    //-------Api----------------
    router.post('/api/login', userController.handleLoging)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    return app.use("/", router);

}

module.exports = initWebRoutes;