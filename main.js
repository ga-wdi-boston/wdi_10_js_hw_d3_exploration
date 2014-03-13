
window.onload = function() {

  d3.json("location_of_corner_stores.json", function(error, stores){
    // this var for setting the prev_store - for comparison
    var prev_store;

    //getting the data from json
    var my_stores = d3.select("#stores")
                    .selectAll("g")
                    .data(stores.data)
                    .enter()
                    // appending the g element to the svg - allowing the circle and the text to be grouped together
                    .append("g")
                    .attr("transform", function(store, i){
                      var translate, deltaX = 0.1, deltaY = 0.1;
                      //tried to make an offset that related to the ditance between points each store compared to the previous store
                      if(prev_store){
                        deltaX = Math.abs(parseFloat(prev_store[13][2]) - parseFloat(store[13][2]));
                        deltaY = Math.abs(parseFloat(prev_store[13][1]) - parseFloat(store[13][1]));
                        console.log(deltaX, " ", deltaY);
                      }
                      // now translating the g element to allow for the deltaX to be visable plus an off set of 100
                      translate = "translate(" + ((deltaX * 100000) + 100 )  + "," +  ((deltaY * 100000) + 100) +  ")";
                      prev_store = store;
                      return translate;
                      console.log( deltaX, deltaY);
                    })
                    .attr("class", "node");

        my_stores.append('circle')
                  // adding a circle that had the radius to be equal to the length of the name
                 .attr('r', function(store){return store[8].length;})
                 .attr('id', function(store, i ){return i;});

        my_stores.append('text')
                // adding a text element to the g element - which is the store name
                 .text(function(store){return store[8];})
                 // setting it to the center of the g element
                 .style("text-anchor", "middle");
  });
};



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
