import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import bookController from '../controllers/bookController';
import authController from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    router.post("/api/login-token", authController.login);
    router.post("/api/refresh-token", authController.refreshToken);
    router.get("/api/logout", authController.logout)
    
    router.use(authMiddleware.isAuth);
    router.get("/api/get-all-users", userController.getAllUsers);
    router.delete("/api/delete-user", userController.deleteUser);
    router.post("/api/create-new-user", userController.createNewUser);
    router.put("/api/update-user", userController.updateUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;