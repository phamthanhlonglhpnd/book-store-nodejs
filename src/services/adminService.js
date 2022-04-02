import db from '../models/index';

// CRUD Type of Handbook
let createTypeService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let type = await db.Type_Of_Handbook.create({
                name: data.name,
            });

            resolve({
                errCode: 0,
                errMessage: "OK",
                type
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateTypeService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing params!"
                })
            } else {
                let type = await db.Type_Of_Handbook.findOne({
                    where: { id: data.id },
                    raw: false
                })
                type.name = data.name;
                await type.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update success!"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllTypeService = async (page, limit) => {
    try {
        let types = {}
        if (!page && !limit) {
            types = await db.Type_Of_Handbook.findAll();
            return {
                errCode: 0,
                errMessage: "OK",
                types
            };
        } 
        if(page) {
            let type = await db.Type_Of_Handbook.findAndCountAll({
                limit: limit,
                offset: page > 1 ? limit * (page - 1) : 0
            });

            const { count, rows } = type;
            types = rows;
            return {
                errCode: 0,
                errMessage: "OK",
                count,
                types
            };
        }
        if(limit && page===0) {
            types = await db.Type_Of_Handbook.findAll({
                limit: limit
            });
            return {
                errCode: 0,
                errMessage: "OK",
                types
            }
        }
    } catch (e) {
        return e;
    }
}

let deleteTypeService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Type_Of_Handbook.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                errMessage: "Delete success!"
            })

        } catch (e) {
            reject(e);
        }
    })
}

// CRUD Handbooks
let createHandbookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let typeOfHandbook = await db.Type_Of_Handbook.findOne({
                where: { id: data.typeID }
            })

            let newHandbook = await db.Handbook.create({
                name: data.name,
                image: data.image,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown,
                typeID: data.typeID
            })

            let handbook = {
                ...newHandbook.dataValues, typeOfHandbook
            }

            resolve({
                errCode: 0,
                errMessage: "OK",
                handbook
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateHandbookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing params!"
                })
            } else {
                let updateHandbook = await db.Handbook.findOne({
                    where: { id: data.id },
                    raw: false
                })

                updateHandbook.name = data.name || "";
                updateHandbook.image = data.image || "";
                updateHandbook.descriptionHTML = data.descriptionHTML || "";
                updateHandbook.descriptionMarkdown = data.descriptionMarkdown || "";
                updateHandbook.typeID = data.typeID || "";
                await updateHandbook.save();

                let typeOfHandbook = await db.Type_Of_Handbook.findOne({
                    where: { id: data.typeID }
                })

                let handbook = {
                    ...updateHandbook.dataValues, typeOfHandbook
                }

                resolve({
                    errCode: 0,
                    errMessage: "Update success!",
                    handbook
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}


let getAllHandbooksService = async (limit) => {
    try {
        let handbooks = await db.Handbook.findAll({
            include: [
                {
                    model: db.Type_Of_Handbook, as: 'typeOfHandbook'
                }
            ],
            limit: limit,
            raw: true,
            nest: true
        });
        return {
            errCode: 0,
            errMessage: "OK",
            handbooks
        };
    } catch (e) {
        return e;
    }
}

let deleteHandbookService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Handbook.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                errMessage: "Delete success!"
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getHandbookByIDService = async (id) => {
    try {
        let handbook = await db.Handbook.findOne({
            where: { id: id },
            raw: false
        })
        return {
            errCode: 0,
            errMessage: "Ok",
            handbook
        }
    } catch (e) {
        return e;
    }
}

// CRUD Authors 
let createAuthorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let author = await db.Author.create({
                name: data.name,
                image: data.image,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown,
            })

            resolve({
                errCode: 0,
                errMessage: "OK",
                author
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateAuthorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing params!"
                })
            } else {
                let author = await db.Author.findOne({
                    where: { id: data.id },
                    raw: false
                })

                author.name = data.name || "";
                author.image = data.image || "";
                author.descriptionHTML = data.descriptionHTML || "";
                author.descriptionMarkdown = data.descriptionMarkdown || "";
                await author.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update success!",
                    author
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}


let getAllAuthorsService = async (limit) => {
    try {
        let authors = {};
        if (limit) {
            authors = await db.Author.findAll({
                limit: limit
            });
        } else {
            authors = await db.Author.findAll();
        }

        return {
            errCode: 0,
            errMessage: "OK",
            authors
        };
    } catch (e) {
        return e;
    }
}

let deleteAuthorService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Author.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                errMessage: "Delete success!"
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getAuthorByIDService = async (id) => {
    try {
        let author = await db.Author.findOne({
            where: { id: id },
            raw: false
        })
        return {
            errCode: 0,
            errMessage: "Ok",
            author
        }
    } catch (e) {
        return e;
    }
}

// CRUD Stores
let createStoreService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let store = await db.Store.create({
                name: data.name,
            })

            resolve({
                errCode: 0,
                errMessage: "OK",
                store
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateStoreService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing params!"
                })
            } else {
                let store = await db.Store.findOne({
                    where: { id: data.id },
                    raw: false
                })

                store.name = data.name || "";
                await store.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update success!",
                    store
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}


