import './stylesheets/styles.scss';
import 'whatwg-fetch';
import { topics, indicators, countries, chartData } from './fetches';
import createChart from './createChart';


async function addTopics() {
    const data = await topics();
    const markup = data[1].map(topic => `<option value=${topic.id}>${topic.value}</option>`);
    const topicMenu = document.querySelector("#topic")
    topicMenu.innerHTML = markup;
    topicMenu.addEventListener("change", function () {
        addIndicators(this.value);
    })
}

async function addCountries() {
    const data = await countries();
    const markup = data.map(country => `<option value=${country.id}>${country.name}</option>`);
    const countriesMenu = document.querySelector("#country")
    countriesMenu.innerHTML = markup;
}

async function addIndicators(topicId) {
    const data = await indicators(topicId);
    const markup = data[1].map(indicator => `<option value=${indicator.id}>${indicator.name}</option>`);
    document.querySelector("#indicator").innerHTML = markup;
}

document.querySelector("#submit").addEventListener("click", event => {
    event.preventDefault();
    const country = document.querySelector("#country").value;
    const indicator = document.querySelector("#indicator").value;
    getChartData(country, indicator);
    //scroll to first chart on page.
    if (document.querySelector(".chart-container")) {
        const chartTop = document.querySelector(".chart-container").getBoundingClientRect().top;
        window.scrollTo({
            top: chartTop,
            behavior: "smooth"
        });
    }
    
    

})

async function getChartData(country, indicator) {
    const data = await chartData(country, indicator);
    createChart(data);
}

//FOR TESTING
getChartData();


// addTopics();
// addCountries();
scrollUpButton();

function scrollUpButton() {
    const up = document.querySelector(".up");
    window.addEventListener("scroll", event => {
        if (document.scrollingElement.scrollTop > 150) {
            up.style.display = 'block';
        } else {
            up.style.display = 'none';
        }
    })

    document.querySelector(".up").addEventListener("click", event => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
}