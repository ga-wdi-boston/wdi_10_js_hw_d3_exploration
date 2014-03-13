For this homework I created a csv dataset with some sample annual traffic data in Boston, Cambridge, and East Boston spanning the years 2004-2009. My goal was to create a line graph with the x-axis being the year and the y-axis being the amount of traffic. Each line of the graph is supposed to represent the traffic data for a particular town.

I followed a few examples that I found online in hopes of making this data visualization work. The problem I found with appending an SVG line instead of a path is that it is hard to specify the two x and y coordinates needed for a line, especially for the corner cases of the first and last indexes of an array.

I had a lot of trouble working through using a path element. What I tried to do was create collections for each town in the dataset with year and traffic data for that town. I then wanted to draw a path for each town collection using its year and traffic data.

I have gone through my code a number of times and don't know how I can fix it. There is a path being drawn in the svg element, but it is not outputting the data correctly.
