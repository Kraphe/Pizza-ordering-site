// this is factory function, here factory functions return object  
function authController(){
    return {
        login(req,res){
            res.render('auth/login')
        },

        register(req,res){
            res.render('auth/register')
        }
    }
}

module.exports=authController;