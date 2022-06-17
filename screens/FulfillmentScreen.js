
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function FulfillmentScreen() {
  return (
    <View style={styles.container}>
      <Text>hello world from FulfillmentScreen</Text>
      <StatusBar style="auto"/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
