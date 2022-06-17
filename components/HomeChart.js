import {StyleSheet, View, Dimensions} from "react-native";
import { LineChart } from 'react-native-chart-kit';

export default function HomeChart() {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ]
            }]
        }}
        width={Dimensions.get('window').width} // from react-native
        height={320}
        yAxisSuffix='k'
        yAxisInternal={1}
        chartConfir={{
          backgroundColor: '#FFF',
          backgroundGradientFrom: '#FFF',
          backgroundGradientTo: '#FFF',
          decimalPlaces: 2,
          color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
          labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
          strokeWidth: '2',
          stroke: 'red'
        }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40
  },
});
