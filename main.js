window.onload = function() {    // When the window loads...

  // addEventListener(onClick)

  d3.csv("turnout.csv", function(d) {
      saveData(d);
  });

  function saveData(d) {
    console.log(d);
    var data = d;
    console.log(data[0].State);
    console.log(data[0].VoterTurnout);

    var x = d3.scale.linear()     // Create a linear scaling of data
      .domain([0, d3.max(data.map(function(d) { return d.VoterTurnout; }))])  // Set domain up to the max of the data set
      .range([0, 800]);           // Allow space for a possible range of 800

    d3.select(".chart") // Selects the div with chart class
      .selectAll("div") // What *will* be appended
      .data(data)     // The data we want to put into the div
      .enter()          // Enter => "for each element not already in the DOM, do this:"
        .append("div")
        .style("width", function(d) { return x(d.VoterTurnout) + "px"; })
        .text(function(d) { return d.State; }); // Setting the text
  }
};

