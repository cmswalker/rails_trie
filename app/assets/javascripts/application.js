// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require D3/d3.min.js
//= require angular/angular.min.js
//= require angular-ui-router/release/angular-ui-router.js
//= require angular-animate/angular-animate.min.js
//= require_tree .




//BEGIND3

alert('doingd3');
go();

setTimeout(function () {go()}, 1000);

function go() {
console.log('inside go');

var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
    .range([0, radius]);

var color = d3.scale.category20c(); 

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
    .sort(null)
    .value(function(d) { return 1; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });


  d3.json("/charts/6.json", function(error, root) {
    var g = svg.selectAll("g")
        .data(partition.nodes(root[0]))
      .enter().append("g");

    d3.selectAll("input").on("change", function change() {
      var value = this.value;
      if (value === "count") {
        //reset somewher
      }
    });

    var path = g.append("path")
      .attr("d", arc)
      .style("fill", 
      	function(d) { 
      		// if (  color((d.children ? d : d.parent).name) === undefined ) {
      			//return color((d.children ? d : d.parent).name);
      			return color((d.parent ? d.parent.name : d.name))
      		//}
        })
      .on("click", click);

    var text = g.append("text")
      .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
      .attr("x", function(d) { return y(d.y); })
      .attr("dx", "6") // margin
      .attr("dy", ".35em") // vertical-align
      .text(function(d) { return d.name; })
      //REMOVE initial text for all fields
      .attr("opacity", function(d) {
        if (!d.children) {
          return 0;
        }
      })

    function click(d) {
      // fade out all text elements

      // stop root from regenerating
      // console.log(this);
      // if (this.parentNode.textContent === "Dranks") {
      //   return
      // }
      text.transition().attr("opacity", 0);

      path.transition()
        .duration(750)
        .attrTween("d", arcTween(d))
        .each("end", function(e, i) {
            // check if the animated element's data e lies within the visible angle span given in d
            if (e.x >= d.x && e.x < (d.x + d.dx)) {
              // get a selection of the associated text element
              var arcText = d3.select(this.parentNode).select("text");
              // fade in the text element and recalculate positions
              arcText.transition().duration(750)
                .attr("opacity", 1)
                .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
                .attr("x", function(d) { return y(d.y); });
            }
        });
    }
  });
  ///END GET


d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {
  return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}

}

//////
//END D3






