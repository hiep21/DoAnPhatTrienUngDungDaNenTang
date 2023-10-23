import React from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { LineChart,BarChart } from 'react-native-chart-kit';
const ChartComponent = () => {
  const data = {
    labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
    datasets: [
      {
        data: [20, 40, 60, 80, 100,39,94,47,28,65,93,65], // Dữ liệu doanh thu (ví dụ)
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Màu của cột (màu xanh)
        label: 'Doanh thu',
      },
      {
        data: [20, 25, 18, 30, 35,73,38,93,53,19,48,70], // Dữ liệu số lượng khách hàng (ví dụ)
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Màu của cột (màu đỏ)
        label: 'Số lượng khách hàng',
      },
    ],
  };


  return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={{
            textAlign: 'left',
            paddingLeft: 30,
            borderBottomWidth: 1,
            fontSize: 25,
            paddingTop: 30
            }}>Tổng quan</Text>
            <Text style={{
            textAlign: 'center',
            paddingLeft: 30,
            fontSize: 17,
            padding: 30
            }}>Tổng doanh thu và số lượng khách hàng trong năm 2023</Text>
            <View style={styles.describeGame}>
              <TouchableOpacity style={styles.button1}></TouchableOpacity>
              <Text style={styles.text}>Doanh thu</Text>
            </View>
            <View style={styles.describeGame}>
              <TouchableOpacity style={styles.button2}></TouchableOpacity>
              <Text style={styles.text}>Số lượng khách hàng</Text>
            </View>
            
        </View>
        <View style={styles.container}> 
          <LineChart
            data={data}
            width={350}
            height={200}
            yAxisLabel=""
            yAxisSuffix="$"
            fromZero
            chartConfig={{
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>
          
      </View>
  );
};
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop:20,
    width: "100%",
    
},


bieudo: {
    justifyContent: 'center',
    alignItems:'center',
    padding: 30
    

},
user: {
    flexDirection: 'row',
    marginLeft: "20%",
    
},
body: {
    //backgroundColor: "#7FFF00",
    justifyContent:'center',

},
describeGame: {

  height: 17,
  //alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: 17,
  marginHorizontal: 20,
  
},
button1:{
  width:20,
  height:20,
  backgroundColor: "red"
},
button2:{
  width:20,
  height:20,
  backgroundColor: "blue"
},
chartTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  margin: 10,
},
chart: {
  marginVertical: 20,
  borderRadius: 16,
},


text:{
  paddingLeft:10
}
})

export default ChartComponent;
