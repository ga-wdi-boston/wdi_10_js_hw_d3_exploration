# D3 "Exploration"

I took one of the basic examples (multiple doughnut graphs) and made them
nested. This was unexpectedly a lot of work. The major problem I ran into
is that the way a pie chart is rendered is that all the data values for
one chart are set by calling .value() on d3.layout.pie() and passing an
array of all the values that will comprise the pie chart, in this case
the population of the states, broken down by ages. The return value from
this function is in turn a set of path attributes that can be passed to
d3.svg.arc() in order to draw the pie chart.

This works fine for individual charts, but when I tried to dynamically
set the .innerRadius() and .outerRadius() properties of d3.svg.arc() as
I was calling it:

    svg.selectAll(".arc")
        .data(function(d) { return pie(d.ages)}; )
      .enter().append("path")
        .attr("class", "arc")
        .attr("d", function(d, i) {
          // problem here is i is the index within d.ages above
          // and it updates for EACH arc
          // if you try setting the data to just d and then returning
          // arc(pie(d.ages)) below it throws an error I don't quite
          // understand
          var arc = d3.svg.arc().innerRadius(i*10 + 10)
                    .outerRadius(i*10 + 10);
          return arc(d);
        });

to set the "d" attribute of my paths the value of the
radii would actually be updated for EACH path within the chart, meaning
if my radii increased by 10 each time a given chart would have staggered
arcs, rather than just being a dougnut with a consistent inner/outer
radius for each of its constituent arcs.

I got around this by creating a count that increased as I appended paths
for each state (can't use index because the data is actually just an
array of the 7 data points for each state, not all the states themselves)
and then using Math.floor(count/7) so that the radii on d3.svg.arc()
effectively only incremented every 7 data points. Since each state has 7
data points for the 7 age brackets, this means a given states arcs all
have the same inner/outer radii (making a doughnut graph), and then the
next state has its inner/outer radii incremented. Right now this is hard-
coded but you could just use `Math.floor(count/d.length)` to adapt to
different numbers of age ranges.

One problem with this is that there's really no room for the state
labels. I tried to get around this by assigning a mouseover handler to
each state, however I couldn't get this to work since the `<svg>` that
corresponds to a state covers all smaller states, so the largest/last one
(Wyoming) would always "steal" the click event even if you clicked on one
of the smaller dougnuts. I'm not really sure how to get around this and
overall do not feel even remotely comfortable with the d3 syntax or
what's actually going on under the hood.
