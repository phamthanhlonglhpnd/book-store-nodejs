import bookService from '../services/bookService';

let createBook = async (req, res) => {
    try {
        let response = await bookService.createBookService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteBook = async (req, res) => {
    try {
        let response = await bookService.deleteBookService(req.body.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllBooks = async (req, res) => {
    try {
        let response = await bookService.getAllBooksService(+req.query.page);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getBookByID = async (req, res) => {
    try {
        let response = await bookService.getBookByIDService(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getBookByFilter = async (req, res) => {
    try {
        let response = await bookService.getBookByFilterService(+req.query.type);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

module.exports = {
    createBook, deleteBook, getAllBooks, getBookByID, 
    getBookByFilter, 
}