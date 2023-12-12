const renderCharts = () => {
    let choice = d3.select('select').node().value;

    d3.json(url).then(data => {
        // filteredData
        x = data;
        [... new Set(x.map(obj=>obj.Sex))].forEach(gen => {
            d3.select('#select').append('option').text(gen)
        });

        
        filteredData = data.find(obj => obj.Country == choice);

        console.log(filteredData);

        // metadata
        d3.select('#metadata').html('');
        Object.entries(filteredData).forEach(([key, val]) => {
            d3.select('#metadata').append('h5').text(`${key.toLocaleUpperCase()}: ${val?.$oid ? val?.$oid : val}`);
        });

        // maps
        var data = [{
            type: 'scattergeo',
            mode: 'markers',
            // locations: ['FRA', 'DEU', 'RUS', 'ESP'],
            locations: ['usa'],
            marker: {
                size: [20, 30, 15, 10],
                color: [10, 20, 40, 50],
                cmin: 0,
                cmax: 50,
                colorscale: 'Greens',
                colorbar: {
                    title: 'Some rate',
                    ticksuffix: '%',
                    showticksuffix: 'last'
                },
                line: {
                    color: 'black'
                }
            },
            name: 'europe data'
        }];

        var layout = {
            'geo': {
                // 'scope': 'europe',
                // 'scope': 'france',
                'resolution': 500,

            }
        };

        Plotly.newPlot('map', data, layout);

// bar chart
var data = [
    {
      x: [filteredData.Country],
      y: [filteredData['Age Expectancy']],
      type: 'bar'
    }
  ];

  var layout = {
    title: 'Life Expentency'
  }
  
  Plotly.newPlot('bar', data, layout);
  

    });
};

const url = "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/LifeExpectancy.json";

d3.json(url).then(data => {
    x = data;

    data.map(obj => obj.Country).forEach(loc => {
        d3.select('select').append('option').text(loc);
    });

    renderCharts();
});

d3.select('select').on('change', renderCharts)

