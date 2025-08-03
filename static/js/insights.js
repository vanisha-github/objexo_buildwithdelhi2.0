// Pie Chart - Detection Breakdown
const ctxPie = document.getElementById('pieChart').getContext('2d');
new Chart(ctxPie, {
  type: 'doughnut',
  data: {
    labels: ['Toolboxes', 'Oxygen Cylinders', 'Fire Extinguishers'],
    datasets: [{
      data: [15, 12, 9],
      backgroundColor: ['#ff7043', '#42a5f5', '#ef5350']
    }]
  },
  options: {
    plugins: {
      legend: { labels: { color: 'white' } }
    }
  }
});

// Bar Chart - Detections Over Time
const ctxBar = document.getElementById('barChart').getContext('2d');
new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Detections',
      data: [5, 7, 6, 8, 4, 3, 5],
      backgroundColor: '#7a5fff'
    }]
  },
  options: {
    scales: {
      x: { ticks: { color: 'white' } },
      y: { ticks: { color: 'white' } }
    },
    plugins: {
      legend: { labels: { color: 'white' } }
    }
  }
});
// Heatmap (simulate object count per day/hour)
const ctxHeat = document.getElementById('heatmapChart').getContext('2d');
new Chart(ctxHeat, {
  type: 'matrix',
  data: {
    datasets: [{
      label: 'Detections',
      data: [
        {x: 0, y: 0, v: 2}, {x: 1, y: 0, v: 3}, {x: 2, y: 0, v: 1},
        {x: 0, y: 1, v: 5}, {x: 1, y: 1, v: 2}, {x: 2, y: 1, v: 4},
        {x: 0, y: 2, v: 3}, {x: 1, y: 2, v: 6}, {x: 2, y: 2, v: 2}
      ],
      backgroundColor(ctx) {
        const value = ctx.dataset.data[ctx.dataIndex].v;
        return value > 4 ? '#42a5f5' : value > 2 ? '#7a5fff' : '#ef5350';
      },
      width: 30,
      height: 30
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: 'white' },
        labels: ['Mon', 'Tue', 'Wed']
      },
      y: {
        ticks: { color: 'white' },
        labels: ['Morning', 'Afternoon', 'Evening']
      }
    }
  }
});

// Confusion Matrix (3x3: Toolbox, Oxygen, Fire)
const ctxConf = document.getElementById('confMatrixChart').getContext('2d');
new Chart(ctxConf, {
  type: 'matrix',
  data: {
    datasets: [{
      label: 'Confusion Matrix',
      data: [
        {x: 0, y: 0, v: 15}, {x: 1, y: 0, v: 2}, {x: 2, y: 0, v: 1},
        {x: 0, y: 1, v: 1}, {x: 1, y: 1, v: 12}, {x: 2, y: 1, v: 0},
        {x: 0, y: 2, v: 0}, {x: 1, y: 2, v: 1}, {x: 2, y: 2, v: 14}
      ],
      backgroundColor(ctx) {
        const value = ctx.dataset.data[ctx.dataIndex].v;
        return value > 10 ? '#42a5f5' : value > 5 ? '#7a5fff' : '#ef5350';
      },
      width: 40,
      height: 40
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: 'white' },
        labels: ['Toolbox', 'Oxygen', 'Fire']
      },
      y: {
        ticks: { color: 'white' },
        labels: ['Toolbox', 'Oxygen', 'Fire']
      }
    }
  }
});
