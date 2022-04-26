import db from '../models/index';
import bcrypt from 'bcryptjs';
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';
import client from '../config/es';
const { Op } = require("sequelize");
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
                    attributes: ['id', 'email', 'name', 'phone', 'password', 'roleID'],
                    include: [
                        {
                            model: db.Zipcode, 
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        }
                    ],
                    raw: false
                })

                let check = await bcrypt.compareSync(password, user.password);
                if(check) {

                    const { id, name, roleID, phone, Zipcodes } = user;
                    const data = { email, id, roleID };
     
                    const access_token = await jwtHelper.generateToken(data, accessTokenSecret, accessTokenLife);
     
                    const refresh_token = await jwtHelper.generateToken(data, refreshTokenSecret, refreshTokenLife);

                    const userData = { id, email, name, phone, roleID, access_token, refresh_token, Zipcodes };

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
                errCode: 1,
                errMessage: "Your email is exist in system. Plz try another email!"
            }
        };
        if(!user.email || !user.password) {
            return {
                errCode: 2,
                errMessage: "Missing params!"
            }
        };
        await db.User.create({
            email: user.email,
            password: hassPassWord,
            roleID: 'R3'
        });
        return {
            errCode: 0,
            errMessage: "OK",
        }
    } catch(e) {
        return e;
    }
}

let changePasswordService = async (userData) => {
    try {
        let user = await db.User.findOne({
            where: { id: userData.id },
            attributes: ['password', 'id'],
            raw: false
        })
        
        let check = await bcrypt.compareSync(userData.password, user.password);
       
        if(check) {
            let hassPassWord = await hashUserPassword(userData.newPassword);
            user.password = hassPassWord;
            await user.save();
            return {
                errCode: 0,
                errMessage: "Change Password Success!"
            }
        } else {
            return {
                errCode: 1,
                errMessage: "Wrong Password!"
            }
        }
    } catch(e) {
        return e;
    }
}

let forgotPasswordService = async (userData) => {
    try {
        let user = await db.User.findOne({
            where: { email: userData.email },
            attributes: ['password', 'id', 'email', 'name'],
            raw: false
        })
        if(!user) {
            return {
                errCode: 1,
                errMessage: "Your email isn't exist in system!"
            }
        } else {
            let newPassword = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
            let newHassPassword = await hashUserPassword(newPassword.toString());
            
            user.password = newHassPassword;
            await user.save();
            await emailService.forgotPasswordEmail({
                receiveEmail: userData.email,
                newPassword: newPassword,
                name: user.name
            })
            return {
                errCode: 0,
                errMessage: "Please check your email to get new password!"
            }
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
                    image: data.image ? data.image : "",
                    phone: data.phone ? data.phone : ""
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

let getUserByIDService = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password', 'access_token', 'refresh_token']
            },
            raw: false
        }) 
        return {
            errCode: 0,
            errMessage: "Ok",
            user
        }
    } catch(e) {
        return e;
    }
}

let updateUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id) {
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
                    user.image = data.image;
                    user.phone = data.phone;
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

let addToCartService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Cart.findOne({
                where: {
                    bookID: data.bookID,
                    userID: data.userID
                }
            })
            
            if(check !== null) {
                resolve({
                    errCode: 1,
                    errMessage: "This book has already been in your shopping cart!"
                })
            } else {
                let cart = await db.Cart.create({
                    bookID: data.bookID,
                    userID: data.userID,
                    quantity: 1,
                })
    
                resolve({
                    errCode: 0,
                    errMessage: "OK!",
                    cart
                })
            }

        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let getBooksInCartService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = await db.Cart.findAll({
                where: { userID: id },
                attributes: ['bookID']
            })

            let books = await Promise.all(carts.map(async cart => {
                let book = await db.Book.findOne({
                    where: { id: cart.bookID },
                    attributes: ['id', 'name', 'image', 'price', 'count'],
                    include: [
                        {
                            model: db.Book_Author, 
                            attributes: ['authorID'],
                            include: [
                                {
                                    model: db.Author, attributes: ['id', 'name']
                                }
                            ]
                        },
                        {
                            model: db.Book_Type, 
                            attributes: ['typeID'],
                            include: [
                                {
                                    model: db.Type_Of_Handbook, attributes: ['id', 'name']
                                }
                            ]
                        },
                        {
                            model: db.Cart, attributes: ['quantity']
                        }
                    ],
                    raw: false,
                })
                return book;
            }))
            resolve({
                errCode: 0,
                errMessage: "OK!",
                books
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let deleteBookInCartService = (bookID, userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            await db.Cart.destroy({
                where: {
                    bookID,
                    userID
                }
            })
            resolve({
                errCode: 0,
                errMessage: "OK!",
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let createAddressService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let address = await db.Zipcode.create({
                userID: data.userID,
                province: data.province,
                district: data.district,
                ward: data.ward,
                street: data.street,
                isDefault: 1,
            })

            resolve({
                errCode: 0,
                errMessage: "OK!",
                address
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let getAllAddressService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let address = await db.Zipcode.findAll({
                where: { userID: id }
            })

            resolve({
                errCode: 0,
                errMessage: "OK!",
                address
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let deleteAddressService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

        } catch(e) {
            reject(e);
        }
    })
}

let orderService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transaction = await db.Transaction.create({
                lading_code: uuidv4(),
                userID: data.userID,
                amount: data.amount,
                statusID: "S1",
                paymentID: data.paymentID,
                address_receiver: data.address_receiver,
                name_receiver: data.name_receiver,
                phone_receiver: data.phone_receiver,
            })

            let orders = data.books.map(item => {
                return {
                    transactionID: transaction.toJSON().id,
                    bookID: item.id,
                    quantity: item.Carts[0].quantity,
                    price: item.price
                }
            })

            await db.Order.bulkCreate(orders);

            resolve({
                errCode: 0,
                errMessage: "OK!",
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let getAllNonConfirmedOrdersService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await db.Transaction.findAll({
                where: {
                    userID: id,
                    statusID: "S1"
                },
                include: [
                    {
                        model: db.Order,
                        include: [
                            {
                                model: db.Book,
                                attributes: ['name', 'image']
                            }
                        ]
                    }
                ],
                raw: false
            })

            resolve({
                errCode: 0,
                errMessage: "OK!",
                orders
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let deleteOrderService = (transactionID, userID) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Transaction.destroy({
                where: {
                    transactionID: transactionID,
                    userID: userID,
                    statusID: "S1"
                }
            })

            resolve({
                errCode: 0,
                errMessage: "OK!"
            })
        } catch(e) {
            reject(e);
        }
    })
}

let getAllConfirmedOrdersService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await db.Transaction.findAll({
                where: {
                    userID: id,
                    statusID: "S2"
                },
                include: [
                    {
                        model: db.Order,
                        include: [
                            {
                                model: db.Book,
                                attributes: ['name', 'image']
                            }
                        ]
                    }
                ],
                raw: false
            })

            resolve({
                errCode: 0,
                errMessage: "OK!",
                orders
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let getAllCanceledOrdersService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await db.Transaction.findAll({
                where: {
                    userID: id,
                    statusID: "S3"
                },
                include: [
                    {
                        model: db.Order,
                        include: [
                            {
                                model: db.Book,
                                attributes: ['name', 'image']
                            }
                        ]
                    }
                ],
                raw: false
            })

            resolve({
                errCode: 0,
                errMessage: "OK!",
                orders
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let searchTypeOfBooksService = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await client.search({
                index: 'type_of_handbooks',
                size: 100,
                query: {
                    bool: {
                        filter: [
                          {
                            range: {
                              createdat: {
                                gte: "2022-02-23",
                                lte: "2022-04-01"
                              }
                            }
                          }
                        ]
                      }
                },
                _source: true
              })

            resolve({
                errCode: 0, 
                errMessage: "OK!",
                response
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let searchAuthorsService = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await client.search({
                index: 'authors',
                size: 1000,
                track_total_hits: true,
                query: {
                    fuzzy: {
                        name: {
                            value: keyword,
                            fuzziness: "AUTO"
                        }
                    },
                },
                _source: true
              })

            resolve({
                errCode: 0, 
                errMessage: "OK!",
                response
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let searchAuthorsSQLService = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Author.findAll({
                where: {
                    name : {[Op.like]: `%${keyword}%`}
                },
            });

            resolve({
                errCode: 0, 
                errMessage: "OK!",
                response
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let searchBooksService = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await client.search({
                index: 'books',
                size: 1000,
                track_total_hits: true,
                query: {
                    fuzzy: {
                        name: {
                            value: keyword,
                            fuzziness: "AUTO"
                        }
                    },
                },
                _source: true
              })

            resolve({
                errCode: 0, 
                errMessage: "OK!",
                response
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

let searchBooksSQLService = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Book.findAll({
                where: {
                    name : {[Op.like]: `%${keyword}%`}
                },
            });

            resolve({
                errCode: 0, 
                errMessage: "OK!",
                response
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

module.exports = {
    loginService, registerService, forgotPasswordService, changePasswordService,
    getAllUsersService, createNewUserService, updateUserService, deleteUserService, 
    getUserByIDService, addToCartService, getBooksInCartService, deleteBookInCartService,
    createAddressService, deleteAddressService, getAllAddressService, orderService, 
    getAllNonConfirmedOrdersService, deleteOrderService, getAllConfirmedOrdersService,
    getAllCanceledOrdersService, searchTypeOfBooksService, searchAuthorsService,
    searchAuthorsSQLService, searchBooksService, searchBooksSQLService, 

}