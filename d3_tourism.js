window.onload = function() {
  // load data set
  d3.json('countries.json', function(error, countries){
    // set variables to be called below
    // inserting the data set into the dom, each within a "g" element
    var bubble_graph = d3.select('#chart').selectAll('circle').data(countries).enter().append('g');
    // creating a legend based on the data set
    var legend = d3.select('#chart').selectAll('rect').data(countries).enter();
    // creating a color scale function to be called below
    var colorScale = d3.scale.category10();

    // making the bubble graph, setting each radius proportional to the population size
    // "filtering" all countries with population over 1000
    // positioning each circle proportional to its index in the dataset (not consecutive)
    // calling the colorScale function to fill the bubbles according to their regions
    bubble_graph.append('circle')
        .attr('r', function(country) {
          if(country.population > 1 && country.population < 1000)
            {return country.population / 10};})
        .attr('cx', function(country, index) { return index * 3.5 + 100 })
        .attr('cy', function(country, index) { return index * 3.5 + 100 })
        .style("fill", function(country) { return colorScale(country.region); });

    // appending the country names to the bubbles
    // "filtering" again (tried to filter before .enter() above but was unsucessful, hence the unfortunate repeated filtering)
    bubble_graph.append('text')
        .text(function(country) {
          if(country.population > 1 && country.population < 1000) { return country.name };})
        .attr('x', function(country, index) {
          if(country.population > 1 && country.population < 1000) { return index * 3.5 + 120 };})
        .attr('y', function(country, index) {
          if(country.population > 1 && country.population < 1000) { return index * 3.5 + 80 };});

    // creating the legend
    // again, calling the colorScale function, need to filter out unique regions
    legend.append('rect')
        .attr('x', function(country) {
          if(country.population > 1 && country.population < 1000) {return 1000 };})
        .attr('y', function(country, index) {
          if(country.population > 1 && country.population < 1000) {return 50 + index * 1.2 };})
        .style("fill", function(country) {
          if(country.population > 1 && country.population < 1000)
            {return colorScale(country.region); };})
        .attr('width', function(country) {
          if(country.population > 1 && country.population < 1000) {return 20 };})
        .attr('height', function(country) {
          if(country.population > 1 && country.population < 1000) {return 20 };});

    // adding text to the legend
    legend.append('text')
        .text(function(country) {
          if(country.population > 1 && country.population < 1000) { return country.region };})
        .attr('x', function(country) {
          if(country.population > 1 && country.population < 1000) {return 1050 };})
        .attr('y', function(country, index) {
          if(country.population > 1 && country.population < 1000) {return 50 + index * 1.3 };})

    legend.append('text')
        .text('Regions')
        .attr("x", 1050)
        .attr("y", 40)
  });


};
