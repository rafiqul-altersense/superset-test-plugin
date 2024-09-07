import React, { useEffect, useRef } from 'react';
import { styled } from '@superset-ui/core';
import * as echarts from 'echarts';

// Styled component for your chart container
const Styles = styled.div`
  height: 100%;
  width: 100%;
`;

export default function SeriesLayout({ data, height, width }: any) {

    console.log("data====>", { data });


    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const option = {
                legend: {},
                tooltip: {},
                dataset: {
                  source: [
                    ['product', '2012', '2013', '2014', '2015'],
                    ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
                    ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
                    ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
                  ]
                },
                xAxis: [
                  { type: 'category', gridIndex: 0 },
                  { type: 'category', gridIndex: 1 }
                ],
                yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
                grid: [{ bottom: '55%' }, { top: '55%' }],
                series: [
                  // These series are in the first grid.
                  { type: 'bar', seriesLayoutBy: 'row' },
                  { type: 'bar', seriesLayoutBy: 'row' },
                  { type: 'bar', seriesLayoutBy: 'row' },
                  // These series are in the second grid.
                  { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                  { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                  { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                  { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
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
                Series Layout
            </div>

            <Styles ref={chartRef} style={{ height, width }} />
        </div>
    );
}
