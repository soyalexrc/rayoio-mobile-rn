import {StyleSheet, ScrollView, View, ActivityIndicator} from "react-native";
import HeaderNavigation from "../components/HeaderNavigation";
import useConsultSlots from "../hooks/useConsultSlots";
import OrderItemSlotBox from "../components/orders/OrderItemSlotBox";
import {useEffect} from "react";

export default function OrderDetailSlotsScreen({navigation, route}) {
  const {orderSlotsLoading, orderSlotsError, orderSlotsData, getSlotsOrder, indicator} = useConsultSlots()



  useEffect(() => {
    return navigation.addListener('focus', (event) => {
      getSlotsOrder({idOrder: route.params.idOrder})
    });
  }, [navigation])
  return (
    <View style={styles.container}>
      <HeaderNavigation navigation={navigation} title='Disponibilidad en slots'/>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      </View>
      {
        !orderSlotsLoading && orderSlotsData && orderSlotsData.length > 0 &&
        <View style={styles.list}>
          <ScrollView>
            {
              orderSlotsData.map((item, index) => (
                <OrderItemSlotBox element={item} key={index * 3}/>
              ))
            }
          </ScrollView>
        </View>
      }
      {
        orderSlotsLoading &&
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' color='#311def' />
        </View>
      }


    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 20,
    height: 630
  }
});
