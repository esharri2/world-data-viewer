export const topics = () =>
    fetch(`https://api.worldbank.org/v2/topics?format=json`)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));

export const indicators = (id) =>
    fetch(`https://api.worldbank.org/v2/topics/${id}/indicators?format=json`)
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.error(`Fetch Error =\n`, error));