window.onload = function(){

	var width = 600,
    height = 500,
    radius = 500;

	var color = d3.scale.ordinal()
    .range(["#ff8c00", "#a05d56", "#d0743c", "#98abc5"]);

  var radius = 70

  var arc = d3.svg.arc()
  	.outerRadius(200)
  	.innerRadius(100);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.percent; });

  var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.csv("news-sources-2012.csv", function(error, data) {

	  data.forEach(function(d) {
	    d.percent = +d.percent;
	  });

	  var g = svg.selectAll(".arc")
	      .data(pie(data))
	    .enter().append("g")
	      .attr("class", "arc");

	  g.append("path")
	      .attr("d", arc)
	      .style("fill", function(d) { return color(d.data.source); });

	  g.append("text")
	      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	      .attr("dy", ".35em")
	      .style("text-anchor", "middle")
	      .text(function(d) { return d.data.source; });
});



};

var newsApp = {};

newsApp.renderGraph = function(){

}