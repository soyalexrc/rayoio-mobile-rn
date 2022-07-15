import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import orderStatus from '../../utils/orderStatus';

export default function OrderBox(item, fn) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => fn(item.item)}>
      {/*<View>*/}
      {/*  <Image*/}
      {/*    style={{width: 50, height: 50}}*/}
      {/*    resizeMode='contain'*/}
      {/*    source={{uri: item.item.urlImageClient}}*/}
      {/*  />*/}
      {/*  <Text style={{ fontSize: 12, textAlign: 'center' }}>{item.item.nameClient}</Text>*/}
      {/*</View>*/}
      {/*<View style={{marginHorizontal: 20}}>*/}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: 'lightgray', padding: 10 }}>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#7a8ba3'}}>{item.item.ff_orderId}</Text>
            <View
              style={{
                padding: 5,
                backgroundColor: item.item.ff_statusOrder === orderStatus.assigned ?
                  '#fedee0' : item.item.ff_statusOrder === orderStatus.picking ?
                    '#6eafb4' : item.item.ff_statusOrder === orderStatus.picked ?
                      '#81b87b' : '#fff'
              }}
            >
              <Text
                style={{
                  color:item.item.ff_statusOrder === orderStatus.assigned ?
                    '#b88285' : item.item.ff_statusOrder === orderStatus.picking ?
                      '#c3f9fd' : item.item.ff_statusOrder === orderStatus.picked ?
                        '#dafcd3' : 'gray' ,
                  fontSize: 10 }}
              >
                {item.item.ff_nameStatus}
              </Text>
          </View>
          {/*<Text style={{fontSize: 12}}>Items {item.item.itemCount}</Text>*/}
        </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../assets/icons/calendar-icon.png')}
          style={{
            width: 15,
            height: 15,
            margin: 10
          }}
        />
        <Text style={{fontSize: 12}}>{item.item.dateCreatedOrder}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../assets/icons/location-icon.png')}
          style={{
            width: 15,
            height: 15,
            margin: 10
          }}
        />
        <Text style={{fontSize: 10, flex: 1, flexWrap: 'wrap'}}>{item.item.task.address}</Text>
      </View>
        {/*<Text style={{fontSize: 12, fontWeight: 'bold'}}>{item.item.task.state} - {item.item.task.country}</Text>*/}

      {/*</View>*/}

    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginHorizontal: 30,
    // paddingTop: 30,
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
    borderRadius: 5,
    marginVertical: 10
  },
  // status: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end'
  // }
});
