import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function OrderBox(item, fn) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => fn(item.item)}>
      <View>
        <Image
          style={{width: 50, height: 50}}
          resizeMode='contain'
          source={{uri: item.item.urlImageClient}}
        />
        <Text style={{ fontSize: 14, textAlign: 'center' }}>{item.item.nameClient}</Text>
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{item.item.ff_orderId}</Text>
          <Text style={{fontSize: 16}}>Items {item.item.itemCount}</Text>
        </View>
        <Text style={{fontSize: 16}}>{item.item.dateCreatedOrder}</Text>
        <Text style={{fontSize: 16}}>{item.item.task.name}</Text>
        <Text style={{fontSize: 16}}>{item.item.task.address.substring(0, 50).concat('...')}</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.item.task.state} - {item.item.task.country}</Text>
        <View style={styles.status}>
          <View
            style={{
              padding: 5,
              borderRadius: 15,
              backgroundColor: item.item.ff_statusOrder === '6273fa2fc78ce7931907bc64' ?
                '#f25c22' : item.item.ff_statusOrder === '6273fa2fc78ce7931907bc65' ?
                  '#f7ac06' : 'green'
            }}
          >
            <Text style={{ color: '#fff' }}> {item.item.ff_nameStatus}</Text>
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
    marginHorizontal: 20,
    paddingHorizontal: 30,
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
