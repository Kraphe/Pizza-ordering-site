const express=require('express');

const app=express();

const ejs=require('ejs');

const path= require('path');   // this module genrate path  this is inbuild module no need to install

const expressLayout=require('express-ejs-layouts');


const PORT=process.env.PORT||3000;

app.use(express.static('public'));


// set Template engine
app.use( expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))   //this will tell express where we have kept views file 
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('home');  //ejs file name you wont to render on web  page 
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart');
})

app.get('/register',(req,res)=>{
    res.render('auth/register');
})

app.get('/login',(req,res)=>{
    res.render('auth/login');
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})