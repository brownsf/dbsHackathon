<template>
  <div
    id="chart"
    class="chart-example"><svg/></div>
</template>

<script>
import * as d3 from 'd3';
import { mapGetters } from 'vuex';

export default {
  name: 'VueLineChart',
  data() {
    return {
      data: [99, 71, 78, 25, 36, 92],
      line: '',
    };
  },
  computed: {
    ...mapGetters(['getTopics', 'isAuth']),
  },
  watch: {
    getTopics(val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        d3.select('svg').remove();
        d3.select('#chart').append('svg');
        const chart = this.bubbleChart();
        d3
          .select('#chart')
          .datum(val.sort((a, b) => a.votes < b.votes))
          .call(chart);
      }
    },
  },
  mounted() {
    d3.select('svg').remove();
    d3.select('#chart').append('svg');
    const data = [{ name: 'a', votes: 1 }, { name: 'b', votes: 2 }];

    const chart = this.bubbleChart();
    d3
      .select('#chart')
      .datum(this.getTopics.sort((a, b) => a.votes < b.votes) || data)
      .call(chart);
  },
  created() {
    if (this.$store.getters.isAuth) {
      this.$store.dispatch('getAllTopics');
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    bubbleChart: () => {
      let width = 600;
      let height = 400;
      let columnForData = 'votes';

      function chart(selection) {
        const data = selection.datum();
        const div = selection;
        const svg = div.selectAll('svg');
        const simulation = d3
          .forceSimulation()
          // add nodes

          .nodes(data);

        // add forces
        // we're going to add a charge to each node
        // also going to add a centering force
        simulation

          .force('charge_force', d3.forceManyBody().strength(-20))
          .force('center_force', d3.forceCenter(width / 2, height / 2))
        ;

        svg.attr('width', width).attr('height', height);

        const tooltip = selection
          .append('div')
          .style('position', 'absolute')
          .style('visibility', 'hidden')
          .style('color', 'white')
          .style('padding', '8px')
          .style('background-color', '#626D71')
          .style('border-radius', '6px')
          .style('text-align', 'center')
          .style('font-family', 'monospace')
          .style('width', '400px')
          .text('');

        const colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
        const scaleRadius = d3
          .scaleLinear()
          .domain([
            d3.min(data, d => +d[columnForData]),
            d3.max(data, d => +d[columnForData]),
          ])
          .range([5, 50]);

        const node = svg
          .selectAll('circle')
          .data(data)
          .enter()
          .append('g');

        node
          .append('circle')
          .attr('r', d => scaleRadius(d[columnForData]))
          .style('fill', d => colorCircles(d[columnForData]))
          .on('mouseover', (d) => {
            tooltip.html(`${d.name}<br>${d[columnForData]} votes`);
            return tooltip.style('visibility', 'visible');
          })
          .on('mousemove', () =>
            tooltip
              .style('top', `${d3.event.pageY - 10}px`)
              .style('left', `${d3.event.pageX + 10}px`),
          )
          .on('mouseout', () => tooltip.style('visibility', 'hidden'));

        node
          .append('text')
          .attr('text-anchor', 'middle')
          .text(d => d.name);
        const radius = 15;

        function tickActions() {
          node
            .attr('cx', (d) => { d.x = Math.max(radius, Math.min(width - radius, d.x)); })
            .attr('cy', (d) => { d.y = Math.max(radius, Math.min(height - radius, d.y)); })

            .attr('transform', d => `translate(${d.x || 300},${d.y || 200})`,

            );
        }

        simulation.on('tick', tickActions);
      }

      chart.width = (value) => {
        if (!arguments.length) {
          return width;
        }
        width = value;
        return chart;
      };

      chart.height = (value) => {
        if (!arguments.length) {
          return height;
        }
        height = value;
        return chart;
      };

      chart.columnForData = (value) => {
        if (!arguments.columnForData) {
          return columnForData;
        }
        columnForData = value;
        return chart;
      };

      return chart;
    },
  },
};
</script>

