document.addEventListener('DOMContentLoaded', () => {
    const cartBody = document.getElementById('checkout-cart-body');
    const totalPriceEl = document.getElementById('checkout-total-price');

    // Retrieve the cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || "$0.00";

    // Populate the cart items in the table
    if (cart.length > 0) {
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="images/${item.name.replace(/\s+/g, '')}.jpg" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartBody.appendChild(row);
        });
    } else {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="4">Your cart is empty!</td>`;
        cartBody.appendChild(emptyRow);
    }

    // Display the total price
    totalPriceEl.textContent = totalPrice;


    //payment methods
    document.getElementById("billing-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Form submitted successfully!");
      });
      
//Cart Method
document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Payment processed successfully!");
  });
  
  document.getElementById("back-button").addEventListener("click", function () {
    alert("Returning to the previous step.");
  });
  



//More Info
document.getElementById("payment-delivery-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked')?.value;
    const comments = document.querySelector('textarea[name="additional-comments"]').value;
  
    // Display the collected data (you can replace this with an API call)
    alert(`Payment Method: ${paymentMethod}\nDelivery Method: ${deliveryMethod}\nComments: ${comments}`);
  });
  

});

