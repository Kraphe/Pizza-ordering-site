const express=require('express');

const app=express();

const ejs=require('ejs');

const path= require('path');   

const expressLayout=require('express-ejs-layouts');

const mongoose=require('mongoose');

const session=require('express-session')  

const flash =require('express-flash')

const MongoDbStore=require('connect-mongo')

const passport =require('passport')  

const Emitter=require('events')

require('dotenv').config();

//DATA BASE CONNECTION
const url=process.env.MONGO_URL

//'mongodb+srv://ephar:CspAPHhPsFn17UUZ@cluster0.4j7er2t.mongodb.net/?retryWrites=true&w=majority';
//'mongodb://localhost/pizzaa';//
const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true,
};
mongoose.connect(url, connectionParams);
/*
mongoose.set("strictQuery", false); 
mongoose.connect(url)
.then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log(err)
}) */
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected...');
}).on('error',err => {
    console.log('Connection failed...')
});



app.use(flash());
const eventEmitter=new Emitter()
app.set('eventEmitter',eventEmitter)

//session config  
app.use(session({
    secret: 'passward' ,
    resave: true,
    store: MongoDbStore.create({
        mongoUrl:url}),
    saveUninitialized: true,
    cookie: {   maxAge:1000 * 60 * 60* 24}
}))

//passport config
const passportInit=require('./app/config/passport')  
passportInit(passport);  
app.use(passport.initialize()) 
app.use(passport.session())    

//Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))   
app.use(express.json())  

//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})

// set Template engine
app.use( expressLayout);
app.set('views',path.join(__dirname,'/resources/views')) 
app.set('view engine','ejs');

//routes
require('./routes/web')(app)  

const PORT=4040;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})
