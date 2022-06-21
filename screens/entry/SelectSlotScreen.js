import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getSlotsByWarehouse, selectSlot} from '../../redux/slices/slots';
import {useDispatch, useSelector} from '../../redux/store';
import {useEffect} from 'react';
import SlotBox from "../../components/SlotBox";
import HeaderNavigation from "../../components/HeaderNavigation";

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
      <HeaderNavigation navigation={navigation} title='Seleccionar slot' />
      <View style={styles.slots}>
        {
          isLoading &&
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='#311def' />
          </View>
        }
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
  slots: {
    marginTop: 20,
    height: 630
  },

});