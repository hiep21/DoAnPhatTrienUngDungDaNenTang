import React, { useEffect,useState } from 'react';
import { View, Text, Alert, Button, StyleSheet, TouchableOpacity, Image, TextInput, AppState } from 'react-native';
import { LineChart, BarChart,PieChart } from 'react-native-chart-kit';
import { UpdateStateLogin } from '../../services/todo';
import { GetUserBuyGameByDayAndMonth, GetGameByDayAndMonth } from '../../services/Game';
import { getAccountByDayAndMonth } from '../../services/todo';


const ChartComponent = ({ navigation }: any) => {
  const username = navigation.getParam("username")
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const month = "12"; // Replace with the actual month
  const year = "2023";
  const [allMonthsDataUserBuyGame, setAllMonthsDataUserBuyGame] = useState<number[]>();
  const [allMonthsDataGame, setAllMonthsDataGame] = useState<number[]>();
  const [allMonthsDataAccount, setAllMonthsDataAccount] = useState<number[]>();
  const loadTasks = async () => {

    setRefreshing(true)
    try {
      const dataForAllMonthsUserBuyGame = [];
      for (let i = 1; i <= 12; i++)
      {
        const response0 = await GetUserBuyGameByDayAndMonth(i.toString(), year)
        const apiData0 = response0.data;
        const dataLength0 = apiData0 ? apiData0.length : 0;
        //console.log(apiData)
        dataForAllMonthsUserBuyGame.push(dataLength0);
      }
      console.log(dataForAllMonthsUserBuyGame)
      setAllMonthsDataUserBuyGame(dataForAllMonthsUserBuyGame);

      const dataForAllMonthsAccount = [];
      for (let i = 1; i <= 12; i++)
      {
        const response1 = await getAccountByDayAndMonth(i.toString(), year)
        const apiData1 = response1.data;
        const dataLength1 = apiData1 ? apiData1.length : 0;
        //console.log(apiData)
        dataForAllMonthsAccount.push(dataLength1);
      }
      console.log(dataForAllMonthsAccount)
      setAllMonthsDataAccount(dataForAllMonthsAccount);
        
      const dataForAllMonthsGame = [];
      for (let i = 1; i <= 12; i++)
      {
        const response2 = await GetGameByDayAndMonth(i.toString(), year)
        const apiData2 = response2.data;
        const dataLength2 = apiData2 ? apiData2.length : 0;
        //console.log(apiData)
        dataForAllMonthsGame.push(dataLength2);
      }
      console.log(dataForAllMonthsGame)
      setAllMonthsDataGame(dataForAllMonthsGame);

    } catch (err: any) {
        const errorMessage = err.response
        alert(errorMessage)
    }
    setRefreshing(false)
  }
  // const loadAllMonthsData = async () => {
  //   const dataForAllMonths = [];

  //   for (let month = 1; month <= 12; month++) {
  //     const monthData = await loadTasks(month, 2023); // Change the year if needed

  //     if (monthData != null) {
  //       dataForAllMonths.push(monthData);
  //     }
  //     console.log(allMonthsData)
  //   }
  // };
  const data = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        //data: [0, 4, 1, 5, 0, 3, 3, 2, 3, 1, 0, 4], // Dữ liệu doanh thu (ví dụ)
        data: allMonthsDataUserBuyGame || new Array(12).fill(0),
        color: (opacity = 0) => `rgba(0, 0, 255, ${opacity})`, // Màu của cột (màu xanh)
        label: 'Doanh thu',
      },
      {
        data: allMonthsDataAccount || new Array(12).fill(0), // Dữ liệu số lượng khách hàng (ví dụ)
        color: (opacity = 0) => `rgba(255, 0, 0, ${opacity})`, // Màu của cột (màu đỏ)
        label: 'Số lượng khách hàng',
      },
      {
        data: allMonthsDataGame || new Array(12).fill(0), // Dữ liệu số lượng khách hàng (ví dụ)
        color: (opacity = 0) => `rgba(0, 255, 0, ${opacity})`, // Màu của cột (màu xanh lá cây)
        label: 'Số lượng khách hàng',
      },
    ],
  };
  const updateState = async (result: boolean) => {

    try {
      await UpdateStateLogin({
        username: username,
        password: "......",
        checkOnline: result
      })
      console.log("Success")
    } catch (error: any) {
      console.log(error.response.data)
    }
  }
  const handleAppStateChange = (AppState: any) => {
    if (AppState === 'background' || AppState === 'inactive') {
      updateState(false)
    }
    else {
      updateState(true)
    }
  };
  useEffect(() => {
    loadTasks();
    AppState.addEventListener('change', handleAppStateChange);
  }, [username])
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
          <Text style={styles.text}>Số lượng tài khoản</Text>
        </View>
        <View style={styles.describeGame}>
          <TouchableOpacity style={styles.button2}></TouchableOpacity>
          <Text style={styles.text}>Số lượng khách hàng mua Game</Text>
        </View>
        <View style={styles.describeGame}>
          <TouchableOpacity style={styles.button3}></TouchableOpacity>
          <Text style={styles.text}>Số lượng Game</Text>
        </View>

      </View>
      <View style={styles.container}>
        <LineChart
          data={data}
          width={350}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
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
    paddingTop: 20,
    width: "100%",

  },


  bieudo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30


  },
  user: {
    flexDirection: 'row',
    marginLeft: "20%",

  },
  body: {
    //backgroundColor: "#7FFF00",
    justifyContent: 'center',

  },
  describeGame: {

    height: 17,
    //alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 17,
    marginHorizontal: 20,

  },
  button1: {
    width: 20,
    height: 20,
    backgroundColor: "red"
  },
  button2: {
    width: 20,
    height: 20,
    backgroundColor: "blue"
  },
  button3: {
    width: 20,
    height: 20,
    backgroundColor: "#7FFF00"
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


  text: {
    paddingLeft: 10
  }
})

export default ChartComponent;
