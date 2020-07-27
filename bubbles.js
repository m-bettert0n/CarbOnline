export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# CarbOnline Dummy Data`
)});

  main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","DOM","color","format"], function(pack,data,d3,width,height,DOM,color,format)
{
  const root = pack(data);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

  const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  leaf.append("circle")
      .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("r", d => d.r)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(d.data.group));

  leaf.append("clipPath")
      .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
    .append("use")
      .attr("xlink:href", d => d.leafUid.href);

  leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d);

  leaf.append("title")
      .text(d => `${d.data.title === undefined ? "" : `${d.data.title}
`}${format(d.value)}`);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", function(){return(
[
{name: 'Google', value: 190},
{name:'YouTube', value: 12},
{name: 'Facebook', value: 190},
{name:'Yahoo!', value: 12},
{name: 'Wikipedia', value: 190},
{name:'Amazon', value: 12},
{name: 'Windows Live', value: 190},
{name:'Reddit', value: 12},
{name: 'Netflix', value: 190},
{name:'Instagram', value: 12},
{name: 'Pinterest', value: 190},
{name:'Twitch', value: 12},
{name: 'Bing', value: 190},
{name:'Twitter', value: 12},
{name: 'Stack Overflow', value: 190},
{name:'eBay', value: 12},
{name: 'Seamless', value: 190},
{name:'HBO', value: 12},
{name: 'BBC News', value: 190},
{name:'Zoom Video Communications', value: 12},
{name: 'The Guardian', value: 190},
{name:'Blogspot', value: 12}
]
)});


  main.variable(observer("pack")).define("pack", ["d3","width","height"], function(d3,width,height){return(
data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
  (d3.hierarchy({children: data})
    .sum(d => d.value))
)});


  main.variable(observer("width")).define("width", function(){return(
932
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
