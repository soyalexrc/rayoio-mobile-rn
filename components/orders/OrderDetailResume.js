import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function OrderDetailResume({item}) {
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
          {/*<Text style={{fontSize: 16}}>Items {item.itemCount}</Text>*/}
        </View>
        <Text style={{fontSize: 16}}>{item.dateCreatedOrder}</Text>
        <Text style={{fontSize: 16}}>{item.task.name}</Text>
        {/*<Text style={{fontSize: 16}}>{item.task.address.substring(0, 50).concat('...')}</Text>*/}
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.task.state} - {item.task.country}</Text>
        {/*<View style={styles.status}>*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      padding: 5,*/}
        {/*      borderRadius: 15,*/}
        {/*      backgroundColor: item.ff_statusOrder === '6273fa2fc78ce7931907bc64' ?*/}
        {/*        '#f25c22' : item.ff_statusOrder === '6273fa2fc78ce7931907bc65' ?*/}
        {/*          '#f7ac06' : 'green'*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Text style={{ color: '#fff' }}> {item.ff_nameStatus}</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
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
  }
});
