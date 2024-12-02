function getBaseDateTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let baseDate = new Date();
    let baseTime;

    if (currentMinute < 45) {
        baseDate.setHours(baseDate.getHours() - 1);
    }

    const hour = baseDate.getHours();

    if (hour >= 2 && hour < 5) {
        baseTime = "0200";
    } else if (hour >= 5 && hour < 8) {
        baseTime = "0500";
    } else if (hour >= 8 && hour < 11) {
        baseTime = "0800";
    } else if (hour >= 11 && hour < 14) {
        baseTime = "1100";
    } else if (hour >= 14 && hour < 17) {
        baseTime = "1400";
    } else if (hour >= 17 && hour < 20) {
        baseTime = "1700";
    } else if (hour >= 20 && hour < 23) {
        baseTime = "2000";
    } else {
        baseTime = "2300";
        if (hour < 2) {
            baseDate.setDate(baseDate.getDate() - 1);
        }
    }

    const year = baseDate.getFullYear();
    const month = String(baseDate.getMonth() + 1).padStart(2, '0');
    const day = String(baseDate.getDate()).padStart(2, '0');
    const baseDateString = `${year}${month}${day}`;

    return { baseDate: baseDateString, baseTime };
}

async function fetchWeather() {
    const apiKey = "TjqxIh8jPMQ%2F7UngJC%2BOhB9PGZ9C4EElQma50mmeH2M4%2B1ToAPl4jK35NLsH5Oyw2TGdmFHITBKh4TekeEiKkQ%3D%3D"; 
    const baseUrl = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

    const { baseDate, baseTime } = getBaseDateTime();
    const nx = 60;
    const ny = 127;

    const url = `${baseUrl}?serviceKey=${apiKey}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&numOfRows=1000&pageNo=1`;
    console.log("Request URL:", url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error("HTTP Error:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        console.log("API 응답 데이터:", data);

        if (data.response.header.resultCode !== "00") {
            console.warn("API 응답 에러:", data.response.header.resultMsg);
            return { maxTemp: "정보 없음", minTemp: "정보 없음" };
        }

        const weatherData = data.response.body.items.item;

        const maxTempItem = weatherData.find(item => item.category === "TMX");
        const minTempItem = weatherData.find(item => item.category === "TMN");

        const maxTemp = maxTempItem ? maxTempItem.fcstValue : "정보 없음";
        const minTemp = minTempItem ? minTempItem.fcstValue : "정보 없음";

        return { maxTemp, minTemp };
    } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        return { maxTemp: "오류", minTemp: "오류" };
    }
}


function getSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
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

function displaySeasonalProducts(season) {
    const seasonalList = document.querySelector('.seasonal-product-list');
    seasonalList.innerHTML = "";

    const seasonalProducts = {
        spring: [
            { id: "101", name: "딸기", image: "./Img/strawberry.png", price: "5,000원" },
            { id: "102", name: "아스파라거스", image: "./Img/asparagus.png", price: "7,000원" },
            { id: "103", name: "쑥갓", image: "./Img/ssukgat.jpg", price: "3,500원" }
        ],
        summer: [
            { id: "104", name: "수박", image: "./Img/watermelon.png", price: "12,000원" },
            { id: "105", name: "옥수수", image: "./Img/corn.png", price: "4,000원" },
            { id: "106", name: "가지", image: "./Img/gazi.png", price: "3,000원" }
        ],
        autumn: [
            { id: "107", name: "감", image: "./Img/gam.svg", price: "5,500원" },
            { id: "108", name: "밤", image: "./Img/bam.png", price: "6,000원" },
            { id: "109", name: "배", image: "./Img/pear.png", price: "4,500원" }
        ],
        winter: [
            { id: "110", name: "배추", image: "./Img/cabbage.png", price: "10,000원" },
            { id: "111", name: "무", image: "./Img/radish.png", price: "2,500원" },
            { id: "112", name: "귤", image: "./Img/gule.png", price: "8,000원" }
        ]
    };

    const products = seasonalProducts[season];
    products.forEach(product => {
        const productItem = document.createElement('a'); // a 태그 생성
        productItem.href = `./product/product.html?id=${product.id}`;; // 상품 ID를 포함한 링크 설정
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <p>${product.name}</p>
                <p class="product-price">${product.price}</p>
            </div>
        `;
        seasonalList.appendChild(productItem);
    });
}


async function updateWeatherRecommendation() {
    const recommendationElement = document.querySelector('.weather-recommendation');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (!loadingIndicator) {
        console.error("로딩 인디케이터를 찾을 수 없습니다.");
        return;
    }

    loadingIndicator.style.display = 'inline';
    recommendationElement.innerHTML = '';

    try {
        const weather = await fetchWeather();
        if (!weather || weather.maxTemp === "오류" || weather.minTemp === "오류") {
            throw new Error("날씨 데이터를 불러올 수 없습니다.");
        }

        const season = getSeason();
        const seasonalProducts = getSeasonalRecommendation(season);

        loadingIndicator.style.display = 'none';
        recommendationElement.innerHTML = `
            오늘 날씨는 최고온도 <span class="max-temp">${weather.maxTemp}°C</span>, 
            최저온도 <span class="min-temp">${weather.minTemp}°C</span> 입니다.<br>
            이런 날엔 <strong>${seasonalProducts[0]}</strong> 어떠세요?
        `;

        displaySeasonalProducts(season);
    } catch (error) {
        console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
        loadingIndicator.style.display = 'none';
        recommendationElement.innerHTML = `
            날씨 데이터를 가져오는 중 문제가 발생했습니다. 😞<br>
            다시 시도해주세요!
        `;
    }
}

document.addEventListener('DOMContentLoaded', updateWeatherRecommendation);
