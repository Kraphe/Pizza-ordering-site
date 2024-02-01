//if a person is already logged in than person cannot goes to the register nad login page
function guest(req,res,next){
    if(!req.isAuthenticated()){
        return  next()
    }
    return res.redirect('/')
}

module.exports=guest