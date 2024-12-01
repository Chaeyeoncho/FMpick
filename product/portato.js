// Description: Product page for portato
        function goBack() {
            window.history.back();
        }

        function goHome() {
            window.location.href = "/index.html";
        }

        function addToCart() {
            alert("장바구니에 추가되었습니다!");
        }

        function buyNow() {
            const productInfo = {
              name: "감자", 
              price: "6,000원", 
              weight: "3kg", 
            };
        
            localStorage.setItem("selectedProduct", JSON.stringify(productInfo));
        
            window.location.href = "../pay.html";
          }
