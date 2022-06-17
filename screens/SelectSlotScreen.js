import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList} from "react-native";
import {getSlotsByWarehouse, selectSlot} from '../redux/slices/slots';
import {useDispatch, useSelector} from '../redux/store';
import {useEffect} from 'react';

const slots = [
  {id: 1, title: 'Cliente'},
  {id: 2, title: 'Cliente'},
  {id: 3, title: 'Cliente'},
  {id: 4, title: 'Cliente'},
  {id: 5, title: 'Cliente'},
  {id: 6, title: 'Cliente'},
  {id: 7, title: 'Cliente'},
  {id: 8, title: 'Cliente'},
  {id: 9, title: 'Cliente'},
  {id: 10, title: 'Cliente'},
]


export default function SelectSlotScreen({navigation}) {
  const dispatch = useDispatch();
  const {slots, isLoading} = useSelector(state => state.slots);
  const {loginData} = useSelector(state => state.login);



  const handleSelectClient = (val) => {
    dispatch(selectSlot(val));
    navigation.navigate('Scanner');
  }

  useEffect(() => {
    dispatch(getSlotsByWarehouse({
      idWarehouse: loginData.data[0].idWarehouse,
      tenant: loginData.data[0].tenant
    }))
  }, [])



  const renderItem = (slot) => {
    return (
      <TouchableOpacity style={styles.button}
                        onPress={() => handleSelectClient(slot.item)}
      >
        <Image
          style={{width: 50, height: 50}}
          resizeMode='contain'
          source={{uri: slot.item.imageUrl}}
        />
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{slot.item.name}</Text>
          <Text style={{fontSize: 18}}>{slot.item.petco001}</Text>
          {/*<Text style={{fontSize: 16}}>{slot.item.rut_customer}</Text>*/}
          <Text style={{fontSize: 16}}>Cantidad: {slot.item.amount}</Text>
        </View>
        <Text>{}</Text>

      </TouchableOpacity>

    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginRight: 50 }} onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icons/home.png')}
            resizeMode='contain'
            style={{width: 30,}}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 30}}>Seleccionar slot</Text>
      </View>
      <View style={styles.slots}>
        {isLoading && <Text>loading...</Text>}
        {
          !isLoading && slots &&
          <FlatList
            data={slots}
            renderItem={renderItem}
            keyExtractor={slot => slot._id}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slots: {
    marginTop: 20,
    height: 550
  },
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
