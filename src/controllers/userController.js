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

module.exports = {
    register, createNewUser, getAllUsers, deleteUser, 
    updateUser, changePassword, forgotPassword, getUserByID,
    

}