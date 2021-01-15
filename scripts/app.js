const form = document.querySelector("form")
const input = document.querySelector(".input")
// const card = document.querySelector(".card")
const rightBar = document.querySelector(".right-bar")
const icon = document.querySelector("#icon")
const container = document.querySelector(".container")
const informationLeft = document.querySelector(".information-left")
const title = document.querySelector(".title")
const hello = document.querySelector(".hello")


const upDateUI = (data) => {
    console.log(data)

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    const{ cityDets, weather } = data;

    rightBar.innerHTML = `
        <div class="information-right">
        <div class="info" >
                <img id="#icon" src="img/icons/${weather.WeatherIcon}.svg" alt="">    
            </div>
            <div class="info" id="condition">${weather.WeatherText}</div>
            <div class="info" id="temp">${weather.Temperature.Metric.Value}&deg;C</div>
            <div class="info" id="city-name">${cityDets.EnglishName}</div>
        </div>
    `;
    
    hello.innerHTML = `Today ${cityDets.EnglishName}!`
    input.classList.add("input-submit")
    title.innerHTML = ` `

    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg" ;
    rightBar.style.backgroundImage = `url(${timeSrc})`
    rightBar.style.backgroundRepeat="no-repeat";
    rightBar.style.backgroundSize= "cover";


    // if(card.classList.contains("d-none")){
    //     card.classList.remove("d-none");
    // }

};

const updateCity = async (city) =>{

    const cityDets = await getCity(city);
    console.log(cityDets)
    const weather = await getWheather(cityDets.Key);

    return {cityDets, weather};

};

form.addEventListener("submit", e=>{
    e.preventDefault();

    informationLeft.style.color = "#006d77"
    rightBar.style.backgroundImage ="none"
    container.style.backgroundColor ="#eeedec"
    


    const city = form.city.value.trim();
    form.reset()

    updateCity(city)
    .then(data=> upDateUI(data) )
    .catch(err=> console.log(err));

    localStorage.setItem("city", city);
});

// if(localStorage.getItem("city")){
//     updateCity(localStorage.getItem("city"))
//     .then(data=> upDateUI(data) )
//     .catch(err=> console.log(err));
// }