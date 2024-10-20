
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];



iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;  // total price variable for subtotal

    // add new data
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;

            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                <img src="${info.image}">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">$${(info.price * item.quantity).toFixed(2)}</div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${item.quantity}</span>
                <span class="plus">></span>
            </div>
            `;

            totalPrice += info.price * item.quantity;  // Add item price to total
        });
    }

    iconCartSpan.innerText = totalQuantity;

    // Update the subtotal in the cart tab
    updateSubtotal(totalPrice);
}

const updateSubtotal = (totalPrice) => {
    let subtotalElement = document.getElementById('subtotal-amount');
    subtotalElement.innerText = `$${totalPrice.toFixed(2)}`;  // Display the total price as subtotal
}

//let openPaymentsProcessor;
const checkOut = () => {
    let subtotalElement = document.getElementById('subtotal-amount');
    let subtotal = parseFloat(subtotalElement.innerText.replace('$', ''));

    if (subtotal > 0) {
        window.location.href = `payment.html?amount=${subtotal}`;
    } else {
        alert('Your cart is empty. Please add items before checking out.');
    }
};

document.querySelector('.checkOut').addEventListener('click', checkOut);

// Call this function after updating the cart
addCartToHTML();


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

function showLogin() {
    document.getElementById('login-modal').style.display = 'block';
}

function showRegister() {
    document.getElementById('register-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();











































































// Import the OpenPaymentsProcessor
// import OpenPaymentsProcessor from './index.js';

// let listProductHTML = document.querySelector('.listProduct');
// let listCartHTML = document.querySelector('.listCart');
// let iconCart = document.querySelector('.icon-cart');
// let iconCartSpan = document.querySelector('.icon-cart span');
// let body = document.querySelector('body');
// let closeCart = document.querySelector('.close');
// let products = [];
// let cart = [];

// // Initialize OpenPaymentsProcessor
// const openPaymentsProcessor = new OpenPaymentsProcessor(
//   'https://merchant-wallet-url.com',
//   'your-private-key',
//   'your-key-id'
// );

// iconCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })

// closeCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })

// listProductHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('addCart')){
//         let id_product = positionClick.parentElement.dataset.id;
//         addToCart(id_product);
//     }
// })

// const addToCart = (product_id) => {
//     let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(cart.length <= 0){
//         cart = [{
//             product_id: product_id,
//             quantity: 1
//         }];
//     }else if(positionThisProductInCart < 0){
//         cart.push({
//             product_id: product_id,
//             quantity: 1
//         });
//     }else{
//         cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
//     }
//     addCartToHTML();
//     addCartToMemory();
// }

// const addCartToMemory = () => {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// const addCartToHTML = () => {
//     listCartHTML.innerHTML = '';
//     let totalQuantity = 0;
//     let totalPrice = 0;

//     if (cart.length > 0) {
//         cart.forEach(item => {
//             totalQuantity += item.quantity;

//             let newItem = document.createElement('div');
//             newItem.classList.add('item');
//             newItem.dataset.id = item.product_id;

//             let positionProduct = products.findIndex((value) => value.id == item.product_id);
//             let info = products[positionProduct];
            
//             listCartHTML.appendChild(newItem);
//             newItem.innerHTML = `
//             <div class="image">
//                 <img src="${info.image}">
//             </div>
//             <div class="name">
//                 ${info.name}
//             </div>
//             <div class="totalPrice">$${(info.price * item.quantity).toFixed(2)}</div>
//             <div class="quantity">
//                 <span class="minus"><</span>
//                 <span>${item.quantity}</span>
//                 <span class="plus">></span>
//             </div>
//             `;

//             totalPrice += info.price * item.quantity;
//         });
//     }

//     iconCartSpan.innerText = totalQuantity;
//     updateSubtotal(totalPrice);
// }

// const updateSubtotal = (totalPrice) => {
//     let subtotalElement = document.getElementById('subtotal-amount');
//     subtotalElement.innerText = `$${totalPrice.toFixed(2)}`;
// }

// listCartHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
//         let product_id = positionClick.parentElement.parentElement.dataset.id;
//         let type = 'minus';
//         if(positionClick.classList.contains('plus')){
//             type = 'plus';
//         }
//         changeQuantityCart(product_id, type);
//     }
// })

