document.addEventListener('DOMContentLoaded', function () {
    const productInfo = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productInfo) {
        document.getElementById('product-image').src = productInfo.image;
        document.getElementById('product-name').textContent = productInfo.name;
        document.getElementById('product-price').textContent = productInfo.price;
    } else {
        alert('상품 정보가 없습니다.');
        window.location.href = '/FMpick/home.html';
    }

    // 결제 버튼 클릭 시 결제 요청
    document.getElementById('payButton').addEventListener('click', function () {
        const clientKey = 'test_ck_ZLKGPx4M3MRM1XdaxPXEVBaWypv1'; 
        const tossPayments = TossPayments(clientKey);

        tossPayments.requestPayment('카드', {
            amount: parseInt(productInfo.price.replace(/[^0-9]/g, '')), // 금액에서 숫자만 추출
            orderId: generateOrderId(),
            orderName: productInfo.name,
            successUrl: window.location.origin + '/FMpick/success.html',
            failUrl: window.location.origin + '/FMpick/fail.html',
        });
    });

    function generateOrderId() {
        return 'ORDER-' + new Date().getTime();
    }
});
