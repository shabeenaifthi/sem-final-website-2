document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartBody = document.getElementById('cart-body');
    const totalPriceEl = document.getElementById('total-price');
    const cartCountEl = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout');


    // local storage and applying the favourite
    const saveFavouriteBtn = document.getElementById("save-favourite");
    const applyFavouriteBtn = document.getElementById("apply-favourite");
    const cartContent = document.querySelector(".cart-content");
    const cartItems = [];

// Function to save current cart as a favourite
saveFavouriteBtn.addEventListener("click", () => {
    const cartData = [];
    document.querySelectorAll(".cart-box").forEach((cartBox) => {
        const productTitle = cartBox.querySelector(".cart-product-title").textContent;
        const productPrice = parseFloat(cartBox.querySelector(".cart-price").textContent.replace('$', ''));
        const quantity = parseInt(cartBox.querySelector(".cart-quantity").value);
        cartData.push({ title: productTitle, price: productPrice, quantity });
    });

    if (cartData.length > 0) {
        localStorage.setItem("favouriteOrder", JSON.stringify(cartData));
        alert("Favourite order saved successfully!");
    } else {
        alert("Cart is empty. Add items to save as favourite.");
    }
});

// Function to apply the saved favourite
applyFavouriteBtn.addEventListener("click", () => {
    const favouriteOrder = JSON.parse(localStorage.getItem("favouriteOrder"));

    if (favouriteOrder && favouriteOrder.length > 0) {
        // Clear existing cart content
        cartContent.innerHTML = "";

        // Populate cart with saved favourite items
        favouriteOrder.forEach((item) => {
            const cartBox = document.createElement("div");
            cartBox.classList.add("cart-box");

            cartBox.innerHTML = `
                <img src="images/${item.title.replace(/\s+/g, '')}.jpg" alt="${item.title}" class="cart-img" width="90px" height="90px">
                <div class="detail-box">
                    <div class="cart-product-title">${item.title}</div>
                    <div class="cart-price">$${item.price.toFixed(2)}</div>
                    <input type="number" class="cart-quantity" value="${item.quantity}" min="1">
                </div>
                <i class='bx bx-trash-alt cart-remove'></i>
            `;

            cartContent.appendChild(cartBox);
        });

        alert("Favourite order applied!");
    } else {
        alert("No favourite order found. Save an order first.");
    }
});









    // Cart Open/Close Functionality
    const cartIcon = document.querySelector('#cart-icon');
    const cartModal = document.querySelector('.cart');
    const closeCart = document.querySelector('#close-cart');

    cartIcon.onclick = () => cartModal.classList.add('active');
    closeCart.onclick = () => cartModal.classList.remove('active');

    // Open Cart
    cartIcon.onclick = () => {
        cartModal.classList.add('active');
    };

    // Close Cart
    closeCart.onclick = () => {
        cartModal.classList.remove('active');
    };









    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemContainer = e.target.closest('.medicine-item');
            const quantityInput = itemContainer.querySelector('input[type="number"]');
            const quantity = parseInt(quantityInput.value);

            if (quantity > 0) {
                const itemName = quantityInput.dataset.name;
                const itemPrice = parseFloat(quantityInput.dataset.price);
                addToCart(itemName, quantity, itemPrice);
                updateCart();
            } else {
                alert("Please enter a valid quantity.");
            }
        });
    });

    function addToCart(name, quantity, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, quantity, price });
        }
    }

    function updateCart() {
        cartBody.innerHTML = '';
        let totalPrice = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartBody.innerHTML = '<tr><td colspan="4">Your cart is empty!</td></tr>';
            totalPriceEl.textContent = '$0.00';
            cartCountEl.textContent = '0';
            return;
        }


         cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <input type="number" value="${item.quantity}" class="cart-quantity" data-name="${item.name}" />
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-item">Remove</button></td>
            `;
            cartBody.appendChild(row);

            totalPrice += item.price * item.quantity;
            totalItems += item.quantity;

            row.querySelector('.remove-item').addEventListener('click', () => {
                removeFromCart(item.name);
                updateCart();
            });
        });

        totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
        cartCountEl.textContent = totalItems;
    }



    cartBody.addEventListener('input', (event) => {
        if (event.target.classList.contains('cart-quantity')) {
            const input = event.target;
            const quantity = parseInt(input.value);
            if (!isNaN(quantity) && quantity > 0) {
                const itemName = input.dataset.name;
                const item = cart.find(item => item.name === itemName);
                if (item) {
                    item.quantity = quantity;
                    updateCart();
                }
            }
        }
    });


    function removeFromCart(name) {
        const index = cart.findIndex(item => item.name === name);
        if (index !== -1) cart.splice(index, 1);
    }


    // Checkout Button Logic
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

    //Store the cart and total price in LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPriceEl.textContent);
    
    //Redirect to checkout page
        window.location.href = './checkOut.html';
    });



    
//Making add to cart


    //Cart Working JS
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    }else {
        ready();
    }

    //Making Function
    function ready() {
        //Remove Item From Cart
        var removeCartButton = document.getElementsByClassName('cart-remove');
        for (var i = 0; i< removeCartButton.length; i++) {
            var button = removeCartButton[i];
            button.addEventListener("click", removeCartItem);
        }
        //Quantity Change
        var quantityInputs = document.getElementsByClassName("cart-quantity");
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener("change", quantityChanged);
        }
    }


    //Remove Cart Item
    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
    }

    //Quantity Change
    function quantityChanged(event){
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0){
            input.value = 1;
        }
    }

//If price contain some cents
total = Math.round(total * 100) / 100;
document.getElementsByClassName("total-price")[0].innerText = "$" + total;

//save total to localStorage
localStorage.setItem('cartTotal', total);


//Keep Item in cart when page refresh with Localstorage
function saveCartItems () {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBox = document.getElementsByClassName('cart-box');
    var cartItems = [];

    for(var i=0; i< cartBox.length; i++) {
        cartBox = cartBox[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cart.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0];

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}































  //JSON FILE
  fetch('webpage.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(medicine => {
            // Dynamically create DOM elements for medicines
            console.log(`${medicine.name}: $${medicine.price}`);
        });
    });

    fetch('/api/saveCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    });
        
});