import db from '../models/index';

let createBookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = await db.Book.create({
                name: data.name,
                image: data.image,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown,
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
            let books = await db.Book.findAll({
                include: [
                    {
                        model: db.Book_Author, 
                        include: [
                            {
                                model: db.Author, as: 'authorOfBook', attributes: ['name']
                            }
                        ]
                    },
                    // {
                    //     model: db.Book_Type, 
                    //     include: [
                    //         {
                    //             model: db.Type_Of_Handbook, as: 'typeOfBook', attributes: ['name']
                    //         }
                    //     ]
                    // },
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

            resolve({
                errCode: 0,
                errMessage: "OK",
                books,
            })
        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createBookService, deleteBookService, getAllBooksService,
}