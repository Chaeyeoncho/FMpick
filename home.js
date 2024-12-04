document.addEventListener('DOMContentLoaded', function () {
    const latestProductList = document.querySelector('.latest-product-list');
    const top3Section = document.querySelector('.product-list');
    const seasonalSection = document.querySelector('.seasonal-product-list');
    const top3Title = document.querySelector('h2:nth-of-type(2)');
    const latestTitle = document.querySelector('h2:nth-of-type(3)');
    const top3SubTitle = document.querySelector('h3:nth-of-type(2)');
    const latestSubTitle = document.querySelector('h3:nth-of-type(3)');
    const weatherTitle = document.querySelector('.weather');
    const weatherSubTitle = document.querySelector('.weather + h3');
    const weatherRecommendation = document.querySelector('.weather-recommendation');

    // LocalStorage에서 데이터 가져오기
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // 최신순 상품 표시
    products.reverse().forEach((product) => {
        const latestProductItem = document.createElement('a');
        latestProductItem.href = `./product/product.html?id=${product.id}`;
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

    function updateProductList(keyword) {
        const productItems = document.querySelectorAll('.product-item'); 
        const sections = [top3Section, latestProductList, seasonalSection]; 
        const titles = [top3Title, latestTitle, weatherTitle, top3SubTitle, latestSubTitle, weatherSubTitle, weatherRecommendation];

        let hasMatchingProduct = false;

        if (keyword) {
            sections.forEach((section) => {
                let hasMatchInSection = false;

                section.querySelectorAll('.product-item').forEach((item) => {
                    const productName = item.querySelector('.product-info p').textContent;

                    if (productName.includes(keyword)) {
                        item.style.display = 'flex';
                        hasMatchInSection = true;
                        hasMatchingProduct = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (hasMatchInSection) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            titles.forEach((title) => (title.style.display = 'none'));

            if (!hasMatchingProduct) {
                console.log("해당 키워드와 일치하는 상품이 없습니다.");
            }
        } else {
            sections.forEach((section) => {
                section.querySelectorAll('.product-item').forEach((item) => {
                    item.style.display = 'flex';
                });
                section.style.display = 'block';
            });

            titles.forEach((title) => (title.style.display = 'block'));
        }
    }

    const searchForm = document.getElementById('form');
    const searchInput = searchForm.querySelector('input[type="search"]');

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