let getAllStoresService = async (limit) => {
    try {
        let stores = {};
        if (limit) {
            stores = await db.Store.findAll({
                limit: limit
            });
        } else {
            stores = await db.Store.findAll();
        }
        return {
            errCode: 0,
            errMessage: "OK",
            stores
        };
    } catch (e) {
        return e;
    }
}

let deleteStoreService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Store.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                errMessage: "Delete success!"
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getStoreByIDService = async (id) => {
    try {
        let store = await db.Store.findOne({
            where: { id: id },
            raw: false
        })
        return {
            errCode: 0,
            errMessage: "Ok",
            store
        }
    } catch (e) {
        return e;
    }
}

// CRUD Publishers
let createPublisherService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let publisher = await db.Publisher.create({
                name: data.name,
                image: data.image,
                descriptionHTML: data.descriptionHTML,
            })

            resolve({
                errCode: 0,
                errMessage: "OK",
                publisher
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updatePublisherService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing params!"
                })
            } else {
                let publisher = await db.Publisher.findOne({
                    where: { id: data.id },
                    raw: false
                })

                publisher.name = data.name || "";
                publisher.image = data.image || "";
                publisher.descriptionHTML = data.descriptionHTML || "";
                publisher.descriptionMarkdown = data.descriptionMarkdown || "";
                await publisher.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update success!",
                    publisher
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}


let getAllPublishersService = async (limit) => {
    try {
        let publishers = {};
        if (limit) {
            publishers = await db.Publisher.findAll({
                limit: limit
            });
        } else {
            publishers = await db.Publisher.findAll();
        }

        return {
            errCode: 0,
            errMessage: "OK",
            publishers
        };
    } catch (e) {
        return e;
    }
}

let deletePublisherService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Publisher.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                errMessage: "Delete success!"
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getPublisherByIDService = async (id) => {
    try {
        let publisher = await db.Publisher.findOne({
            where: { id: id },
            raw: false
        })
        return {
            errCode: 0,
            errMessage: "Ok",
            publisher
        }
    } catch (e) {
        return e;
    }
}

// CRUD Languages
let createLanguageService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let language = await db.Language.create({
                name: data.name,
            })

            resolve({
                errCode: 0,
                errMessage: "OK",
                language
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllLanguagesService = async () => {
    try {
        let languages = await db.Language.findAll();
        return {
            errCode: 0,
            errMessage: "OK",
            languages
        };
    } catch (e) {
        return e;
    }
}

let updateLanguageService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing params!"
                })
            } else {
                let language = await db.Language.findOne({
                    where: { id: data.id },
                    raw: false
                })

                language.name = data.name || "";
                await language.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update success!",
                    language
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteLanguageService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Language.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                errMessage: "Delete success!"
            })

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createTypeService, getAllTypeService, updateTypeService, deleteTypeService,
    createHandbookService, getAllHandbooksService, updateHandbookService, deleteHandbookService, getHandbookByIDService,
    createAuthorService, updateAuthorService, getAllAuthorsService, getAuthorByIDService, deleteAuthorService,
    createStoreService, updateStoreService, getAllStoresService, deleteStoreService, getStoreByIDService,
    createPublisherService, updatePublisherService, getAllPublishersService, deletePublisherService, getPublisherByIDService,
    createLanguageService, getAllLanguagesService, deleteLanguageService, updateLanguageService,

}