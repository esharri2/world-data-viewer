import './stylesheets/styles.scss';
import 'whatwg-fetch';
import { topics, indicators } from './fetches'


async function addTopics() {
    const data = await topics();
    const markup = data[1].map(topic => `<option value="${topic.id}">${topic.value}</option>`);
    document.querySelector("#topic").innerHTML = markup;    
    document.querySelector("#topic option")
}

async function addIndicators() {
    const data = await indicators();

}









addTopics();