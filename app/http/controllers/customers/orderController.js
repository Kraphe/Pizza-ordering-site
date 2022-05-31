const Order =require('../../../models/order')
const moment =require('moment')

function orderController(){
    return {
        store(req,res){
           //validate request
           const {phone, address}=req.body
           console.log(req.body.items);
           // if user does not fill phone number or address
           if(!phone||!address){
               req.flash('error','All fields are required')
               return res.redirect('/cart')
           }

           const order = new Order({
               customerId: req.user._id,
               items:req.session.cart.items,
               phone,
               address
           }) 
          // console.log(order)

           order.save().then(result=>{
               req.flash('success','Order placed successfully')
               delete req.session.cart  //emptying cart 
               return res.redirect('/customer/orders')
           }).catch(err=>{
               console.log(err)
               req.flash('error','Something went wrong')  
               return res.redirect('/cart')
           })
        },
        async index(req,res){
            const orders=await Order.find({customerId : req.user._id},
                null,
                {sort:{'createdAt':-1}})
                res.header('Cache-Control', 'no-store')
                res.render('customers/orders',{orders: orders,moment:moment})
           // console.log(orders.length)
        }
    }
}


module.exports = orderController