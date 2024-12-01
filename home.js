document.addEventListener('DOMContentLoaded', function () {
    const latestProductList = document.querySelector('.latest-product-list');

    // LocalStorage에서 데이터 가져오기
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

    function updateProductList(keyword) {
        const productItems = document.querySelectorAll('.product-item'); 
        const top3Section = document.querySelector('.product-list'); 
        const latestSection = document.querySelector('.latest-product-list'); 
        const top3Title = document.querySelector('h2:nth-of-type(2)'); 
        const latestTitle = document.querySelector('h2:nth-of-type(3)'); 
        const top3SubTitle = document.querySelector('h3:nth-of-type(2)'); 
        const latestSubTitle = document.querySelector('h3:nth-of-type(3)'); 
        const weatherTitle = document.querySelector('.weather'); 
        const weatherSubTitle = document.querySelector('.weather + h3'); 
        const weatherRecommendation = document.querySelector('.weather-recommendation'); 
    
        let hasMatchingProduct = false; 
    

        if (keyword) {
            productItems.forEach(item => {
                const productName = item.querySelector('.product-info p').textContent;
    
                if (productName.includes(keyword)) {
                    item.style.display = 'flex';
                    hasMatchingProduct = true;
                } else {
                    item.style.display = 'none';
                }
            });
  
            top3Section.style.display = 'none';
            latestSection.style.display = 'none';
            top3Title.style.display = 'none';
            latestTitle.style.display = 'none';
            top3SubTitle.style.display = 'none';
            latestSubTitle.style.display = 'none';
            weatherTitle.style.display = 'none';
            weatherSubTitle.style.display = 'none';
            weatherRecommendation.style.display = 'none';
 
            if (!hasMatchingProduct) {
                console.log("해당 키워드와 일치하는 상품이 없습니다.");
            }
        } else {
            productItems.forEach(item => {
                item.style.display = 'flex';
            });
    
            top3Section.style.display = 'block';
            latestSection.style.display = 'block';
            top3Title.style.display = 'block';
            latestTitle.style.display = 'block';
            top3SubTitle.style.display = 'block';
            latestSubTitle.style.display = 'block';
            weatherTitle.style.display = 'block';
            weatherSubTitle.style.display = 'block';
            weatherRecommendation.style.display = 'block';
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
