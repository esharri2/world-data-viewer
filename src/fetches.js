const endpoint = "https://api.worldbank.org/v2"

export const topics = () =>
    fetch(`${endpoint}/topics?format=json`)
        // .then(response => console.log(response))
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));

export const indicators = (id) =>
    fetch(`${endpoint}/topics/${id}/indicators?format=json&per_page=100`)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));

export const countries = () =>
    fetch(`${endpoint}/countries?format=json&per_page=500`)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));

export const chartData = (country, indicator) =>
    fetch(`${endpoint}/countries/${country}/indicators/${indicator}?format=json&per_page=500&date=2000:2018`)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));


