import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState, useEffect} from "react";
import useGetOrders from "../hooks/useGetOrders";
import {useSelector} from "../redux/store";
import OrderBox from "../components/orders/OrderBox";
import {useDispatch} from '../redux/store';
import {selectOrder} from '../redux/slices/orders';
import HeaderNavigation from "../components/HeaderNavigation";

export default function FulfillmentListScreen({navigation}) {
  const { data, error, getOrders, loading } = useGetOrders()
  const [code, setCode] = useState('')
  const loginData = useSelector(state => state.login.loginData)
  const dispatch = useDispatch();

  useEffect(() => {
    return navigation.addListener('focus', (event) => {
      getOrders({
        userMail: loginData.data[0].email,
        idWarehouse: loginData.data[0].idWarehouse
      })
    });
  }, [navigation])

  function handleSelectOrder(item) {
    dispatch(selectOrder(item))
    navigation.navigate('OrderDetail')
  }


  return (
    <View style={styles.container}>
      <HeaderNavigation navigation={navigation} title={`Ordenes de fulfillment (${data && data.length > 0 && data.length})`} />
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
              source={require('../assets/icons/search-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.list}>
        {
          loading &&
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#311DEF" />
          </View>
        }
        {
          !loading && data && data.length > 0 &&
          <FlatList
            data={data}
            renderItem={(item) => OrderBox(item, handleSelectOrder)}
            keyExtractor={item => item._id}
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