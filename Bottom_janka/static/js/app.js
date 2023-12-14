const renderCharts = () => {
    let choice = d3.select('select').node().value;

    d3.json(url).then(data => {
        // filteredData
        x = data;
        [... new Set(x.map(obj=>obj.Sex))].forEach(gen => {
            d3.select('#select').append('option').text(gen)
        });

        
        filteredData = data.find(obj => obj.Country == choice);

        filteredData_2 = data.filter(obj => obj.Country == choice);
        console.log(filteredData_2)

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
            locations: ['ESP','GRC','DEU','RUS','LBR','ITA','AUS','USA','JPN','CHE','TCD','BRA'],
            marker: {
                size: [5, 5, 5, 25, 25, 15, 25, 35, 15, 15, 20, 20, 25],
                color: [15, 5, 20, 50, 50, 30, 20, 20, 20, 25, 60, 40],
                cmin: 70,
                cmax: 10,
                colorscale: 'Blues',
                colorbar: {
                    title: 'YEARS',
                    ticksuffix: '0',
                    showticksuffix: 'first'
                },
                line: {
                    color: 'black'
                }
            },
            name: 'Blue Zones'
        }];

        var layout = {
            'geo': {
                // 'scope': 'europe',
                // 'scope': 'france',
                // 'resolution': 500,

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
console.log(data)
    data.map(obj => obj.Country).forEach(loc => {
        d3.select('select').append('option').text(loc);
    });

    renderCharts();
});

d3.select('select').on('change', renderCharts)

