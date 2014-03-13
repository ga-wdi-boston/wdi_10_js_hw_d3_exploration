window.onload = function() {
	// Specify the x axis range from 0 to 800
	var x = d3.time.scale()
	    .range([0, 800]);

	// Specify the y axis range from 0 to 400
	var y = d3.scale.linear()
	    .range([400, 0]);

	// This is an array of colors
	var color = d3.scale.category10();

	// Create the x axis with the range specified above
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	// Create the y axis with the range specified above
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	// Draw a line using the year from of each data as the x axis
	// and the traffic from the data as the y axis
	var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.traffic); });

  // Append an svg element to the body with the specified
  // height and width
  var svg = d3.select("body").append("svg")
		.attr("width", 800)
		.attr("height", 400)
		// Append a g element to the svg
		.append("g")
			// centers g within svg
			.attr("transform", "translate(" + 400 + "," + 200 + ")");

	// Get the data from the csv file
	var data = d3.csv("boston_traffic.csv", function(error, data){

		// Get the color for the line
		// This removes the town string values of the data from what will be
		// used to create the lines
		color.domain(d3.keys(data[0]).filter(function(key) { return key !== "town"; }));

		data.forEach(function(d) {
	  // Typecasting strings to numbers
	  d.year = +d.year;
	  d.traffic = +d.traffic;
		});

		// This is supposed to map the year and traffic into an array for each city
		var cities = color.domain().map(function(name) {
		    return {
		    	// Assigns the return object's name property to 'town'
		      name: name,
		      // Assigns the values of the return object to an object containing
		      // year and traffic numbers
		      values: data.map(function(d) {
		        return {year: +d[name], traffic: d.traffic};
		      })
		    };
		  });

		// Sets the domains of the x and y ranges defined in the first lines
		x.domain(d3.extent(data, function(d) { return d.year; }));
		y.domain([
	    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.traffic; }); }),
	    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.traffic; }); })
	  ]);

		// Appends the x and y axis defines above
	  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 400 + ")")
      .call(xAxis);
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      // Rotates the text and adds it to the end of the y axis
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Traffic");

	  // Add a new g element with class city for every element in the cities data
	  // array created above
    var city = svg.selectAll(".city")
          .data(cities)
        .enter().append("g")
          .attr("class", "city");

    // Add a line in each g element create with class of city that connects
    // at all of the year,traffic x,y values in the data
    // Also add the class town and a stroke color from the d3.scale.category10()
    // array of colors
    city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .attr("class", function(d) {return d.town; })
      //.attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { debugger; return color(d.name); });
	});
};
