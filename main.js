window.onload = function() {
  var data = d3.json("location_of_corner_stores.json", function(error, stores){
    d3.select("#stores")
      .selectAll("circle")
      .data(stores.data)
      .enter()
      .append("circle")
      .attr('cx', function(store, i){return Math.abs(parseFloat(store[13][2]) + i);})
      .attr('cy', function(store){return parseFloat(store[13][1]);})
      .attr('r', function(store){return store[8].length;});
  });
}

// stores.data[0][8]
// "Ramirez Grocery"
// stores.data[0]
// [3, "D8087EC2-68CA-4318-A0F4-30E7D025E526", 3, 1359570111, "699782", 1359573940, "699782", "{
// }", "Ramirez Grocery", "481 Geneva Avenue", "Dorchester", "MA", "2122",
// Array[5]
// ]
// stores.data[0][13]
// ["{"address":"481 Geneva Avenue","city":"Dorchester","state":"MA","zip":"2122"}", "42.299392257759465", "-71.06481870122053", null, false]
// stores.data[0][13][1]
// "42.299392257759465"
// stores.data[0][13][2]
// "-71.06481870122053"
