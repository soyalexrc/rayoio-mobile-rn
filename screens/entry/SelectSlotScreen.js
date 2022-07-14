import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {getSlotsByWarehouse} from '../../redux/slices/slots';
import {useDispatch, useSelector} from '../../redux/store';
import {useEffect, useContext} from 'react';
import SlotBox from "../../components/SlotBox";
import HeaderNavigation from "../../components/HeaderNavigation";
import {AuthContext} from "../../context/auth/AuthContext";
import {SlotsContext} from "../../context/slots/SlotsContext";

const heightScreen = Dimensions.get('window').height;

export default function SelectSlotScreen({navigation}) {
  const dispatch = useDispatch();
  // const {slots, isLoading} = useSelector(state => state.slots);
  const {loginData} = useSelector(state => state.login);
  const {authState} = useContext(AuthContext);
  const {selectSlot, slots, getSlots, loading} = useContext(SlotsContext);


  const handleSlotSelection = (val) => {
    console.log(val);
    selectSlot(val);
    // dispatch(selectSlot(val));
    // navigation.navigate('Scanner');
  }
  console.log('selectedSlot', slots.selectedSlot);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getSlots({
        idWarehouse: authState.user.idWarehouse,
        tenant: authState.user.tenant
      })
    })
  }, [navigation])

  function nextStep() {
    navigation.navigate('ScannerList')
  }

  function prevStep() {
    navigation.goBack();
  }


  return (
    <View style={styles.container}>
      <View style={{padding: 20, alignItems: 'center'}}>
        <Text style={{color: '#455C7E', fontSize: 16, fontWeight: 'bold'}}>Registrar nuevo producto</Text>
      </View>
      <View style={styles.slots}>
        {
          loading &&
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' color='#311def'/>
          </View>
        }
        {
          !loading && slots.slots &&
          <FlatList
            numColumns={2}
            data={slots.slots}
            renderItem={(slot) => SlotBox(slot, handleSlotSelection, slots.selectedSlot)}
            keyExtractor={slot => slot._id}
          />
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={{color: '#161070'}}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextStep}
            style={[styles.nextButton, { backgroundColor: slots.selectedSlot._id  ? '#311DEF' : 'lightgray' }]}>
            <Text style={{color: '#fff'}}>Siguiente</Text>
          </TouchableOpacity>
        </View>
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
  slots: {
    marginTop: 20,
    height: heightScreen * 0.65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextButton: {
    // flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 35,
    // backgroundColor: '#311DEF',
    color: '#fff',
  },
  backButton: {
    backgroundColor: '#EAE8FC',
    padding: 20,
    margin: 10,
    borderRadius: 35,
    color: '#161070'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // flex: 0.3,
  },
});
