
    const fileInput = document.getElementById('fileUpload');
    const previewImage = document.getElementById('previewImage');
    const submitBtn = document.getElementById('submitBtn');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        // 상품 정보 가져오기
        const productName = document.querySelector('input[placeholder="상품명을 입력하세요"]').value;
        const category = document.querySelector('input[placeholder="카테고리를 입력하세요"]').value;
        const condition = document.querySelector('input[placeholder="상품 상태를 입력하세요"]').value;
        const description = document.querySelector('textarea[placeholder="상품 설명을 입력하세요"]').value;
        const price = document.querySelector('input[placeholder="가격을 입력하세요"]').value;
        const image = previewImage.src;

        // 데이터 검증
        if (!productName || !category || !condition || !description || !price || !image) {
            alert("모든 항목을 입력해주세요!");
            return;
        }

        // LocalStorage에 저장할 데이터 생성
        const productData = {
            name: productName,
            category,
            condition,
            description,
            price,
            image,
        };

        // 기존 데이터 가져오기
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        existingProducts.push(productData);

        // LocalStorage에 저장
        localStorage.setItem('products', JSON.stringify(existingProducts));

        alert('상품이 성공적으로 등록되었습니다!');
        window.location.href = "home.html"; // 홈 페이지로 이동
    });