const endpoint = "https://api.worldbank.org/v2"

export const topics = () =>
    fetch(`${endpoint}/topics?format=json`)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));

export const indicators = (id) =>
    fetch(`${endpoint}/topics/${id}/indicators?format=json&per_page=500`)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));

export const countries = () =>
    fetch(`${endpoint}/countries?format=json&per_page=500`)
        .then(response => response.json())
        .then(response => {
            //Only return countries with capitals; kludgey way to filter out regions, continents, etc. 
            const countries = response[1].filter(country => country.capitalCity.length > 0);
            return countries;
        })
        .catch(error => console.error(`Fetch Error =\n`, error));



export const chartData = (country, indicator) => {
    const url = `${endpoint}/countries/${country}/indicators/${indicator}?format=json&per_page=500&date=2000:2017`
    // const url = "http://api.worldbank.org/v2/countries/br/indicators/NY.GDP.MKTP.CD?format=json&date=2000:2017";

    return fetch(url)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));
}


