import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function SlotBox(slot, fn) {
  return (
    <TouchableOpacity style={styles.button}
                      onPress={() => fn(slot.item)}
    >
      <Image
        style={{width: 50, height: 50}}
        resizeMode='contain'
        source={{uri: slot.item.imageUrl}}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{slot.item.name}</Text>
        {/*<Text style={{fontSize: 16}}>{slot.item.rut_customer}</Text>*/}
        <Text style={{fontSize: 12}}>Items: {slot.item.amount}</Text>
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
