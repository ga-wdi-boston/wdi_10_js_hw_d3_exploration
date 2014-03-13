//
var margin = {top: 20, right: 100, bottom: 30, left: 40}

// Colors to choose from. Using scale.ordinal().range will create a map of color
// to name such that colors are consistent for a given name?
var color = d3.scale.ordinal().range([
  "#2980b9",
  "#d35400",
  "#c0392b",
  "#27ae60",
  "#7f8c8d",
  "#2c3e50",
  "#f1c40f"
  ])

// layout.pie() gives d= path stuff to set angles for a pie chart based on a
// value (here, population)
var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.population });

window.onload = function() {
  d3.csv("states.csv", function(error, data) {
    // set the domain for the color (i.e. what names map to what color)
    // keys are the column headings, so d3.keys(data[x]) gives us an array of
    // the keys (as strings); .filter() passes those keys to a function and
    // returns an array of the elements for which that function returns true
    color.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "State";
    }));

    // uses color.domain(), which is just an array of the age ranges as strings
    // and iterates through it to set an ages array on each of the data entries
    // this ages array contains an object for each of the age groups (i.e. each
    // of the entries of color.domain() since we mapped it) with keys name and
    // population. Their values are the name (from color.domain()) and the
    // population of that age range, set to an integer using the unary operator
    // +
    data.forEach(function(d) {
      d.ages = color.domain().map(function(name) {
        return {name: name, population: +d[name]};
      });
    });

    // create the legend by appending an svg to the body with class legend
    // then append a <g> for each age group, reversing the array so oldest is at
    // the top. Stack them neatly beneath each other by translating each <g>
    // down according to a multiple of its index
    var legend = d3.select(".container").append("svg")
        .attr("class", "legend")
        .attr("width", 150)
        .attr("height", 150)
      .selectAll("g")
        .data(color.domain().reverse())
      .enter().append("g")
        .attr("transform", function(d,i) {
          return "translate(0," + i * 20 + ")";
        });

    // we created a legend but it is completely empty; set color swatches for
    // each <g> in the legend (recall this is a collection of <g> elements).
    // I don't really understand the magic with the color there since it is a
    // function but is not explicitly being called there
    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    // now append text for each <g> element in the legend using its data; we
    // set its data to the name of the age groups, so we can just set text to d
    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em") // this just moves the text slightly from its anchor
      .text(function(d) { return d; });

    // now let's make the main svg for the data display and append our data
    // .pie has no explicit reference to the var pie from above
    // recall at this point we have modified the .csv data return to have an
    // ages array with integer population values
    var svg = d3.select(".container").selectAll(".pie")
        .data(data)
      .enter().append("svg")  // this should be an svg for each data el (state)
        .attr("class", "pie") // each of these <svg> will be a pie chart
        .attr("width", 1200)   // we'll have a bunch of circles of varying sizes
        .attr("height", 1200)  // overlapped, so give them the same sized svg's
      .append("g")
        // move the <g> elements to the middle of the <svg> in preparation for
        // rendering the doughnuts
        .attr("transform", "translate(600,600)")

    //var arc = d3.svg.arc().innerRadius(74).outerRadius(34);
    count = 0;

    // draw the arcs for each of the <g> elements in the svg variable
    svg.selectAll(".arc")
      // the data here is the return from pie(), our d3.layout.pie() that
      // returns data to draw an arc based on its value attribute, which we set
      // to be d.population, so here we pass d.ages to the pie function, meaning
      // it gets an array of { name: "5 to 13 years", population: 123456 }
      // then sets its value attribute to the value of that population key, so
      // effectively .enter() is an array of arrays, each of which contains 7
      // objects that have __data__ objects with endAngle/startAngle/value
      // overall we go data obj > ages array > pie chart drawing properties
        // .data(function(d) { return pie(d.ages); })
        .data(function(d) { return pie(d.ages); })
      .enter().append("path") // make a path for each of the pie charts
        .attr("class", "arc")
        // arc is d3.svg.arc() which gets called automatically and passed the
        // data. I tried lots of ways to make "nested" doughnut charts by using
        // a counter or the index of the data to set the inner and outer radii
        // and this was the only way that worked
        // without Math.floor(count/7) the radius increments for EACH of the
        // elements of each state's data (which is the 7 p)
        .attr("d", function(d) {
          var arc = d3.svg.arc()
              .innerRadius(Math.floor(count/7)*10 + 20)
              .outerRadius(Math.floor(count/7)*10 + 10)
          count++;
          return arc(d);
        })
        .style("fill", function(d) { return color(d.data.name); });
  });
};
