const key ="hqObQwwS2fQpHXqlAgFGGWZrlDnQCyS1"

const getWheather = async (id) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/"
    const query = `${id}?apikey=${key}`

    const response = await fetch(base + query);
    const data = await response.json()
    console.log(data)

    return data[0]
}

const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey= ${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0]
}
// getCity("manchester").then(data => {
//     return getWheather(data.Key);
// }).then(newdata => {
//     console.log(newdata)
// })
// .catch(err => console.log(err));

