window.onload = function() {
  var diameter = 960,
      format = d3.format(",d"),
      color = d3.scale.category20c();

  var bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select("body").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

  d3.json("location_of_corner_stores.json", function(error, stores) {
    var node = d3.select("#stores").selectAll(".node")
        .data(stores.data)
        // .filter(function(d) { return !d.children; }))
      .enter().append("g")
        .attr("class", "node")
        // .attr("transform", function(store)

    node.append("title")
        .text(function(store) { return store[8] + ": " + format(store.value); });

    node.append("circle")
        .attr("r", function(store) { return store[8].length.r; })
        // .style("fill", function(store) { return color(d.packageName); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(store) { return store[8]; });
  });

  // Returns a flattened hierarchy containing all leaf nodes under the stores.
  function classes(stores) {
    var classes = [];

    // function recurse(name, node) {
    //   if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    //   else classes.push({packageName: name, className: node.name, value: node.size});
    // }

    recurse(null, stores);
    return {children: classes};
  }

  d3.select(self.frameElement).style("height", diameter + "px");

};


