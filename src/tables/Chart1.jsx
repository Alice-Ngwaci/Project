import React, { Component } from "react";
import Chart from "react-apexcharts";

import {

  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn

}
from 'mdb-react-ui-kit';

class App extends Component {

  constructor(props) {
    super(props);

    this.updateCharts = this.updateCharts.bind(this);

    this.state = {
      optionsMixedChart: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "50%"
          }
        },
        stroke: {
          width: [4, 0, 0]
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        markers: {
          size: 6,
          strokeWidth: 3,
          fillOpacity: 0,
          strokeOpacity: 0,
          hover: {
            size: 8
          }
        },
        yaxis: {
          tickAmount: 5,
          min: 0,
          max: 100
        }
      },
      seriesMixedChart: [
        {
          name: "series-1",
          type: "line",
          data: [30, 40, 25, 50, 49, 21, 70, 51]
        },
        {
          name: "series-2",
          type: "column",
          data: [23, 12, 54, 61, 32, 56, 81, 19]
        },
        {
          name: "series-3",
          type: "column",
          data: [62, 12, 45, 55, 76, 41, 23, 43]
        }
      ],
      optionsRadial: {
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -20,
                show: true,
                color: "#888",
                fontSize: "13px"
              },
              value: {
                formatter: function (val) {
                  return val;
                },
                color: "#111",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Percent"]
      },
      seriesRadial: [76],
      optionsBar: {
        chart: {
          stacked: true,
          stackType: "100%",
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 0
        },
        xaxis: {
          categories: ["Fav Color"],
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        fill: {
          opacity: 1,
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.35,
            gradientToColors: undefined,
            inverseColors: false,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [90, 0, 100]
          }
        },

        legend: {
          position: "bottom",
          horizontalAlign: "right"
        }
      },
      seriesBar: [
        {
          name: "blue",
          data: [32]
        },
        {
          name: "green",
          data: [41]
        },
        {
          name: "yellow",
          data: [12]
        },
        {
          name: "red",
          data: [65]
        }
      ]
    };
  }

  
  updateCharts() {
    
    const max = 90;
    const min = 30;
    const newMixedSeries = [];
    const newBarSeries = [];

    this.state.seriesMixedChart.forEach((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      newMixedSeries.push({ data: data, type: s.type });
    });

    this.state.seriesBar.forEach((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (180 - min + 1)) + min;
      });
      newBarSeries.push({ data, name: s.name });
    });

    this.setState({
      seriesMixedChart: newMixedSeries,
      seriesBar: newBarSeries,
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50]
    });
  }

  render() {

    return (

    <MDBContainer className="my-1" style={{width: '730px', paddingRight: '50px'}} >
      
    <MDBCard>
   
    <MDBCardBody>

    <div className='d-flex flex-row mt-1 mb-3' style={{fontSize: 10, justifyContent: 'space-between'}}>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="p fw-bold mt-2">MHASIBU SACCO</span>

              <a href="https://centrinoprojects.sharepoint.com/sites/EBOARD/Board%20Documents/">
              <MDBBtn
                style={{
                backgroundColor: 'Info',
                float: 'right',
                marginTop: '-5px'
                }}
                rounded
                size="sm"
              >

              <MDBIcon fas icon="folder"  className="me-2" ></MDBIcon>
                Share Files
              </MDBBtn>
              </a>
              </div>
          

    <div className="app">
        <div className="row">
          <div className="col mixed-chart">
            <Chart
              options={this.state.optionsMixedChart}
              series={this.state.seriesMixedChart}
              type="line"
              width="600"
            />
          </div>

        </div>

        <div className="row">
          <p className="col" style={{marginLeft: '70%'}}>
            <MDBBtn onClick={this.updateCharts}>Next</MDBBtn>
          </p>
        </div>
      </div>

    </MDBCardBody>

    </MDBCard>

    </MDBContainer>

      
    );
  }
}

export default App;
