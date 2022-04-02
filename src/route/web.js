import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import bookController from '../controllers/bookController';
import authController from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';
import adminController from '../controllers/adminController';

let router = express.Router();

let initWebRoutes = (app) => {

    // Don't need token
    router.get("/", homeController.getHomePage);

    router.post("/api/login-token", authController.login);
    router.post("/api/refresh-token", authController.refreshToken);
    router.post("/api/register", userController.register);
    router.put("/api/forgot-password", userController.forgotPassword);
    router.get("/api/logout", authController.logout);

    router.get("/api/get-all-type-of-handbook", adminController.getAllType);

    router.get("/api/get-all-handbooks", adminController.getAllHandbooks);
    router.get("/api/get-handbook-by-id", adminController.getHandbookByID);

    router.get("/api/get-all-authors", adminController.getAllAuthors);
    router.get("/api/get-author-by-id", adminController.getAuthorByID);

    router.get("/api/get-all-stores", adminController.getAllStores);
    router.get("/api/get-store-by-id", adminController.getStoreByID);

    router.get("/api/get-all-publishers", adminController.getAllPublishers);
    router.get("/api/get-publisher-by-id", adminController.getPublisherByID);

    router.get("/api/get-all-languages", adminController.getAllLanguages);

    router.get("/api/get-all-books", bookController.getAllBooks);
    router.get("/api/get-book-by-id", bookController.getBookByID);
    router.get("/api/get-book-by-filter", bookController.getBookByFilter);

    // Need token
    router.use(authMiddleware.isAuth);

    // Users
    router.get("/api/get-all-users", userController.getAllUsers);
    router.delete("/api/delete-user", userController.deleteUser);
    router.post("/api/create-new-user", userController.createNewUser);
    router.put("/api/update-user", userController.updateUser);
    router.put("/api/change-password", userController.changePassword);
    router.get("/api/get-user-by-id", userController.getUserByID);

    //Type of Handbook
    router.post("/api/create-type", adminController.createType);
    router.put("/api/update-type", adminController.updateType);
    router.delete("/api/delete-type", adminController.deleteType);

    // Handbook
    router.post("/api/create-handbook", adminController.createHandbook);
    router.put("/api/update-handbook", adminController.updateHandbook);
    router.delete("/api/delete-handbook", adminController.deleteHandbook);

    // Author
    router.post("/api/create-author", adminController.createAuthor);
    router.put("/api/update-author", adminController.updateAuthor);
    router.delete("/api/delete-author", adminController.deleteAuthor);

    // Store
    router.post("/api/create-store", adminController.createStore);
    router.put("/api/update-store", adminController.updateStore);
    router.delete("/api/delete-store", adminController.deleteStore);

    // Publisher
    router.post("/api/create-publisher", adminController.createPublisher);
    router.put("/api/update-publisher", adminController.updatePublisher);
    router.delete("/api/delete-publisher", adminController.deletePublisher);

    // Language
    router.post("/api/create-language", adminController.createLanguage);
    router.put("/api/update-language", adminController.updateLanguage);
    router.delete("/api/delete-language", adminController.deleteLanguage);

    // Book
    router.post("/api/create-book", bookController.createBook);
    router.delete("/api/delete-book", bookController.deleteBook);

    return app.use("/", router);
}

module.exports = initWebRoutes;