// const changeQuantityCart = (product_id, type) => {
//     let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(positionItemInCart >= 0){
//         switch (type) {
//             case 'plus':
//                 cart[positionItemInCart].quantity += 1;
//                 break;
//             default:
//                 let changeQuantity = cart[positionItemInCart].quantity - 1;
//                 if (changeQuantity > 0) {
//                     cart[positionItemInCart].quantity = changeQuantity;
//                 }else{
//                     cart.splice(positionItemInCart, 1);
//                 }
//                 break;
//         }
//     }
//     addCartToHTML();
//     addCartToMemory();
// }

// function showLogin() {
//     document.getElementById('login-modal').style.display = 'block';
// }

// function showRegister() {
//     document.getElementById('register-modal').style.display = 'block';
// }

// function closeModal(modalId) {
//     document.getElementById(modalId).style.display = 'none';
// }

// // Add checkout button to the cart
// const addCheckoutButton = () => {
//   let checkoutButton = document.createElement('button');
//   checkoutButton.innerText = 'Checkout';
//   checkoutButton.classList.add('checkout-button');
//   listCartHTML.appendChild(checkoutButton);

//   checkoutButton.addEventListener('click', handleCheckout);
// };

// const handleCheckout = async () => {
//   try {
//     // Calculate total amount
//     let totalAmount = cart.reduce((total, item) => {
//       let product = products.find(p => p.id == item.product_id);
//       return total + (product.price * item.quantity);
//     }, 0);

//     // Assuming the buyer's wallet URL is stored in localStorage after login
//     let buyerWalletUrl = localStorage.getItem('buyerWalletUrl');
//     if (!buyerWalletUrl) {
//       alert('Please log in to complete the checkout.');
//       return;
//     }

//     // Process payment
//     let paymentResult = await openPaymentsProcessor.processPayment(buyerWalletUrl, totalAmount);

//     // Redirect the user to complete the payment
//     window.location.href = paymentResult.redirectUrl;

//     // Store necessary information for payment finalization
//     localStorage.setItem('paymentContinueUrl', paymentResult.continueUrl);
//     localStorage.setItem('paymentContinueToken', paymentResult.continueToken);
//     localStorage.setItem('paymentQuoteId', paymentResult.quoteId);

//   } catch (error) {
//     console.error('Checkout failed:', error);
//     alert('Checkout failed. Please try again.');
//   }
// };

// // Function to finalize payment after user returns from redirect
// const finalizePayment = async () => {
//   const continueUrl = localStorage.getItem('paymentContinueUrl');
//   const continueToken = localStorage.getItem('paymentContinueToken');
//   const quoteId = localStorage.getItem('paymentQuoteId');
//   const buyerWalletUrl = localStorage.getItem('buyerWalletUrl');

//   if (continueUrl && continueToken && quoteId && buyerWalletUrl) {
//     try {
//       const result = await openPaymentsProcessor.finalizePayment(
//         continueUrl,
//         continueToken,
//         quoteId,
//         buyerWalletUrl
//       );

//       console.log('Payment finalized:', result);
//       alert('Payment successful!');

//       // Clear cart and update UI
//       cart = [];
//       addCartToMemory();
//       addCartToHTML();

//       // Clear stored payment data
//       localStorage.removeItem('paymentContinueUrl');
//       localStorage.removeItem('paymentContinueToken');
//       localStorage.removeItem('paymentQuoteId');
//     } catch (error) {
//       console.error('Payment finalization failed:', error);
//       alert('Payment finalization failed. Please contact support.');
//     }
//   }
// };


// const addDataToHTML = () => {
//     // Clear existing content
//     listProductHTML.innerHTML = '';
    
//     if(products.length > 0) {
//         products.forEach(product => {
//             let newProduct = document.createElement('div');
//             newProduct.classList.add('item');
//             newProduct.dataset.id = product.id;
//             newProduct.innerHTML = `
//                 <img src="${product.image}" alt="${product.name}">
//                 <h2>${product.name}</h2>
//                 <div class="price">$${product.price.toFixed(2)}</div>
//                 <button class="addCart">Add To Cart</button>
//             `;
//             listProductHTML.appendChild(newProduct);
//         });
//     }
// }
// const initApp = () => {
//     // Get data product
//     fetch('products.json')
//     .then(response => response.json())
//     .then(data => {
//         products = data;
//         addDataToHTML();

//         // get data cart from memory
//         if(localStorage.getItem('cart')){
//             cart = JSON.parse(localStorage.getItem('cart'));
//             addCartToHTML();
//         }

//         addCheckoutButton();
//         finalizePayment(); // Check if there's a payment to finalize
//     })
//     .catch(error => {
//         console.error('Error loading products:', error);
//     });
// }

// initApp();