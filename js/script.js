window.onload = function() {
  var width  = 800,
      height = 1000,
      barHeight = Math.floor(height / 77) - 1;

  var x = d3.scale.linear()
    .range([0, width])

  var y = d3.scale.linear()
    .range([0, height])

  var svg = d3.select("body").append("svg")
              .attr("width", width)
              .attr("height", height)

  d3.csv("cereals_edited.csv", function(error, cereals) {

    console.log(cereals);
    var categories = d3.keys(cereals[0]);
    console.log(categories);

    cereals.forEach(function(d) {
      d.calories = +d.calories;
      d.protein  = +d.protein;
      d.protein  = +d.protein;
      d.fat      = +d.fat;
      d.sodium   = +d.sodium;
      d.fiber    = +d.fiber;
      d.carbo    = +d.carbo;
      d.sugars   = +d.sugars;
      d.potass   = +d.potass;
      d.vitamins = +d.vitamins;
      d.weight   = +d.weight;
      d.cups     = +d.cups;
    });

    var g = svg.selectAll("g")
        .data(cereals)
        .enter().append("rect")
        .attr({
          width: function(d, i) { return d.calories; },
          height: barHeight,
          y: function(d, i) { return barHeight*i },
          fill: "tomato"
        })

  });
};
