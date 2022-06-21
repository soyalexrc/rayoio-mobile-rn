import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "../../redux/store";
import HeaderNavigation from "../../components/HeaderNavigation";

export default function RemoveItemScreen({navigation}) {
  const selectedSlot = useSelector(state => state.slots.selectedSlot)

  return (
    <View style={styles.container}>
      <HeaderNavigation navigation={navigation} title='Seleccionar opcion' />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          disabled={!selectedSlot.name}
          style={selectedSlot.name ? styles.button : styles.disabled}
          onPress={() => navigation.navigate('RemoveScanner')}

        >
          <Text style={{fontSize: 20, textAlign: 'center'}}>Remover del slot actual: </Text>
          {
            !selectedSlot.name &&
            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: 'gray'}}>No hay
              slot seleccionado...</Text>
          }
          {
            selectedSlot.name &&
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
              <Image
                style={{width: 50, height: 50}}
                resizeMode='contain'
                source={{uri: selectedSlot.imageUrl}}
              />
              <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{selectedSlot.name}</Text>
                {/*<Text style={{fontSize: 16}}>{selectedSlot.rut_customer}</Text>*/}
                <Text style={{fontSize: 12}}>Items: {selectedSlot.amount}</Text>
              </View>
            </View>
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SelectSlotRemove')}
        >
          <Text style={{fontSize: 20, textAlign: 'center'}}>Remover de otro slot</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  disabled: {
    padding: 30,
    marginHorizontal: 20,
    backgroundColor: 'lightgray',
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
