const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');

function initRoutes(app)   //functio defination, app is instance 
{
    app.get('/',homeController().index);    

    app.get('/cart',cartController().index);
    
    app.get('/register',authController().register)
    
    app.get('/login',authController().login)

    app.post('/update-cart', cartController().update)
    
}
module.exports=initRoutes    //we are exporting all the routes to server.js