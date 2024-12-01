document.addEventListener('DOMContentLoaded', function () {
    const latestProductList = document.querySelector('.latest-product-list');

   //  LocalStorage에서 데이터 가져오기
    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.reverse().forEach((product, index) => {
        const latestProductItem = document.createElement('div');
        latestProductItem.classList.add('product-item');

        latestProductItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <p>${product.name}</p>
                <p>${product.price}원</p>
            </div>
        `;

        latestProductList.appendChild(latestProductItem);
    });

    products.forEach((product, index) => {
        const img = document.getElementById(`latest-product-${index}`);
        if (img) {
            img.addEventListener('click', function () {
                alert(`${product.name} 상품 페이지로 이동!`);
               // url 추후에 추가 ..!
            });
        }
    });


const searchForm = document.getElementById('form');
const searchInput = searchForm.querySelector('input[type="search"]');

// 검색 필터 업데이트 함수
function updateProductList(keyword) {
    const productItems = document.querySelectorAll('.product-item'); 
    const top3Title = document.querySelector('h2:nth-of-type(1)'); 
    const latestTitle = document.querySelector('h2:nth-of-type(2)'); 
    const top3subTitle = document.querySelector('h3:nth-of-type(1)'); 
    const latestSubTitle = document.querySelector('h3:nth-of-type(2)'); 

    let top3Visible = false; 
    let latestVisible = false; 

    productItems.forEach(item => {
        const productName = item.querySelector('.product-info p').textContent;
        if (!keyword || productName.includes(keyword)) {
            item.style.display = 'flex'; 
            if (item.closest('.product-list')) {
                top3Visible = true; 
            }
            if (item.closest('.latest-product-list')) {
                latestVisible = true; 
            }
        } else {
            item.style.display = 'none'; 
        }
    });

    top3Title.style.display = top3Visible ? 'block' : 'none';
    latestTitle.style.display = latestVisible ? 'block' : 'none';
    top3subTitle.style.display = top3Visible ? 'block' : 'none';
    latestSubTitle.style.display = latestVisible ? 'block' : 'none';
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    const keyword = searchInput.value.trim();
    updateProductList(keyword); 
});

searchInput.addEventListener('input', function () {
    const keyword = searchInput.value.trim();
    updateProductList(keyword);
});
});