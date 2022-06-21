import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function HeaderNavigation({navigation, title}) {
  return (
    <View style={styles.header}>
      <View style={{ flex: 0.1 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icons/arrow-back.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.9 }}>
        <Text style={{textAlign: 'center', fontSize: 26}}>{title}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    zIndex: 99,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center'
  },
  backButton: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
