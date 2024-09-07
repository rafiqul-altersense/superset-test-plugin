import React, { useEffect, useRef } from 'react';
import { styled } from '@superset-ui/core';
import * as echarts from 'echarts';

// Styled component for your chart container
const Styles = styled.div`
  height: 100%;
  width: 100%;
`;

export default function DemoChart1({ data, height, width }:any) {
  console.log("data====>", { data });
  const level = data?.map((item:any) => item?.date_last_updated) || []
  const value = data?.map((item:any) => item?.["COUNT(clinical_stage)"]) || []
  console.log({
    level,
    value
  });


  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: 'axis', // Displays tooltip when hovering on the axis
          axisPointer: {
            type: 'cross' // Crosshair to make it easier to trace the axis
          }
        },
        xAxis: {
          type: 'category',
          data: level
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: value,
            type: 'line',
            smooth: true
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
        Hello World This is Demo Chart 1, This chart of showing the data of Covid 19 Vaccines.
      </div>

      <Styles ref={chartRef} style={{ height, width }} />
    </div>
  );
}
