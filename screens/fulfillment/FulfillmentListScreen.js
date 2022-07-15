import {ActivityIndicator, FlatList, Image, StyleSheet, Alert, TextInput, TouchableOpacity, View} from "react-native";
import {useState, useEffect, useContext} from "react";
import OrderBox from "../../components/orders/OrderBox";
import {useDispatch} from '../../redux/store';
import {selectOrder} from '../../redux/slices/orders';
import HeaderNavigation from "../../components/HeaderNavigation";
import orderStatus from "../../utils/orderStatus";
import useVerifyProductExist from "../../hooks/useVerifyProductExist";
import useChangeOrderStatus from "../../hooks/useChangeOrderStatus";
import {AuthContext} from "../../context/auth/AuthContext";
import {AsyncAlert} from "../../utils/asyncALert";
import {FulfillmentContext} from "../../context/fulfillment/FulfillmentContext";

export default function FulfillmentListScreen({navigation}) {
  // const {data, error, getOrders, loading} = useGetOrders()
  const [code, setCode] = useState('')
  const {handleChangeStatus} = useChangeOrderStatus(() => navigation.navigate('OrderDetail'))
  const dispatch = useDispatch();
  const { authState } = useContext(AuthContext);
  const {  getOrders, loading, orders } = useContext(FulfillmentContext);

  console.log(orders.orders[0]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getOrders({
        userMail: authState.user.email,
        idWarehouse: authState.user.idWarehouse
      })
    });
  }, [navigation])

  async function handleSelectOrder(item) {
    if (item.ff_statusOrder === orderStatus.assigned) {
      const ask = await AsyncAlert('Comenzar picking?', 'Se cambiara el estado de la orden')
      if (ask) {
        await handleChangeStatus({
          idOrder: item._id,
          idStatus: orderStatus.picking
        })
      }
    } else {
      dispatch(selectOrder(item))
      navigation.navigate('OrderDetail')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <View style={{flex: 0.9}}>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder='Filtrar orden por codigo'
          />
        </View>
        <View style={{flex: 0.13}}>
          <TouchableOpacity style={styles.backButton} onPress={() => {}}>
            <Image
              source={require('../../assets/icons/search-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.list}>
        {
          loading &&
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='#311def' />
          </View>
        }
        {
          !loading && orders.orders && orders.orders.length > 0 &&
          <FlatList
            data={orders.orders}
            renderItem={(order) => OrderBox(order, handleSelectOrder)}
            keyExtractor={order => order._id}
          />
        }
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center'
  },
  list: {
    height: 530
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
  input: {
    height: 50,
    backgroundColor: '#fff',
    margin: 12,
    borderWidth: 0.2,
    borderRadius: 3,
    padding: 10,
  },
  searchBox: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
