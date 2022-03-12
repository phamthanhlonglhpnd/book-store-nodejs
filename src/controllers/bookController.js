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

module.exports = {
    createBook, deleteBook, getAllBooks,
}