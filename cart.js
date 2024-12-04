document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-message');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        // 장바구니가 비어 있을 때
        emptyMessage.style.display = 'block';
        cartItemsContainer.style.display = 'none';
    } else {
        // 장바구니에 상품이 있을 때
        emptyMessage.style.display = 'none';
        cartItemsContainer.style.display = 'block';

        cart.forEach(item => {
            console.log(item.image); 
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="item-name">${item.name}</p>
                    <p class="item-weight">${item.weight}</p>
                    <p class="item-price">${item.price}</p>
                </div>
            `;
            cartItemsContainer.prepend(itemDiv);

        });
    }
});

function goBack() {
    window.history.back();
}

function goHome() {
    window.location.href = "/FMpick/home.html";
}
