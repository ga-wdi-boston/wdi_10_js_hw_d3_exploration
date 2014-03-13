window.onload = function() {

  d3.json('countries.json', function(error, countries){
    var bubble_graph = d3.select('#chart').selectAll('circle').data(countries).enter().append('g');
    var legend = d3.select('#chart').selectAll('rect').data(countries).enter();
    var colorScale = d3.scale.category10();

    bubble_graph.append('circle')
        .attr('r', function(country) {
          if(country.population > 1 && country.population < 1000)
            {return country.population / 10};})
        .attr('cx', function(country, index) { return index * 3.5 + 100 })
        .attr('cy', function(country, index) { return index * 3.5 + 100 })
        .style("fill", function(country) { return colorScale(country.region); });

    bubble_graph.append('text')
        .text(function(country) {
          if(country.population > 1 && country.population < 1000) { return country.name };})
        .attr('x', function(country, index) {
          if(country.population > 1 && country.population < 1000) { return index * 3.5 + 120 };})
        .attr('y', function(country, index) {
          if(country.population > 1 && country.population < 1000) { return index * 3.5 + 80 };});

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
