import employeeService from '../services/employeeService';

let getAllNonConfirmedOrders = async (req, res) => {
    try {
        let response = await employeeService.getAllNonConfirmedOrdersService();
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
        let response = await employeeService.getAllConfirmedOrdersService();
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let confirmOrder = async (req, res) => {
    try {
        let response = await employeeService.confirmOrderService(req.body);
        return res.status(200).json(response)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

module.exports = {
    getAllNonConfirmedOrders, confirmOrder, getAllConfirmedOrders,

}