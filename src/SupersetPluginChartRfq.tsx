import React from 'react';
import { SupersetPluginChartRfqProps } from './types';
import DemoChart1 from './components/DemoChart1';


export default function SupersetPluginChartRfq(props: SupersetPluginChartRfqProps) {
  const { data, height, width } = props;
  console.log("data====>", { data });
  return (
    // <SeriesLayout data={data} height={height} width={width} />
    // <MixedChart data={data} height={height} width={width} />
    // <BarRichText data={data} height={height} width={width} />
    // <LineRace data={data} height={height} width={width} />
    // <MixedChart2 data={data} height={height} width={width} />
    // <RadarChart data={data} height={height} width={width} />
    <DemoChart1 data={data} height={height} width={width} />
  );
}
