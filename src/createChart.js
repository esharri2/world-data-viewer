import * as d3 from "d3";

export default function (data) {

    console.log(data)

    const margin = { top: 40, left: 100, bottom: 40, right: 40 }

    const sortedData = data[1].sort((a, b) => {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    });


    let xData = [];
    let yData = [];
    sortedData.forEach(item => {
        xData.push(item.date);
        yData.push(item.value)
    })

    var svgWidth = 750, svgHeight = 400;

    //Unit to use for axis (usually null)
    const unit = data[0].unit

    //Add title, using indicator name
    const chart = d3.select('.chart-container').insert("div", ":first-child").attr("class", "chart")
    chart.append("h2").text(`${sortedData[1].indicator.value} from 2000 to 2017`)
    const svg = chart.append('svg')

    //CREATE SVG
    // const svg = d3.select('.chart')
    //     .insert('svg', ":first-child")

    svg.attr('width', svgWidth)
        .attr('height', svgHeight)
        .style('background-color', 'lightgray')

    //SCALE for X
    const x = d3.scaleLinear()
        .domain([2000, 2017])
        .range([0, svgWidth - margin.left * 2])

    //SCALE for Y
    const y = d3.scaleLinear()
        .domain([0, d3.max(yData)])
        .range([svgHeight - margin.top - margin.bottom, 0])

    //AXES
    var x_axis = d3.axisBottom().scale(x);
    var y_axis = d3.axisLeft().scale(y);

    //ADD X AXIS
    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${svgHeight - margin.top})`)
        .call(x_axis)

    //ADD Y AXIS
    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(y_axis)

    //CREATE GROUP FOR LINE
    var lineGroup = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var line = d3.line()
        //add defined here? https://github.com/d3/d3-shape#line_defined
        .x(d => x(d.date))
        .y(d => y(d.value))


    x.domain(d3.extent(sortedData, d => d.date));
    y.domain(d3.extent(sortedData, d => d.value));

    //DRAW LINE
    lineGroup.append("path")
        .datum(sortedData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
}






