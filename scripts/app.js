const form = document.querySelector("form")
const input = document.querySelector(".input")
const rightBar = document.querySelector(".right-bar")
const container = document.querySelector(".container")
const informationLeft = document.querySelector(".information-left")
const title = document.querySelector(".title")
const hello = document.querySelector(".hello")


const upDateUI = (data) => {
    const{ cityDets, weather } = data;

    rightBar.innerHTML = `
        <div class="information-right">
            <div class="info" >
                <img id="icon" src="img/icons/${weather.WeatherIcon}.svg" alt="">    
            </div>
            <div class="info" id="condition">${weather.WeatherText}</div>
            <div class="info" id="temp">${weather.Temperature.Metric.Value}&deg;C</div>
            <div class="info" id="city-name">${cityDets.EnglishName}</div>
        </div>
    `;

    informationLeft.style.color = "#243046"
    rightBar.style.backgroundImage ="none"
    container.style.backgroundColor ="#eeedec"
    
    hello.innerHTML = `Today ${cityDets.EnglishName}!`
    input.classList.add("input-submit")
    title.innerHTML = ` `

    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg" ;
    rightBar.style.backgroundImage = `url(${timeSrc})`
    rightBar.style.backgroundSize= "cover";
    if(weather.IsDayTime===false){
        document.querySelector("#icon").style.backgroundColor = "#313c51"
    }
};

const updateCity = async (city) =>{
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather};
};

form.addEventListener("submit", e=>{
    e.preventDefault();

    const city = form.city.value.trim();
    form.reset()

    updateCity(city)
    .then(data=> upDateUI(data) )
    .catch(err=> console.log(err));

    localStorage.setItem("city", city);
});

if(localStorage.getItem("city")){
    updateCity(localStorage.getItem("city"))
    .then(data=> upDateUI(data) )
    .catch(err=> console.log(err));
}