



// Accesses localStorage and creates array of data for d3 visualization
function allStorage() {
  let data = []

  let keys = Object.keys(localStorage);
  let i = keys.length;

  while ( i-- ) {
    let url = keys[i];
    let co2 = localStorage.getItem(keys[i])
    let newItem = {'url': url, 'co2': co2}
    data.push(newItem)
  }

  renderGraphView(data)
}

allStorage()


    function renderGraphView(nodes = []) {
      const height = window.innerHeight;
      const width = window.innerWidth;

      // Create the canvas
      d3.select("#main-content")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        //.style("margin-top", "-84px");

      const tooltip = d3
        .select("#main-content")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

      // Scale data
      const minDataPoint = d3.min(nodes, function(d) {
        return d.co2;
      });
      const maxDataPoint = d3.max(nodes, function(d) {
        return d.co2;
      });

      const linearScale = d3
        .scaleLinear()
        .domain([minDataPoint, maxDataPoint])
        .range([8, 100]);

      let newScaledData = nodes.map(node => ({
        ...node,
        radius: linearScale(node.co2)
      }));

      const color = d3.scaleOrdinal(["#b7e4c7","#95d5b2","#74c69d","#52b788","#40916c","#2d6a4f","#1b4332","#081c15"]);

      const simulation = d3
        .forceSimulation(newScaledData)
        .force("charge", d3.forceManyBody().strength(3))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "collision",
          d3.forceCollide().radius(function(d) {
            return d.radius + 5;
          })
        )
        .on("tick", make);

      function make() {
        const circles = d3
          .select("svg")
          .selectAll("circle")
          .data(newScaledData);

        circles
          .enter()
          .append("a")
          .append("circle")
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .merge(circles)
          .attr("fill", d => color(d.co2))
          .attr("r", d => d.radius)
          .attr("cx", d => Math.max(d.radius, Math.min(width - d.radius, d.x)))
          .attr("cy", d => Math.max(d.radius, Math.min(height - d.radius, d.y)))
          .style("cursor", "pointer");

        circles.on("mouseover", function(d) {
          // highlight circle on mouseover
          const circle = d3.select(this);
          circle.attr("stroke-width", 5);

          tooltip
            .html(d.url +
              "<br/> - <br/>CO2: " +
              d.co2 + "g")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("opacity", 0.9)
            .style("visibility", "visible");
        });

        circles.on("mouseout", function(d) {
          // hide tooltip
          tooltip.style("visibility", "hidden");
          // select circle and remove highlighted border
          const circle = d3.select(this);
          circle.attr("stroke-width", 1);
        });

        circles.exit().remove();
      }
    }


