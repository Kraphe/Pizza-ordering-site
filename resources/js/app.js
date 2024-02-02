import axios from 'axios'
import notie from 'notie'
import { initAdmin } from './admin'
import moment from 'moment'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter');
<<<<<<< HEAD
// let removeitem= document.querySelectorAll('.deleteCartButton')
=======
let removeitem= document.querySelectorAll('.deleteCartButton')
>>>>>>> 32e9d05afadfff919e1d2703157a172973313ac6

//adding pizza to our cart 
function updateCart(pizza) {
    
    axios.post('/update-cart', pizza).then(res => {
       cartCounter.innerText=res.data.totalQty;
        notie.alert({
        type:'success',
        text: 'Item added to cart',
        time: 1
       }).show();
    })
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})

const alertMsg = document.querySelector('#success-alert')
 if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}

