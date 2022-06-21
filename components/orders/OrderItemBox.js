import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function OrderItemBox({item, fn, index, length}) {
  return (
    <TouchableOpacity style={[styles.button, {marginBottom: index === length -1 ? 120 : 0}]} onPress={() => fn(item.item)}>
      <View>
        {
          item.imageUrl  ?
            (
              <Image
                style={{width: 50, height: 50}}
                resizeMode='contain'
                source={{uri: item.imageUrl}}
              />
            ) : (
              <Text>No image...</Text>
            )
        }
      </View>
      <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>{item.itemName}</Text>
        <Text style={{fontSize: 16}}>Codigo: {item.code}</Text>
        <Text style={{fontSize: 16}}>Cantidad: {item.amount}</Text>
        <Text style={{fontSize: 16}}>Cantidad Recogida: {item.amountpicked}</Text>
        <View style={styles.status}>
          <View
            style={{
              padding: 5,
              borderRadius: 15,
              backgroundColor: item.status === 'pending' ?
                '#f25c22' : 'green'
            }}
          >
            <Text style={{color: '#fff'}}> {item.status}</Text>
          </View>
        </View>
      </View>

    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 20,
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 10,
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
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
