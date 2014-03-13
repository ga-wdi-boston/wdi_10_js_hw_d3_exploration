# D3 Graph - Plotting Obesity Rates against Number of McDonalds per Capita, by State

There didn't end up being much of a correlation, but in any case...

General flow:

1. Define variables that will capture the x and y values for each data element (i.e., state)
2. Define variables to scale the graph appropriately
3. Define a variable to set the fill color for the dots that will be plotted on the graph
4. Append an svg element to the body, which will contain the graph
5. Append a div to the body to hold the tooltip area
6. Load the data from the csv file
7. Convert the number data in the csv file from strings to numbers
8. Set up the x and y axes with appropriate classes, labels and positioning
9. Append circle elements to represent each state, setting their x and y values to equal obesity % and number of McDonalds per Capita, respectively
10. Establish an event listener in order to have tooltips display when a dot is hovered over (and disappear when the mouse is moved away)
