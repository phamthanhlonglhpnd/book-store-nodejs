import adminService from "../services/adminService";

// Type of Handbook
let createType = async (req, res) => {
    try {
        let response = await adminService.createTypeService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updateType = async (req, res) => {
    try {
        let response = await adminService.updateTypeService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllType = async (req, res) => {
    try {
        let response = await adminService.getAllTypeService(+req.query.page);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteType = async (req, res) => {
    try {
        let response = await adminService.deleteTypeService(req.body.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

// Handbook
let createHandbook = async (req, res) => {
    try {
        let response = await adminService.createHandbookService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updateHandbook = async (req, res) => {
    try {
        let response = await adminService.updateHandbookService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllHandbooks = async (req, res) => {
    try {
        let response = await adminService.getAllHandbooksService(+req.query.limit);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteHandbook = async (req, res) => {
    try {
        let response = await adminService.deleteHandbookService(req.body.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getHandbookByID = async (req, res) => {
    try {
        let response = await adminService.getHandbookByIDService(req.query.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

// Author
let createAuthor = async (req, res) => {
    try {
        let response = await adminService.createAuthorService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updateAuthor = async (req, res) => {
    try {
        let response = await adminService.updateAuthorService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllAuthors = async (req, res) => {
    try {
        let response = await adminService.getAllAuthorsService(+req.query.limit);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteAuthor = async (req, res) => {
    try {
        let response = await adminService.deleteAuthorService(req.body.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAuthorByID = async (req, res) => {
    try {
        let response = await adminService.getAuthorByIDService(req.query.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

// Store
let createStore = async (req, res) => {
    try {
        let response = await adminService.createStoreService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updateStore = async (req, res) => {
    try {
        let response = await adminService.updateStoreService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllStores = async (req, res) => {
    try {
        let response = await adminService.getAllStoresService(+req.query.limit);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteStore = async (req, res) => {
    try {
        let response = await adminService.deleteStoreService(req.body.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getStoreByID = async (req, res) => {
    try {
        let response = await adminService.getStoreByIDService(req.query.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}


// Publisher
let createPublisher = async (req, res) => {
    try {
        let response = await adminService.createPublisherService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updatePublisher = async (req, res) => {
    try {
        let response = await adminService.updatePublisherService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllPublishers = async (req, res) => {
    try {
        let response = await adminService.getAllPublishersService(+req.query.limit);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deletePublisher = async (req, res) => {
    try {
        let response = await adminService.deletePublisherService(req.body.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getPublisherByID = async (req, res) => {
    try {
        let response = await adminService.getPublisherByIDService(req.query.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

// Language
let createLanguage = async (req, res) => {
    try {
        let response = await adminService.createLanguageService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllLanguages = async (req, res) => {
    try {
        let response = await adminService.getAllLanguagesService();
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updateLanguage = async (req, res) => {
    try {
        let response = await adminService.updateLanguageService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteLanguage = async (req, res) => {
    try {
        let response = await adminService.deleteLanguageService(req.body.id);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

module.exports = {
    createType, updateType, getAllType, deleteType,
    createHandbook, getAllHandbooks, updateHandbook, deleteHandbook, getHandbookByID,
    createAuthor, updateAuthor, getAllAuthors, getAuthorByID, deleteAuthor,
    createStore, updateStore, getAllStores, deleteStore, getStoreByID,
    createPublisher, updatePublisher, getAllPublishers, deletePublisher, getPublisherByID,
    createLanguage, getAllLanguages, updateLanguage, deleteLanguage,
    

}