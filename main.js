// make a svg canvas - center & circle
// import csv data
// append number of rows in data as circles to the canvas
// control to switch sorting


// var canvas = d3.select('body').append('svg').attr('height', 600).attr('width', 600);

var schools = ["USC", "LSU", "Miami (FL)", "Florida St.", "Alabama", "Ohio St.", "Florida", "Georgia", "Notre Dame", "Wisconsin", "Stanford", "California", "Oregon", "Oklahoma", "Texas", "Tennessee", "Clemson", "South Carolina", "Iowa", "Penn St.", "Michigan", "Auburn", "Utah", "Rutgers", "North Carolina", "Nebraska", "Illinois", "Arizona St.", "Missouri"];
 var numPros = [52,50,48,48,47,43,43,42,40,36,36,36,35,34,34,33,32,32,30,29,29,29,29,29,28,27,27,27,27];
 var numCurrentPros = [12,3,6,4,7,7,2,2,13,4,3,1,6,3,3,2,0,0,3,6,6,1,1,0,2,5,5,5,2];
 var randoW = function(d){return Math.floor(Math.random()*600)}
 var randoH = function(d){return Math.floor(Math.random()*600)}
 var mydata = [];

// create data
for (var i = 0; i < schools.length; i++) {
  var obj = {}
  obj.school = schools[i];
  obj.numPros = numPros[i];
  obj.numCurrentPros = numCurrentPros[i];
  mydata.push(obj)
}
// var diameter = 200;

// write circles
// var circles = canvas
//   .selectAll('circles')
//   .data(mydata)
//   .enter()
//   .append("circle")
//   .attr('cx', randoW)
//   .attr('cy', randoH)
//   .attr('r', function (d, i) {
//     return d.numPros;
//   })
//   .style('fill', 'purple')


// var width = 800;
// var height = 600;

// var canvas = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(50, 50)");


// Pack Layout
// var pack = d3.layout.pack()
//     .size([width, height - 50])
//     .padding(10);

// var nodes = pack.nodes(numPros);

// var node = canvas.selectAll(".node")
//   .data(nodes)
//   .enter()
//   .append('g')
//     .attr("class", "node")
//     // .attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")";})
//     .attr("transform", "translate(2,2)")
//     node.append("circle")
//       .attr('r', 25)
//       .attr("fill", "blue")
//       .attr("opacity", 0.25)

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

d3.json("data.json", function(error, root) {
  if (error) throw error;

  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");

