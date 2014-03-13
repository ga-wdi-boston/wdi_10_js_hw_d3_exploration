d3.json("flare.json", function(error, data) {
    // sets the input data matrix used by this layout.
    var chord = d3.layout.chord()
        // sets the angular padding between groups to the specified value in radians.
        .padding(.05)
        // sets the sort order of groups (rows) for the layout using the specified comparator function. The comparator function is invoked for pairs of rows, being passed the sum of row i and row j.
        .sortSubgroups(d3.descending)
        .matrix(data);

    var width = 960,
        height = 500,
        innerRadius = Math.min(width, height) * .41,
        outerRadius = innerRadius * 1.1;

    var fill = d3.scale.ordinal()
        .domain(d3.range(3))
        .range(["#000000", "#FF0000", "#957212"]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("g").selectAll("path")
            // Returns the computed group objects, given the layout's current configuration and associated matrix.
        .data(chord.groups)
        .enter().append("path")
        // fill the arcs with the specific color
        .style("fill", function(d) { return fill(d.index); })
        .style("stroke", function(d) { return fill(d.index); })
              // sets the Radius-accessor to the specified function or constant.
        .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
              // add mousefunction to the arcs which will call the fade function
        .on("mouseover", fade(.1))
        .on("mouseout", fade(1));

    svg.append("g")
        .attr("class", "chord")
        .selectAll("path")
        .data(chord.chords)
        .enter().append("path")
        .attr("d", d3.svg.chord().radius(innerRadius))
        .style("fill", function(d) { return fill(d.target.index); })
        .style("opacity", 1);

    var ticks = svg.append("g").selectAll("g")
        .data(chord.groups)
        .enter().append("g").selectAll("g")
        .data(groupTicks)
        .enter().append("g")
        .attr("transform", function(d) {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + outerRadius + ",0)";
        });

        ticks.append("line")
            // distance between the line and the circle
            .attr("x1", 1)
            .attr("y1", 0)
            // length of the line
            .attr("x2", 5)
            .attr("y2", 0)
            .style("stroke", "#000");
        // append the text
        ticks.append("text")
            .attr("x", 8)
            .attr("dy", "0.35em")
            .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
            .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .text(function(d) { return d.label; });

      function groupTicks(d) {
        var k = (d.endAngle - d.startAngle) / d.value;
        return d3.range(0, d.value, 10).map(function(v, i) {
          return {
            angle: v * k + d.startAngle,
            label: i % 1 ? null : v + "%"
          };
        });
      }





    function fade(opacity) {
      return function(g, i) {
        svg.selectAll(".chord path")
            .filter(function(d) { return d.source.index != i && d.target.index != i; })
            .transition()
            .style("opacity", opacity);
      };
    }
});








function groupTicks(d) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, 10).map(function(v, i) {
    return {
      angle: v * k + d.startAngle,
      label: i % 1 ? null : v + "%"
    };
  });
}





function fade(opacity) {
  return function(g, i) {
    svg.selectAll(".chord path")
        .filter(function(d) { return d.source.index != i && d.target.index != i; })
        .transition()
        .style("opacity", opacity);
  };
}
