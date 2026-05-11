document.addEventListener("DOMContentLoaded", function () {

    const cartItemsContainer = document.getElementById("cartItems");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    displayCart();

    function displayCart() {

        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <p>Your cart is empty</p>
            `;
            return;
        }

        let overallTotal = 0;

        cart.forEach((item, index) => {

            if (!item.quantity) {
                item.quantity = 1;
            }

            let itemTotal = item.total * item.quantity;

            overallTotal += itemTotal;

            cartItemsContainer.innerHTML += `

                <div class="cart-item">

                    <img src="${item.image || 'Abaya1.png'}" class="cart-img">

                    <div class="cart-info">

                        <h3>${item.name}</h3>

                        <p>Size: ${item.size}</p>

                        <p>Color: ${item.color}</p>

                        <p>Fabric: ${item.fabric}</p>

                        <p>Price: ${item.total} SAR</p>

                        <!-- QUANTITY BUTTONS -->
                        <div class="quantity-controls">

                            <button onclick="decreaseQuantity(${index})">
                                -
                            </button>

                            <span>${item.quantity}</span>

                            <button onclick="increaseQuantity(${index})">
                                +
                            </button>

                        </div>

                        <p class="item-total">
                            Item Total: ${itemTotal} SAR
                        </p>

                        <button onclick="removeItem(${index})" class="remove-btn">
                            Remove
                        </button>

                    </div>

                </div>

            `;
        });

        cartItemsContainer.innerHTML += `

            <div class="cart-total">

                Total Cart Price: ${overallTotal} SAR

            </div>

        `;

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.increaseQuantity = function(index) {

        cart[index].quantity++;

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    };

    window.decreaseQuantity = function(index) {

        if (cart[index].quantity > 1) {

            cart[index].quantity--;

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    };

    window.removeItem = function(index) {

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    };

});

function goShopping() {

    window.location.href = "collection.html";

}