import * as d3 from "d3";

export default function (data) {

    //Add title, using indicator name
    const chart = d3.select('.chart-container').insert("div", ":first-child").attr("class", "chart")
    chart.append("h2").text(`${data[1][0].country.value}: ${data[1][0].indicator.value} from 2000 to 2017`)

    //Add button bar
    const buttonBar = chart.append("div").attr("class", "btn-bar")

    //Add remove chart button and assign even handler
    const removeButton = buttonBar.append("button").attr("class", "remove").text("Delete");
    removeButton.on("click", function () {
        chart.remove()
    })

    //sort data by date
    const sortedData = data[1].sort((a, b) => {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    });

    //Build arrays of x and y values
    let xData = [];
    let yData = [];
    sortedData.forEach(item => {
        xData.push(item.date);
        yData.push(item.value)
    })

    //Test to see if there is enough data for a chart
    const test = yData.filter(datum => datum !== null);

    if (test.length <= 1) {
        chart.append("p").attr("class", "noData").text("Sorry, there is not enough data for this chart. Try a different search.")
    } else {
        //Margins and chart size
        const margin = { top: 40, left: 100, bottom: 40, right: 40 }
        var svgWidth = 750, svgHeight = 400;

        //Unit to use for axis (usually null)
        const unit = data[0].unit

        //CREATE SVG       
        const svg = chart.append('svg')
        svg.attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr('class', 'chartSvg')
            .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
            .attr('preserveAspectRatio', `xMidYMid meet`)

        //Add JSON button
        const jsonButton = buttonBar.append("button").attr("class", "showJson").text("JSON");
        jsonButton.on("click", function () {
            const jsonEl = this.closest(".chart").querySelector(".json");
            if (jsonEl) {
                jsonEl.remove();
                svg.style("display","block").transition().style("opacity",1);
                this.classList.remove("on");
            } else {
                this.classList.add("on");
                svg.transition().style("opacity",0).on("end",function(){
                    svg.style("display","none");
                    chart.append("div").attr("class", "json").append("code").text(JSON.stringify(sortedData, null, 2))
                });            
            }
          
        })

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
            .defined(d => d.value)
            .x(d => x(d.date))
            .y(d => y(d.value))


        x.domain(d3.extent(sortedData, d => d.date));
        y.domain(d3.extent(sortedData, d => d.value));

        //DRAW LINE
        const path = lineGroup.append("path")
            .datum(sortedData)
            .attr("class", "line")
            .attr("d", line)//end

        var totalLength = path.node().getTotalLength();
        console.log(totalLength)



        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        //Add dots where line meets
        lineGroup.selectAll(".dot")
            .data(sortedData.filter(function (d) { return d.value; }))
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", line.x())
            .attr("cy", line.y())
            .attr("r", 2.5);



    }
}






