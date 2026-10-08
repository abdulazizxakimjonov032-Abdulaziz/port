const apiKey = "75611985adf45a3070e7cf75dc132fc8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=uz&q=";

const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const errorBox = document.getElementById("error-msg");

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            errorBox.style.display = "block";
            return;
        } else {
            errorBox.style.display = "none";
        }

        const data = await response.json();

        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = Math.round(data.wind.speed * 3.6) + " km/h";
        document.getElementById("weather-desc").innerText = data.weather[0].description;

        // Ob-havo ikonkasini dinamik yangilash
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
}

// Qidirish tugmasi bosilganda
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// "Enter" tugmasi bosilganda
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Dastlabki yuklanishda Toshkent ob-havosini ko'rsatish
checkWeather("Tashkent");