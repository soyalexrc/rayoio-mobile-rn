import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function OrderItemSlotBox({element}) {
  return (
    <>
      <View>
        <View style={{justifyContent: 'center', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
          {
            element.item.imageUrl ?
              (
                <Image
                  style={{width: 50, height: 50, marginRight: 10}}
                  resizeMode='contain'
                  source={{uri: element.item.imageUrl}}
                />
              ) : (
                <Image
                  style={{width: 50, height: 50, marginRight: 10}}
                  resizeMode='contain'
                  source={require('../../assets/images/no-imagepng.png')}
                />
              )
          }
          <Text style={{ fontSize: 24 }}>{element.item.itemName}</Text>
        </View>
      </View>
      {
        element.slot.length > 0 && element.slot.map(slot => (
          <TouchableOpacity style={styles.button} key={slot._id}>
            <Image
              style={{width: 50, height: 50}}
              resizeMode='contain'
              source={{uri: slot.imageUrl}}
            />
            <View style={{marginHorizontal: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}> {slot.nameSlot}</Text>
              <Text style={{fontSize: 16}}>Cliente: {slot.nameClient}</Text>
              <Text style={{fontSize: 16}}>Cantidad: {slot.amount}</Text>
              <Text style={{fontSize: 16}}>Ultimo update: {slot.userMail}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
      {
        element.slot.length < 1 && (
          <Text style={{ textAlign: 'center', }}>No Slots para este item...</Text>
        )
      }
    </>

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
