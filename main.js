
// JSON data pts
// {"sighted_at": "19951009", "reported_at": "19951009", "location": " Iowa City, IA", "shape": "", "duration": "", "description": "Man repts. witnessing &quot;flash, followed by a classic UFO, w/ a tailfin at back.&quot; Red color on top half of tailfin. Became triangular."}

window.onload = function () {

  d3.json("raw_data.json", function (error, data) {
    // log an error if there is one and break out of the callback
    if (error) {
      console.log(error);
      return false;
    } else {
      return d3App.draw(data);
    }
  });
};

var d3App = {};

d3App.draw = function (data) {
  var margin = {top: 40, right: 50, bottom: 20, left: 50},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var max = d3.max(data, function (d) { return +d.total_points});
  var ticks = data.map(function (d) { return d.city; })

  var x = d3.scale.ordinal()
    .domain(d3.range(5))
    .rangeRoundBands([0, width], .08);

  var y = d3.scale.linear()
    .domain([0, max])
    .range([height, 0]);

  var svg = d3.select("body").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
   .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   var rect = svg.selectAll("rect")
     .data(data)
   .enter().append("rect")
      .attr("x", function (d, i) { return x(i); })
      .attr("y", function (d) { return y(d.total_points); })
      .attr("width", x.rangeBand())
      .attr("height", function (d) { return height - y(d.total_points); });

    var axis = d3.svg.axis()
      .scale(x)
      .tickSize(0)
      .tickPadding(6)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(0)
      .tickPadding(6)
      .orient("left");

    console.log(d3.descending(y))

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(axis);

    svg.append("g")
      .attr("class", "axis")
      .call(yAxis);

};
