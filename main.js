window.onload = function() {

// sets the width and height of the svg canvas
var width = 960,
    height = 500;

// creates a new map collection, kind of like an array
var rateById = d3.map();

// rounds each value to the nearest chosen threshold and appends it as a class to each path element (county)
// in this case kind of unnecessary because my map only uses 0 and 1 for values
var quantize = d3.scale.quantize()
    .domain([0, 1])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

// creates a geo path... like a normal path, but renders faster and can use different geometric projections
var path = d3.geo.path();

// append svg element to body
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// get the external data
queue()
    .defer(d3.json, "us.json")
    .defer(d3.tsv, "counties.tsv", function(d) { rateById.set(d.id, +d.rate); })
    .await(ready);

// this is where all the paths and classes are appended to each county
// the class name is what determines the colorization, via css styles
function ready(error, us) {
  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("class", function(d) { return quantize(rateById.get(d.id)); })
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
}

}
