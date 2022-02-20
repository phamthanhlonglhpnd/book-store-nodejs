import db from '../models/index';
import bcrypt from 'bcryptjs';
const jwtHelper = require("../helpers/jwt.helper");

const salt = bcrypt.genSaltSync(10);

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "BOOKSTOREPOALRBEAR";

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "POLARBEARBOOKSTORE";

let loginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserEmail(email);
            if(isExist) {
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['id', 'email', 'name', 'password', 'roleID'],
                    raw: false
                })
                let check = await bcrypt.compareSync(password, user.password);
                if(check) {

                    const { id, name, roleID } = user;
                    const data = { email, id, roleID };
     
                    const accessToken = await jwtHelper.generateToken(data, accessTokenSecret, accessTokenLife);
     
                    const refreshToken = await jwtHelper.generateToken(data, refreshTokenSecret, refreshTokenLife);

                    user.access_token = accessToken;
                    user.refresh_token = refreshToken;

                    const { access_token, refresh_token } = user;

                    const userData = { id, email, name, roleID, access_token, refresh_token };

                    await user.save();
                    
                    resolve({
                        errCode: 0,
                        errMessage: "OK!",
                        userData
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Your password is wrong!"
                    })
                }
            } else {
                resolve({
                   errCode: 1,
                    errMessage: "Your email is not exist in system!"
                })
            }
        } catch(e) {
            reject(e);
        }
    })
}

let registerService = async (user) => {
    try {
        let email = await checkUserEmail(user.email);
        let hassPassWord = await hashUserPassword(user.password);
        if(email) {
            return {
                errCode: -1,
                errMessage: "Your email is exist in system. Plz try another email!"
            }
        };
        if(!user.email || !user.password || !user.name) {
            return {
                errCode: 1,
                errMessage: "Missing params!"
            }
        };
        let userData = await db.User.create({
            email: user.email,
            password: hassPassWord,
            name: user.name,
            roleID: 'R3'
        });
        return {
            errCode: 0,
            errMessage: "OK",
            userData
        }
    } catch(e) {
        return e;
    }
}

let refreshTokenService = () => {
    return new Promise( async (resolve, reject) => {
        try {

        } catch(e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if(user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch(e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch(e) {
            reject(e);
        }
    })
}

let createNewUserService = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let emailExist = await checkUserEmail(data.email);
            let hashPassword = await hashUserPassword(data.password);
            if(emailExist) {
                resolve({
                    errCode: 1,
                    errMessage: "This email is exist in system. Plz try another email!"
                })
            } else {
                let user = await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    name: data.name,
                    roleID: data.roleID,
                })

                delete user.password;

                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    user
                });    
            }
        } catch(e) {
            reject(e);
        }
    })
}

let getAllUsersService = async () => {
    
        try {
            let users = await db.User.findAll({
                attributes: {
                    exclude: ['password', 'access_token', 'refresh_token']
                },
            })
            return {
                errCode: 0,
                errMessage: "OK",
                users
            };
        } catch(e) {
            return e;
        }
    
}

let updateUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id || !data.email || !data.name) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing params!"
                })
            } else {
                let user = await db.User.findOne({
                    where: {id: data.id},
                    raw: false
                })
                if(!user) {
                    resolve({
                        errCode: 1,
                        errMessage: "User not found!"
                    })
                } else {
                    user.name = data.name;
                    user.roleID = data.roleID;
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update success!"
                    });
                }
            }
        } catch(e) {
            reject(e);
        }
    })
}

let deleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: id}
            })
            if(!user) {
                resolve({
                    errCode: 1,
                    errMessage: "User not found!"
                })
            } else {
                await db.User.destroy({
                    where: {id: id}
                })
                resolve({
                    errCode: 0,
                    errMessage: "Delete success!"
                })
            }
        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    loginService, registerService, getAllUsersService,
    createNewUserService, updateUserService, deleteUserService
}