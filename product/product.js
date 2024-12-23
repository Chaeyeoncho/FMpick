document.addEventListener('DOMContentLoaded', function () {
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const vars = queryString.split('&');
        vars.forEach(function (v) {
            const pair = v.split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        });
        return params;
    }

    const params = getQueryParams();
    const productId = params['id'];

    // LocalStorage에서 최신 등록 상품 데이터 가져오기
    const localProducts = JSON.parse(localStorage.getItem('products')) || [];

    // 계절 추천 상품 데이터
    const seasonalProducts = {
        spring: [
            { id: "101", name: "딸기", image: "../Img/strawberry.png", description: "신선한 딸기입니다.", weight: "1kg", price: "5,000원" },
            { id: "102", name: "아스파라거스", image: "../Img/asparagus.png", description: "아삭한 아스파라거스입니다.", weight: "500g", price: "7,000원" },
            { id: "103", name: "쑥갓", image: "../Img/ssukgat.jpg", description: "향긋한 쑥갓입니다.", weight: "1kg", price: "3,500원" }
        ],
        summer: [
            { id: "104", name: "수박", image: "./Img/watermelon.png", description: "달콤하고 시원한 수박입니다.", weight: "5kg", price: "12,000원" },
            { id: "105", name: "옥수수", image: "./Img/corn.png", description: "고소한 맛이 일품인 옥수수입니다.", weight: "2kg", price: "4,000원" },
            { id: "106", name: "가지", image: "./Img/gazi.png", description: "신선한 가지입니다.", weight: "1kg", price: "3,000원" }
        ],
        autumn: [
            { id: "107", name: "감", image: "./Img/gam.svg", description: "달콤한 가을의 맛 감입니다.", weight: "5kg", price: "5,500원" },
            { id: "108", name: "밤", image: "./Img/bam.png", description: "고소한 맛이 가득한 밤입니다.", weight: "1kg", price: "6,000원" },
            { id: "109", name: "배", image: "./Img/pear.png", description: "달콤하고 아삭한 배입니다.", weight: "3kg", price: "4,500원" }
        ],
        winter: [
            { id: "110", name: "배추", image: "../Img/cabbage.png", description: "신선하고 아삭한 배추입니다.", weight: "10kg", price: "10,000원" },
            { id: "111", name: "무", image: "../Img/radish.png", description: "아삭하고 시원한 맛의 무입니다.", weight: "5kg", price: "2,500원" },
            { id: "112", name: "귤", image: "../Img/gule.png", description: "새콤달콤한 귤입니다.", weight: "3kg", price: "8,000원" }
        ]
    };
    

    const seasonalProductList = [].concat(...Object.values(seasonalProducts));

    // 인기 상품 데이터
    const popularProducts = [
        { id: '1', name: '감자', image: '../Img/portato.svg', description: '강원도에서 재배한 신선한 감자', weight: '4kg', price: '10,900원' },
        { id: '2', name: '고추', image: '../Img/pepper.svg', description: '매운 고추입니다.', weight: '2kg', price: '8,500원' },
        { id: '3', name: '감', image: '../Img/gam.svg', description: '달콤한 감입니다.', weight: '5kg', price: '12,000원' }
    ];

    const products = [...localProducts, ...seasonalProductList, ...popularProducts];

    const product = products.find(p => p.id === productId);

    if (product) {
        // 상품 정보를 DOM에 삽입
        document.querySelector('.product img').src = product.image;
        document.querySelector('.product img').alt = product.name;
        document.querySelector('.product-info span').textContent = product.name;
        document.querySelector('.product-info p:nth-of-type(1)').textContent = product.description;
        document.querySelector('.product-info p:nth-of-type(2)').textContent = product.weight || '';
        document.querySelector('.product-info p:nth-of-type(3)').textContent = product.price;
    } else {
        alert('상품 정보를 찾을 수 없습니다.');
        window.location.href = 'home.html'; 
    }
});

function addToCart() {
    const productName = document.querySelector('.product-info span').textContent;
    const productPrice = document.querySelector('.product-info p:nth-of-type(3)').textContent;
    const productWeight = document.querySelector('.product-info p:nth-of-type(2)').textContent;
    const prodductImage = document.querySelector('.product img').src;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        name: productName,
        price: productPrice,
        weight: productWeight,
        image: prodductImage
    });
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("장바구니에 추가되었습니다!");
    window.location.href = "../cart.html"; 
}

function goBack() {
    window.history.back();
}

function goHome() {
    window.location.href = "/FMpick/home.html";
}


function buyNow() {
    const productName = document.querySelector('.product-info span').textContent;
    const productPrice = document.querySelector('.product-info p:nth-of-type(3)').textContent;
    const productWeight = document.querySelector('.product-info p:nth-of-type(2)').textContent;
    const productImage = document.querySelector('.product img').src;

    const productInfo = {
        name: productName,
        price: productPrice,
        weight: productWeight,
        image: productImage
    };

    localStorage.setItem('selectedProduct', JSON.stringify(productInfo));

    window.location.href = "../pay.html";
}
