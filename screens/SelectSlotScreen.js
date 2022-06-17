import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getSlotsByWarehouse, selectSlot} from '../redux/slices/slots';
import {useDispatch, useSelector} from '../redux/store';
import {useEffect} from 'react';
import SlotBox from "../components/SlotBox";

export default function SelectSlotScreen({navigation}) {
  const dispatch = useDispatch();
  const {slots, isLoading} = useSelector(state => state.slots);
  const {loginData} = useSelector(state => state.login);


  const handleSelectSlot = (val) => {
    dispatch(selectSlot(val));
    navigation.navigate('Scanner');
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
    height: 630
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
  }

});
