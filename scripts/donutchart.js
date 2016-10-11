/**
 * Created by Kunal on 15-Mar-16.
 */
(function(d3) {
    var dataset = [
        { label: 'Space Cooling (189 Billion KWH/Year)', count: 13 },
        { label: 'Lighting (150 Billion KWH/Year)', count: 11},
        { label: 'Water Heating (132 Billion KWH/Year)', count: 9},
        { label: 'Space Heating (132 Billion KWH/Year)', count: 9},
        { label: 'Refrigeration (106 Billion KWH/Year)', count: 7},
        { label: 'Television (96 Billion KWH/Year)', count: 7 },
        { label: 'Dryers (60 Billion KWH/Year)', count: 4},
        { label: 'Furnace Fans (43 Billion KWH/Year)', count: 3},
        { label: 'Computers (34 Billion KWH/Year)', count: 2},
        { label: 'Cooking (31 Billion KWH/Year)', count: 2},
        { label: 'Dishwashers (28 Billion KWH/Year)', count: 2},
        { label: 'Freezers (22 Billion KWH/Year)', count: 2},
        { label: 'Washers (8 Billion KWH/Year)', count: 1},
        { label: 'Others (383 Billion KWH/Year)', count: 27}
    ];

    var width = 380;
    var height = 380;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 30;

    var color =d3.scale.ordinal()
        .domain(["0", "1", "2","3","4","5","6","7","8","9","10","11","12","13"])
        .range(["#81CFE0", "#CF000F", "#4183D7","#59ABE3","#446CB3","#3498DB","#52B3D9","#1F3A93","#3A539B","#89C4F4","#4B77BE","#5C97BF","#19B5FE","#3498DB"]);

    var donutsvg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');

    var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

    var pie = d3.layout.pie()
        .value(function(d) { return d.count; })
        .sort(null);

    var itext=d3.select("svg")
        .append("text")
        .attr("class","textvalue")
        .attr("x", "40")
        .attr("y", "180")
        .text("Energy Consumption")
        .attr("font-size", 32)
        .attr("font-family", "Tahoma")
        .attr("alignment-baseline", "middle")
        .style("fill", "#888888");

    var path = donutsvg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {return color(i);})
        .on("mouseover", function(d,i) {
            d3.selectAll("text.textvalue").remove();
            d3.select("svg")
                .append("text")
                .attr("class","textvalue")
                .attr("x", "40")
                .attr("y", "180")
                .text(function(){return d.data.label + ":" + d.data.count + "%";})
                .attr("font-size", 16)
                .attr("font-family", "Tahoma")
                .attr("alignment-baseline", "middle")
                .style("fill", "#888888")})
        .on("mouseout", function(){
            d3.selectAll("text.textvalue").remove();
            d3.select("svg")
                .append("text")
                .attr("class","textvalue")
                .attr("x", "40")
                .attr("y", "180")
                .text("Energy Consumption")
                .attr("font-size", 31)
                .attr("font-family", "Tahoma")
                .attr("alignment-baseline", "middle")
                .style("fill", "#888888");
        });
})(window.d3);
