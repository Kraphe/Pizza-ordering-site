const order = require("../../../models/order")

const Order = require("../../../models/order")

function orderController(){
    return {
        index(req,res){
             // if order is not ($ne  this means not)
            order.find({status:{$ne:'completed'}},null,{ sort:{'createdAt':-1}}).
                populate('customer_id','-password').exec((err,orders)=>{
                if(req.xhr){
                    res.json(orders)
                }else
                {
                    res.render('admin/orders')
                }
            })
        }
    }
}

module.exports = orderController