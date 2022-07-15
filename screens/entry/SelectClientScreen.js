import {ActivityIndicator, FlatList, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useContext} from 'react';
import ClientBox from "../../components/ClientBox";
import {ClientsContext} from "../../context/clients/ClientsContext";

const heightScreen = Dimensions.get('window').height;


export default function SelectClientScreen({navigation, route}) {
  const { getClients, selectClient, loading, clients } = useContext(ClientsContext);
  const { type } = route.params;

  const handleSelectClient = (val) => {
    selectClient(val);
  }

  useEffect(() => {
    return navigation.addListener('focus', (event) => {
      getClients();
    });
  }, [navigation])

  function prevStep() {
    navigation.goBack();
  }

  function nextStep() {
    if (clients.selectedClient._id) {
      navigation.navigate('SelectSlot', {
        nextScreen: 'RegularScannerList',
        type: type,
      });
    }
  }


  return (
    <View style={styles.container}>
      <View style={{paddingTop: 20, alignItems: 'center'}}>
        <Text style={{color: '#455C7E', fontSize: 16, fontWeight: 'bold'}}>
          {
            type === 'register'
              ? 'Registrar nuevo producto'
              : 'Remover productos'
          }
        </Text>
        <Text>Selecciona cliente</Text>
      </View>
      <View style={styles.slots}>
        {
          loading &&
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' color='#311def'/>
          </View>
        }
        {
          !loading && clients.clients &&
          <FlatList
            data={clients.clients}
            renderItem={(client) => ClientBox(client, handleSelectClient, clients.selectedClient)}
            keyExtractor={client => client._id}
          />
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={{color: '#161070', textAlign: 'center'}}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextStep}
            style={[styles.nextButton, { backgroundColor: clients.selectedClient._id  ? '#311DEF' : 'lightgray' }]}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Siguiente</Text>
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
  },
  nextButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 35,
    // backgroundColor: '#311DEF',
    color: '#fff',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#EAE8FC',
    padding: 20,
    margin: 10,
    borderRadius: 35,
    color: '#161070'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
