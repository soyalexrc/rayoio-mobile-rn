import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getSlotsByWarehouse, selectSlot} from '../redux/slices/slots';
import {useDispatch, useSelector} from '../redux/store';
import {useEffect} from 'react';
import SlotBox from "../components/SlotBox";

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


export default function SelectSlotRemoveScreen({navigation}) {
  const dispatch = useDispatch();
  const {slots, isLoading} = useSelector(state => state.slots);
  const {loginData} = useSelector(state => state.login);


  const handleSelectSlot = (val) => {
    dispatch(selectSlot(val));
    navigation.navigate('RemoveScanner');
  }

  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(getSlotsByWarehouse({
        idWarehouse: loginData.data[0].idWarehouse,
        tenant: loginData.data[0].tenant
      }))
    })
  }, [navigation])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/icons/arrow-back.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.9 }}>
          <Text style={{textAlign: 'center', fontSize: 30}}>Seleccionar slot</Text>
        </View>
      </View>
      <View style={styles.slots}>
        {isLoading && <Text>loading...</Text>}
        {
          !isLoading && slots &&
          <FlatList
            data={slots}
            renderItem={(slot) => SlotBox(slot, handleSelectSlot)}
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
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slots: {
    marginTop: 20,
    height: 550
  },
  button: {
    padding: 30,
    marginHorizontal: 20,
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
  backButton: {
    width: 35,
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

});
