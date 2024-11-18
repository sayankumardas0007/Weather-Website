document.getElementById("theme-toggle").addEventListener("click", function () {
    const theme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute(
        "data-theme",
        theme === "dark" ? "light" : "dark"
    );
});


const apiKey = "9fc3c6add7065797267da2904bcc0a47";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("nav input");
const searchBtn = document.querySelector("nav button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error-msg").style.display = "block";
        document.querySelector(".main").style.display = "none";
    }
    else {
        const data = await response.json();
        const results = data.results;

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";

        // document.querySelector(".pressure").innerHTML = Math.round(data.main.pressure) + " hPa";
        // document.querySelector(".timezone").innerHTML = Math.round(data.timezone) + " UTC";

        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "Resource/images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "Resource/images/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "Resource/images/rain.png";
        }
        else if (data.weather[0].main == "Drizzel") {

            weatherIcon.src = "Resource/images/drizzel.png";
        }
        else if (data.weather[0].main == "Mist") {

            weatherIcon.src = "Resource/images/mist.png";
        }
        else if (data.weather[0].main == "Snow") {

            weatherIcon.src = "Resource/images/snow.png";
        }

        document.querySelector(".main").style.display = "block";
        document.querySelector(".error-msg").style.display = "none";
    }

}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
