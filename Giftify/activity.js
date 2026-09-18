let cart = [];

function addtocart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name , price , qty: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index)=>{
        total += item.price * item.qty;

        let li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                ${item.qty}
                <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${index})">X</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    totalEl.innerText = `Total: Rs. ${total}`;
}

function changeQty(index, value) {
    cart[index].qty += value;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);

}

updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

document.querySelectorAll(".add-button").forEach(button => {
    button.addEventListener("click", () => {
        addtocart(button.dataset.product, Number(button.dataset.price));
    });
});