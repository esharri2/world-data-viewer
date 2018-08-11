import './stylesheets/styles.scss';
import 'whatwg-fetch';
import { topics, indicators, countries, chartData } from './fetches';
import createChart from './createChart';

//Enable submit button when all select elements have a value
document.body.addEventListener("change", function () {
    let completeForm = true;
    const inputs = document.querySelectorAll("select");
    inputs.forEach(input => {
        if (!input.value) {
            completeForm = false;
        }
    })
    if (completeForm) {
        document.querySelector("#submit").disabled = false;
    }
})

async function addTopics() {
    const data = await topics();
    const markup = data[1].map(topic => `<option value=${topic.id}>${topic.value}</option>`);
    markup.unshift(`<option value="" selected disabled hidden>Select a topic</option>`);
    const topicMenu = document.querySelector("#topic")
    topicMenu.innerHTML = markup;
    topicMenu.addEventListener("change", function () {
        addIndicators(this.value);
    })
}

async function addCountries() {
    const data = await countries();
    const markup = data.map(country => `<option value=${country.id}>${country.name}</option>`);
    markup.unshift(`<option value="" selected disabled hidden>Select a country</option>`);
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
    const countryEl = document.querySelector("#country")
    const indicatorEl = document.querySelector("#indicator")
    const country = countryEl.value;
    const indicator = indicatorEl.value;
    getChartData(country, indicator);
})

document.querySelector(".chart-container").scrollIntoView({ behavior: "smooth", block: "center" })


async function getChartData(country, indicator) {
    const data = await chartData(country, indicator);
    createChart(data, function () {
        document.querySelector(".chart-container").scrollIntoView({ behavior: "smooth", block: "start" })
    });
}

//FOR TESTING
// getChartData();


addTopics();
addCountries();
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