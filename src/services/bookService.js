import db from '../models/index';

let createBookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = await db.Book.create({
                name: data.name,
                image: data.image,
                descriptionHTML: data.descriptionHTML,
                // descriptionMarkdown: data.descriptionMarkdown,
                page: data.page,
                price: data.price,
                dimension: data.dimension,
                count: data.count,
                publisherID: data.publisherID,
                languageID: data.languageID,
                // storeID: data.storeID,
                publish_date: data.publishDate,
            });

            let book_type = data.typeID.map(item => {
                return {
                    bookID: book.toJSON().id,
                    typeID: item
                }
            });
            let book_author = data.authorID.map(item => {
                return {
                    bookID: book.toJSON().id,
                    authorID: item
                }
            });

            await db.Book_Author.bulkCreate(book_author);
            await db.Book_Type.bulkCreate(book_type);

            resolve({
                errCode: 0,
                errMessage: "OK!",
                book
            })

        } catch (e) {
            reject(e);
            console.log(e);
        }
    })
}

let deleteBookService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Book.destroy({
                where: { id: id }
            })
            await db.Book_Author.destroy({
                where: { bookID: id }
            })
            await db.Book_Type.destroy({
                where: { bookID: id }
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

let getAllBooksService = (page) => {
    return new Promise(async (resolve, reject) => {
        try {

            let books = [];
            if(!page) {
                books = await db.Books.findAll({
                    include: [
                        {
                            model: db.Language, as: 'language', attributes: ['name', 'id']
                        },
                        {
                            model: db.Publisher, as: 'publisher', attributes: ['name', 'id']
                        },
                        {
                            model: db.Store, as: 'store', attributes: ['name', 'id']
                        },
                    ],
                    raw: true,
                    nest: true
                });
                resolve( {
                    errCode: 0,
                    errMessage: "OK",
                    books
                });
            } else {
                let book = await db.Book.findAndCountAll({
                    limit: 10,
                    offset: page > 1 ? 10 * (page - 1) : 0,
                    include: [
                        {
                            model: db.Language, as: 'language', attributes: ['name', 'id']
                        },
                        {
                            model: db.Publisher, as: 'publisher', attributes: ['name', 'id']
                        },
                        {
                            model: db.Store, as: 'store', attributes: ['name', 'id']
                        },
                    ],
                    raw: true,
                    nest: true
                })
                const { count, rows } = book;
                books = rows;
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    count,
                    books,
                })
            }

            
        } catch(e) {
            reject(e);
            console.log(e);
        }
    })
}

let getBookByFilterService = (type) => {
    return new Promise(async(resolve, reject) => {
        try {
            let types = await db.Book_Type.findAll({
                where: { typeID: type },
            })

            let books = await Promise.all(types.map(async type => {
                let book = await db.Book.findOne({
                    where: { id: type.bookID },
                    attributes: ['id', 'name', 'image', 'price', 'page'],
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
            reject(e);
            console.log(e);
        }
    })
}

let getBookByIDService = (id) => {
    return new Promise( async(resolve, reject) => {
        try {
            let book = await db.Book.findOne({
                where: { id: id },
                include: [
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
                        model: db.Book_Author, 
                        attributes: ['authorID'],
                        include: [
                            {
                                model: db.Author, attributes: ['id', 'name', 'descriptionHTML']
                            }
                        ]
                    },
                    {
                        model: db.Language, as: 'language', attributes: ['name', 'id']
                    },
                    {
                        model: db.Publisher, as: 'publisher', attributes: ['name', 'id']
                    },
                    {
                        model: db.Store, as: 'store', attributes: ['name', 'id']
                    },
                ],
                raw: false
            })

            resolve({
                errCode: 0,
                errMessage: "OK!",
                book
            })
        } catch(e) {
            reject(e);
            console.log(e);
        }
    })
}

module.exports = {
    createBookService, deleteBookService, getAllBooksService, getBookByIDService, 
    getBookByFilterService, 
}