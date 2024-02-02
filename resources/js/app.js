import axios from 'axios'
import notie from 'notie'
import { initAdmin } from './admin'
import moment from 'moment'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter');
// let removeitem= document.querySelectorAll('.deleteCartButton')

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
    },1500)
}

