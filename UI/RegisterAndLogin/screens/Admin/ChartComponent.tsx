import React from 'react';
import { View } from 'react-native';
import { LineChart,BarChart } from 'react-native-chart-kit';

const ChartComponent = () => {
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
    datasets: [
      {
        data: [30, 45, 28, 80, 99 ],
      },
    ],
  };
  

  return (
    <View>
      <BarChart
        data={data}
        width={300}
        height={200}
        yAxisLabel="Giá trị"
        yAxisSuffix="k"
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </View>
  );
};

export default ChartComponent;
