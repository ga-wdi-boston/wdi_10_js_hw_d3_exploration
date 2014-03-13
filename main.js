window.onload = function(){

	// Set height and width for SVG element
	// Set radius for pie chart
	var width = 600,
    height = 500,
    radius = 70;

  // Define colors to be used in pie segments
	var color = d3.scale.ordinal()
    .range(["#ff8c00", "#a05d56", "#d0743c", "#98abc5"]);

  // Set width of pie segments to 100px
  var arc = d3.svg.arc()
  	.outerRadius(200)
  	.innerRadius(100);

  // Define function that will create segments based on data percent value
  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.percent; });

  // Append SVG element to div with id chart
  // Set height and width to variables above
  var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)

   // Append a group element to contain pie segments and
   // position at the center of the SVG element
  .append("g")
    .attr("transform", "translate(300,250)");

  // Load data from CSV file
  d3.csv("news-sources-2012.csv", function(error, data) {

	  // Bind data to future arc class elements
	  var g = svg.selectAll(".arc").data(pie(data))

	    // Iterate through data elements and append a g element to each
	    // with class arc
	    .enter().append("g")
	      .attr("class", "arc");

	  // Append a path element to each g element
	  // Set fill color to hex value of same index in color array above
	  g.append("path")
	  	.attr("d", arc)
	  	.style("fill", function(d, i) { return color(i); });

	  // Append text element to each g and position along pie segment arc
	  // Set text to the source of each element
	  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.source; });
	});

};