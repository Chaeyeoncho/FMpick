function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`; 
}


async function fetchWeather() {
    const apiKey = "6If6KftJqxCrVs%2FIrAavelYdOpJ9f6QYJ%2BnKWsmf8hof72rINbR%2Fs5qyuLNoM2%2FSZkdy%2FgzuoyO1z3v1nBftEg%3D%3D";
    const baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

    const baseDate = getTodayDate(); 
    const baseTime = "0500"; 
    const nx = 60; 
    const ny = 127; 

    const url = `${baseUrl}?serviceKey=${apiKey}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    console.log("Request URL:", url); 

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error("HTTP Error:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();

        const weatherData = data.response.body.items.item;
        const maxTemp = weatherData.find(item => item.category === "TMX")?.fcstValue || "정보 없음";
        const minTemp = weatherData.find(item => item.category === "TMN")?.fcstValue || "정보 없음";

        return { maxTemp, minTemp };
    } catch (error) {
        console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
        return { maxTemp: "오류", minTemp: "오류" };
    }
}

function getSeasonalRecommendation(season) {
    const seasonalProducts = {
        spring: ["딸기", "아스파라거스", "쑥갓"],
        summer: ["수박", "옥수수", "가지"],
        autumn: ["감", "밤", "배"],
        winter: ["배추", "무", "귤"]
    };
    return seasonalProducts[season];
}

function getSeason() {
    const month = new Date().getMonth() + 1; 
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
}

async function updateWeatherRecommendation() {
    const weather = await fetchWeather(); 
    const season = getSeason(); 
    const seasonalProducts = getSeasonalRecommendation(season); 

    const recommendationElement = document.querySelector('.weather-recommendation');
    recommendationElement.innerHTML = `
        오늘 날씨는 최고온도 ${weather.maxTemp}°C, 최저온도 ${weather.minTemp}°C 입니다.<br>
        이런 날엔 <strong>${seasonalProducts[0]}</strong> 어떠세요?
    `;

    displaySeasonalProducts(season); 
}


function displaySeasonalProducts(season) {
    const seasonalList = document.querySelector('.seasonal-product-list');
    seasonalList.innerHTML = ""; 

    const seasonalProducts = {
        spring: [
            { name: "딸기", image: "./Img/strawberry.png" },
            { name: "아스파라거스", image: "./Img/asparagus.jpg" },
            { name: "쑥갓", image: "./Img/ssukgat.jpg" }
        ],
        summer: [
            { name: "수박", image: "./Img/watermelon.jpg" },
            { name: "옥수수", image: "./Img/corn.jpg" },
            { name: "가지", image: "./Img/gazi.jpg" }
        ],
        autumn: [
            { name: "감", image: "./Img/gam.svg" },
            { name: "밤", image: "./Img/bam.png" },
            { name: "배", image: "./Img/pear.png" }
        ],
        winter: [
            { name: "배추", image: "./Img/cabbage.jpg" },
            { name: "무", image: "./Img/radish.jpg" },
            { name: "귤", image: "./Img/gule.jpg" }
        ]
    };

    const products = seasonalProducts[season];
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <p>${product.name}</p>
            </div>
        `;
        seasonalList.appendChild(productItem);
    });
}


document.addEventListener('DOMContentLoaded', updateWeatherRecommendation);
