import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { styled } from '@superset-ui/core';

// Styled component for your chart container
const Styles = styled.div`
  height: 100%;
  width: 100%;
`;

export const LineRace = ({ data,height, width }:any) => {
  const chartRef = useRef(null);
  const generateDummyData = () => {
    const t_data:any = [];
    const countries = ['Germany', 'France', 'Italy', 'Spain', 'Poland', 'Russia', 'Finland', 'United Kingdom', 'Norway', 'Iceland'];
    const yearStart = 1950;
    const numEntries = 100; // Total number of entries
    const entriesPerCountry = numEntries / countries.length;
    const incomeBase = 5000; // Base income to vary from
  
    countries.forEach(country => {
      for (let i = 0; i < entriesPerCountry; i++) {
        const year = yearStart + i; // Increment year for each entry
        const income = incomeBase + Math.floor(Math.random() * 10000); // Random income between 5000 and 15000
        t_data.push({ Year: year, Country: country, Income: income });
      }
    });
  
    return t_data;
  }
  const initialData = generateDummyData();

  useEffect(() => {
    if (!initialData || initialData.length === 0) return;

    const countries = [
      'Finland',
      'France',
      'Germany',
      'Iceland',
      'Norway',
      'Poland',
      'Russia',
      'United Kingdom'
    ];

    const datasetWithFilters:any = [];
    const seriesList:any = [];

    echarts.util.each(countries, function (country) {
      const datasetId = 'dataset_' + country;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1950 },
              { dimension: 'Country', '=': country }
            ]
          }
        }
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: country,
        endLabel: {
          show: true,
          formatter: function (params:any) {
            console.log("params====",params);
            
            // Assuming 'Income' is the second and 'Year' is the first item in the array.
            return `${params?.data?.Country}: ${params?.data?.Income}`;
            // return params?.value?.Country + ': ' + params?.value?.Income;
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        emphasis: {
          focus: 'series'
        },
        encode: {
          x: 'Year',
          y: 'Income',
          label: ['Country', 'Income'],
          itemName: 'Year',
          tooltip: ['Income']
        }
      });
    });

    const option = {
      animationDuration: 10000,
      dataset: [
        {
          id: 'dataset_raw',
          source: initialData
        },
        ...datasetWithFilters
      ],
      title: {
        text: 'Income of Selected Countries since 1950'
      },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle'
      },
      yAxis: {
        name: 'Income'
      },
      grid: {
        right: 140
      },
      series: seriesList
    };

    // Initialize chart
    const myChart = echarts.init(chartRef.current);
    myChart.setOption(option);

    // Cleanup function
    return () => {
      myChart.dispose();
    };
  }, [height, width]);  // Removed 'data' from dependency array as it's not being used

  return (
    <div>
      <div style={{
          height: "20px",
          padding: "20px"
      }}>
         Line Race
      </div>

      <Styles ref={chartRef} style={{ height, width }} />
    </div>
  );
};
