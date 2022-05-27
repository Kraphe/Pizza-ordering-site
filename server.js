const dotenv=require('dotenv');

const express=require('express');

const app=express();

const ejs=require('ejs');

const path= require('path');   // this module genrate path  this is inbuild module no need to install

const expressLayout=require('express-ejs-layouts');

const mongoose=require('mongoose');

const session=require('express-session')

const flash =require('express-flash')

const MongoDbStore=require('connect-mongo')


//require('events').EventEmitter.defaultMaxListeners = 15;
//DATA BASE CONNECTIOn
const url='mongodb://localhost/pizza';  //connection url
//process.env.MONGO_CONNECTION_URL
mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected...');
}).on('error',err => {
    console.log('Connection failed...')
});

//session store

//session config
// act as middleware
//process.env.COOKIE_SECRET
app.use(session({
    secret: 'passwaard' ,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl:'mongodb://localhost/pizza'
    }),
    saveUninitialized: false,
    cookie: {   maxAge:1000 * 60 * 60* 24}//24 hr  maxAge:1000* 60 * 60* 24
}))

app.use(flash());

//Assets
app.use(express.static('public'))
app.use(express.json())

//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})

// set Template engine
app.use( expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))   //this will tell express where we have kept views file 
app.set('view engine','ejs');

require('./routes/web')(app)   //function calling initroutes and passing instance of express

const PORT=process.env.PORT||4040;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})