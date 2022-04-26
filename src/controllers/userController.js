import userService from '../services/userService';

let register = async (req, res) => {
    try {
        let response = await userService.registerService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let changePassword = async (req, res) => {
    try {
        let response = await userService.changePasswordService(req.body);
        
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let forgotPassword = async (req, res) => {
    try {
        let response = await userService.forgotPasswordService(req.body);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let createNewUser = async (req, res) => {
    try {
        let data = await userService.createNewUserService(req.body);
        return res.status(200).json(data);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllUsers = async (req, res) => {
    try {
        let data = await userService.getAllUsersService();
        return res.status(200).json(data);
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
    
}

let deleteUser = async (req, res) => {
    try {
        let response = await userService.deleteUserService(req.body.id);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
    
}

let updateUser = async (req, res) => {
    try {
        let response = await userService.updateUserService(req.body);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
    
}

let getUserByID = async (req, res) => {
    try {
        let response = await userService.getUserByIDService(req.query.id);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let addToCart = async (req, res) => {
    try {
        let response = await userService.addToCartService(req.body);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getBooksInCart = async (req, res) => {
    try {
        let response = await userService.getBooksInCartService(req.query.id);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteBookInCart = async (req, res) => {
    try {
        let response = await userService.deleteBookInCartService(req.body.bookID, req.body.userID);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let createAddress = async (req, res) => {
    try {
        let response = await userService.createAddressService(req.body);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllAddress = async (req, res) => {
    try {
        let response = await userService.getAllAddressService(req.query.id);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteAddress = async (req, res) => {
    try {
        let response = await userService.deleteAddressService(req.body);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let order = async (req, res) => {
    try {
        let response = await userService.orderService(req.body);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllNonConfirmedOrders = async (req, res) => {
    try {
        let response = await userService.getAllNonConfirmedOrdersService(req.query.id);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllConfirmedOrders = async (req, res) => {
    try {
        let response = await userService.getAllConfirmedOrdersService(req.query.id);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getAllCancelededOrders = async (req, res) => {
    try {
        let response = await userService.getAllCancelededOrdersService(req.query.id);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteOrder = async (req, res) => {
    try {
        let response = await userService.deleteOrderService(req.query.transactionID, req.query.userID);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let searchTypeOfBooks = async (req, res) => {
    try {
        let response = await userService.searchTypeOfBooksService(req.query.keyword);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let searchAuthors = async (req, res) => {
    try {
        let response = await userService.searchAuthorsService(req.query.keyword);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let searchAuthorsSQL = async (req, res) => {
    try {
        let response = await userService.searchAuthorsSQLService(req.query.keyword);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let searchBooks = async (req, res) => {
    try {
        let response = await userService.searchBooksService(req.query.keyword);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let searchBooksSQL = async (req, res) => {
    try {
        let response = await userService.searchBooksSQLService(req.query.keyword);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}


module.exports = {
    register, createNewUser, getAllUsers, deleteUser, 
    updateUser, changePassword, forgotPassword, getUserByID,
    addToCart, getBooksInCart, deleteBookInCart, createAddress,
    deleteAddress, getAllAddress, order, getAllNonConfirmedOrders, 
    deleteOrder, getAllConfirmedOrders, getAllCancelededOrders, 
    searchTypeOfBooks, searchAuthors, searchAuthorsSQL, searchBooks,
    searchBooksSQL, 

}