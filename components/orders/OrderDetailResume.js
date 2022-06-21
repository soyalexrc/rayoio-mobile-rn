import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import orderStatus from "../../utils/orderStatus";


export default function OrderDetailResume({item, fn}) {

  function handleColorStatus(status, type) {
    switch (status) {
      case orderStatus.assigned :
        return type === 'color' ? '#f25c22' : 'Assigned'
      case orderStatus.picking :
        return type === 'color' ? '#f7ac06' : 'Picking'
      case orderStatus.picked :
        return type === 'color' ? 'green' : 'Picked'
    }
  }

  return (
    <View style={styles.button}>
      <View>
        <Image
          style={{width: 50, height: 50}}
          resizeMode='contain'
          source={{uri: item.urlImageClient}}
        />
        <Text style={{ fontSize: 14, textAlign: 'center' }}>{item.nameClient}</Text>
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{item.ff_orderId}</Text>
          <View style={{ backgroundColor: handleColorStatus(item.ff_statusOrder, 'color'), padding: 5,  borderRadius: 10 }}>
            <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>{handleColorStatus(item.ff_statusOrder, 'text')}</Text>
          </View>
        </View>
        <Text style={{fontSize: 16}}>{item.dateCreatedOrder}</Text>
        <Text style={{fontSize: 16}}>{item.task.name}</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.task.state} - {item.task.country}</Text>
        <TouchableOpacity style={styles.actionButton} onPress={fn}>
          <Text style={{fontSize: 14, color: '#fff', textAlign: 'center'}}> Metadata</Text>
        </TouchableOpacity>
      </View>



    </View>
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
    borderRadius: 15,
    marginVertical: 10
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  actionButton: {
    marginTop: 5,
    backgroundColor: '#311DEF',
    width: 70,
    padding: 3,
  },
});
