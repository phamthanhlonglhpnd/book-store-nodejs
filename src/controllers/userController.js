import userService from '../services/userService';

let login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameters"
        })
    }

    let userData = await userService.loginService(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.userData ? userData.userData : {}
    })
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
        let users = await userService.getAllUsersService();
        return res.status(200).json(users)
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

module.exports = {
    login, createNewUser, getAllUsers, deleteUser, updateUser
}