# D3 Walkthrough

* wrap everything in a window.onload event handler

First thing you need to do is retrieve the data:

	d3.json("file_url", callback(error, data) {
		// do something if there is an error
		// do something if there is data
		// I namespaced the draw function
		return d3App.draw(data);
	});
	
So let's dig into the draw function now.

* pass in the data from the previous d3.json call
* set up the dimensions of svg

For the dimensions I used the trick that I found yesterday to first setup margins in order to display the axis. Then subtract the respective margins in order to calculate the actual width and height of the graph itself. The svg parent element will be the total width and height, including margins.

setup the scales (ordinal for x-axis and linear for y-axis)
	
	var x = d3.scale.ordinal()
    .domain(d3.range(5))
    .rangeRoundBands([0, width], .08);

	var y = d3.scale.linear()
    .domain([0, max])
    .range([height, 0]);

The above scales work best with a vertical bar chart, where the y-axis is showing the dynamic data and the x-axis just increments. With scaling, the idea is simple: provide a domain in which to look for the data, then provide a range (there is a multitude of functions with slight variations here) that provides the scaled output for the chart.

Then you want to setup some variables for the major pieces of the bar chart, which were in this case:

* svg - setup the container
* rect - setup the individual bars
* axis - setup the axis

For svg, you want to select the body node and append a svg element to it with the dimensions previously established (width, height + margin). 

Since methods are chainable (this is returned from each function call), you can append a g element within the same variable assignment.

When doing the actual bars, the rect elements, you want to first selectAll("rect"), which selects any rect elements currently in the svg element and call a data join on it - .data(data), which links the data.

You can then pass .enter() which initiates something similar to a for loop, looping through each data element and passing certain actions on it. The data element can be accessed via a callback - 

	function (d) { return d // retun the element };

Lastly, with the axis, you want to create a generator  and pass in a scale (use the same variable that you used to create the scale methods above). You can also adjust attributes on them.

When appending the axis, you want to first append a g element, move it to the right spot on the svg and then call the axis like so

	.call(axis);
	
Return true at the end of the draw function for convention sake. 
