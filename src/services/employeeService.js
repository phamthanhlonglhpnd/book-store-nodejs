import db from '../models/index';

let getAllNonConfirmedOrdersService = async () => {
    try {
        let orders = await db.Transaction.findAll({
            where: { statusID: "S1" }
        })
        return {
            errCode: 0,
            errMessage: "OK",
            orders
        };
    } catch(e) {
        return e;
    }
}

let getAllConfirmedOrdersService = async () => {
    try {
        let orders = await db.Transaction.findAll({
            where: { statusID: "S2" }
        })
        return {
            errCode: 0,
            errMessage: "OK",
            orders
        };
    } catch(e) {
        return e;
    }
}

let confirmOrderService = async (data) => {
    try {
        let order = await db.Transaction.findOne({
            where: {
                id: data.id,
                userID: data.userID,
                statusID: "S1"
            },
            raw: false
        })

        order.statusID = "S2";

        await order.save();
        return {
            errCode: 0,
            errMessage: "OK",
            order
        };
    } catch(e) {
        return e;
    }
}

module.exports = {
    getAllNonConfirmedOrdersService, confirmOrderService, getAllConfirmedOrdersService,

}