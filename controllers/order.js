const Order = require('../models/order');

exports.getOrders = async (req, res, next) => {
    try{
        const orders = await Order.find({userId: req.userId});
        res.status(200).json({orders: orders});
    } catch (e) {
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
}

exports.postOrder = async (req, res, next) => {
    try{
        const ingredients = {...req.body.ingredients};
        const orderData = {...req.body.orderData};
        console.log(orderData)
        const price = req.body.price;
        const order = new Order({ingredients: ingredients, orderData: orderData, price, userId: req.userId});
        let result = await order.save();
        res.status(200).json({_id: result._id});
    } catch(e) {
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }

}