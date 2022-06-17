import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function RemoveScreen() {
  return (
    <View style={styles.container}>
      <Text>hello world from RemoveScreen</Text>
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
