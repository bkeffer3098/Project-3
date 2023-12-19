const renderCharts = () => {
    let choice = d3.select('select').node().value;

    d3.json(url).then(data => {
        // filteredData
        x = data;
        [... new Set(x.map(obj=>obj.Sex))].forEach(gen => {
            d3.select('#select').append('option').text(gen)
        });

        
        filteredData = data.find(obj => obj.Country == choice);
        const renderCharts = () => {
            let choice = d3.select('select').node().value;
            console.log(choice)
            // d3.json(mergedJSON).then(data_fm => {
            //     //console.log(data_female)
        
            //     filtered_data_fm = data_fm.filter(obj => obj.Country == choice);
            //     console.log(filtered_data_fm)
            // })
        
            Promise.all([
                d3.json(female_url),
                d3.json(male_url)
            ]).then(function([data01, data02]){
            
              // manipulate data here
              // data01
              // data02
              //console.log(data01, data02)
              const mergedJSON = data01.concat(data02);
                console.log(mergedJSON)
                filtered_data_fm = mergedJSON.filter(obj => obj.Country == choice);
                console.log(filtered_data_fm)
        
                female_age_exp = filtered_data_fm[0]['Age Expectancy']
                male_age_exp = filtered_data_fm[1]['Age Expectancy']
          // Pie Chart
                var piedata = [{
                    values: [male_age_exp, female_age_exp],
                    labels: ['Male', 'Female'],
                    type: 'pie'
                  }];
                  
                  var pielayout = {
                    height: 400,
                    width: 500
                  };
                  
                  Plotly.newPlot('pie', piedata, pielayout);
        
        
                  var mapdata = [{
                    type: 'scattergeo',
                    mode: 'markers+text',
                    text: [
                        choice
                    ],
                    lon: [
                        filtered_data_fm[0]['Longitude']
                    ],
                    lat: [
                        filtered_data_fm[0]['Latitude']
                    ],
                    marker: {
                        size: 15,
                        color: [
                            '#bebada'
                        ],
                        line: {
                            width: 1
                        }
                    },
                    name: 'Location',
                    textposition: [
                        'top right', 'top left', 'top center', 'bottom right', 'top right',
                        'top left', 'bottom right', 'bottom left', 'top right', 'top right'
                    ],
                }];
                
                var maplayout = {
                    title: 'Location',
                    font: {
                        family: 'Droid Serif, serif',
                        size: 6
                    },
                    titlefont: {
                        size: 16
                    },
                    geo: {
                        //scope: 'north america',
                        resolution: 50,
                        lonaxis: {
                            'range': [-180, 180]
                        },
                        lataxis: {
                            'range': [-90, 90]
                        },
                        showrivers: true,
                        rivercolor: '#fff',
                        showlakes: true,
                        lakecolor: '#fff',
                        showland: true,
                        landcolor: '#EAEAAE',
                        countrycolor: '#d3d3d3',
                        countrywidth: 1.5,
                        subunitcolor: '#d3d3d3'
                    }
                };
                
                Plotly.newPlot('map', mapdata, maplayout);
                
                
                  
        
        
            })
        
        
        
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
        
                //Plotly.newPlot('map', data, layout);
        
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
        
        const url = "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/LifeExpectancy.json";
        
        const female_url = 'https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/female.json';
        const male_url = 'https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/male.json';
        //const mergedJSON = { ...female_url, ...male_url };
        
               
        d3.json(url).then(data => {
            x = data;
        console.log(data)
            data.map(obj => obj.Country).forEach(loc => {
                d3.select('select').append('option').text(loc);
            });
        
            renderCharts();
        });
        
        d3.select('select').on('change', renderCharts)
        
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

// "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/HALE_60_2019_Both.json";
const url = "https://raw.githubusercontent.com/bkeffer3098/Project-3/main/Resources/Final%20Data/LifeExpectancy.json";

d3.json(url).then(data => {
    x = data;
console.log(data)
    data.map(obj => obj.Country).forEach(loc => {
        d3.select('select').append('option').text(loc);
    });

    renderCharts();
});

d3.select('select').on('change', renderCharts)

