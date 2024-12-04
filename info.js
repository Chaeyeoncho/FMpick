document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileUpload');
    const previewImage = document.getElementById('previewImage');
    const defaultLabel = document.querySelector('label[for="fileUpload"]'); 
    const submitBtn = document.getElementById('submitBtn');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';

                if (defaultLabel) {
                    defaultLabel.style.display = 'none'; 
                }
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = './img/fmpick_white.svg';
            previewImage.style.display = 'block';
            if (defaultLabel) {
                defaultLabel.style.display = 'block';
            }
        }
    });

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const productName = document.querySelector('input[placeholder="상품명을 입력하세요"]').value.trim();
        const weight = document.querySelector('input[placeholder="상품 상태를 입력하세요"]').value.trim();
        const description = document.querySelector('textarea[placeholder="상품 설명을 입력하세요"]').value.trim();
        const price = document.querySelector('input[placeholder="가격을 입력하세요"]').value.trim();

        const image = (previewImage.src && previewImage.src !== location.href) 
            ? previewImage.src 
            : previewImage.src = '/FMpick/img/fmpick_white.svg';


        if (!productName || !weight || !description || !price) {
            alert("모든 항목을 입력해주세요!");
            return; 
        }

        const productData = {
            id: Date.now().toString(),
            name: productName,
            weight,
            description,
            price,
            image,
        };

        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        existingProducts.push(productData);

        // LocalStorage에 저장
        localStorage.setItem('products', JSON.stringify(existingProducts));

        alert('상품이 성공적으로 등록되었습니다!');
        window.location.href = "home.html";
    });
});

function goBack() {
    window.history.back();
}

function goHome() {
    window.location.href = "/FMpick/home.html";
}
