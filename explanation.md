# Donut chart overview

Donut charts are essentially a collection of arc segments that make up a circle. Using D3's pie chart constructor, we are able to set the outer and inner radius of pie segments to achieve the donut effect. (Setting the inner radius to 0 would merely show a pie chart.)

In constructing a donut chart, we start by adding an SVG element to the page and appending a "g" element within it which will serve as a container for our donut segments.

Upon loading the csv data into D3, we call the pie constructor method with the collection which appends a g element within the existing "g" container for each row of data. Once these sub-containers are created, we iterate through each row, setting the "d" path attribute of each segment to arc and assigning a color from the color array.

Finally we iterate through the data set again, appending a text element to each sub-container for label. Labels are positioned based on the location of their corresponding arc segment and the text applied is the "source" value of each piece of data in the collection.