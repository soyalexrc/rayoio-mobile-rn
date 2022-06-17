import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function ItemBox(item) {
  return (
    <TouchableOpacity style={styles.button} disabled>
      <Image
        style={{width: 50, height: 50}}
        resizeMode='contain'
        source={{uri: item.item.imageUrlSlot}}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}> {item.item.nameSlot}</Text>
        <Text style={{fontSize: 16}}>Cliente: {item.item.nameClient}</Text>
        <Text style={{fontSize: 16}}>Cantidad: {item.item.amount}</Text>
        <Text style={{fontSize: 16}}>Ultimo update: {item.item.userMail}</Text>
      </View>

    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginHorizontal: 20,
    padding: 30,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    marginVertical: 10
  }
});
