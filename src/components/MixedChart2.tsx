import React, { useEffect, useRef } from 'react';
import { styled } from '@superset-ui/core';
import * as echarts from 'echarts';

// Styled component for your chart container
const Styles = styled.div`
  height: 100%;
  width: 100%;
`;

export default function MixedChart2({ data, height, width }: any) {

    console.log("data====>", { data });


    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const option = {
                dataset: {
                  source: [
                    ['score', 'amount', 'product'],
                    [89.3, 58212, 'Matcha Latte'],
                    [57.1, 78254, 'Milk Tea'],
                    [74.4, 41032, 'Cheese Cocoa'],
                    [50.1, 12755, 'Cheese Brownie'],
                    [89.7, 20145, 'Matcha Cocoa'],
                    [68.1, 79146, 'Tea'],
                    [19.6, 91852, 'Orange Juice'],
                    [10.6, 101852, 'Lemon Juice'],
                    [32.7, 20112, 'Walnut Brownie']
                  ]
                },
                grid: { containLabel: true },
                xAxis: { name: 'amount' },
                yAxis: { type: 'category' },
                visualMap: {
                  orient: 'horizontal',
                  left: 'center',
                  min: 10,
                  max: 100,
                  text: ['High Score', 'Low Score'],
                  // Map the score column to color
                  dimension: 0,
                  inRange: {
                    color: ['#65B581', '#FFCE34', '#FD665F']
                  }
                },
                series: [
                  {
                    type: 'bar',
                    encode: {
                      // Map the "amount" column to X axis.
                      x: 'amount',
                      // Map the "product" column to Y axis
                      y: 'product'
                    }
                  }
                ]
              };

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
                Mixed Chart
            </div>

            <Styles ref={chartRef} style={{ height, width }} />
        </div>
    );
}
