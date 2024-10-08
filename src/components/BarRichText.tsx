import React, { useEffect, useRef } from 'react';
import { styled } from '@superset-ui/core';
import * as echarts from 'echarts';

// Styled component for your chart container
const Styles = styled.div`
  height: 100%;
  width: 100%;
`;

export default function BarRichText({ data, height, width }: any) {

    console.log("data====>", { data });


    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const option =  {
              title: {
                text: 'Weather Statistics'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['City Alpha', 'City Beta', 'City Gamma']
              },
              grid: {
                left: 100
              },
              toolbox: {
                show: true,
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'value',
                name: 'Days',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              yAxis: {
                type: 'category',
                inverse: true,
                data: ['Sunny', 'Cloudy', 'Showers'],
                axisLabel: {
                  formatter: function (value:any) {
                    return '{' + value + '| }\n{value|' + value + '}';
                  },
                  margin: 20,
                  rich: {
                    value: {
                      lineHeight: 30,
                      align: 'center'
                    },
                    Sunny: {
                      height: 40,
                      align: 'center',
                      backgroundColor: {
                        image: "https://www.echartsjs.com/zh/images/favicon.png"
                      }
                    },
                    Cloudy: {
                      height: 40,
                      align: 'center',
                      backgroundColor: {
                        image: "https://www.echartsjs.com/zh/images/favicon.png"
                      }
                    },
                    Showers: {
                      height: 40,
                      align: 'center',
                      backgroundColor: {
                        image: "https://www.echartsjs.com/zh/images/favicon.png"
                      }
                    }
                  }
                }
              },
              series: [
                {
                  name: 'City Alpha',
                  type: 'bar',
                  data: [165, 170, 30],
                  label:  {
                    show: true
                  },
                  markPoint: {
                    symbolSize: 1,
                    symbolOffset: [0, '50%'],
                    label: {
                      formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
                      backgroundColor: 'rgb(242,242,242)',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      padding: [4, 10],
                      lineHeight: 26,
                      // shadowBlur: 5,
                      // shadowColor: '#000',
                      // shadowOffsetX: 0,
                      // shadowOffsetY: 1,
                      position: 'right',
                      distance: 20,
                      rich: {
                        a: {
                          align: 'center',
                          color: '#fff',
                          fontSize: 18,
                          textShadowBlur: 2,
                          textShadowColor: '#000',
                          textShadowOffsetX: 0,
                          textShadowOffsetY: 1,
                          textBorderColor: '#333',
                          textBorderWidth: 2
                        },
                        b: {
                          color: '#333'
                        },
                        c: {
                          color: '#ff8811',
                          textBorderColor: '#000',
                          textBorderWidth: 1,
                          fontSize: 22
                        }
                      }
                    },
                    data: [
                      { type: 'max', name: 'max days: ' },
                      { type: 'min', name: 'min days: ' }
                    ]
                  }
                },
                {
                  name: 'City Beta',
                  type: 'bar',
                  label:  {
                    show: true
                  },
                  data: [150, 105, 110]
                },
                {
                  name: 'City Gamma',
                  type: 'bar',
                  label:  {
                    show: true
                  },
                  data: [220, 82, 63]
                }
              ]
            }

            myChart.setOption(option);
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            })



            return () => {
                myChart.dispose();
            };
        }
        return undefined;
    }, [height, width]);

    return (
        <div>
            <div style={{
                height: "20px",
                padding: "20px"
            }}>
                Bar Rich Text
            </div>

            <Styles ref={chartRef} style={{ height, width }} />
        </div>
    );
}
