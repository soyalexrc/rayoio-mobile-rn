import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from "react-native";
import {getClients, selectClient} from '../redux/slices/clients';
import {useDispatch, useSelector} from '../redux/store';
import {useEffect} from 'react';


export default function SelectClientScreen({navigation}) {
  const dispatch = useDispatch();
  const {clients, isLoading} = useSelector(state => state.clients);

  const handleSelectClient = (val) => {
    dispatch(selectClient(val));
    navigation.navigate('SelectSlot');
  }

  useEffect(() => {
    dispatch(getClients())
  }, [])


  const renderItem = (client) => {
    return (
      <TouchableOpacity style={styles.button}
                        onPress={() => handleSelectClient(client.item)}
      >
        <Image
          style={{width: 50, height: 50}}
          resizeMode='contain'
          source={{uri: client.item.image_customer}}
        />
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{client.item.name_customer}</Text>
          <Text style={{fontSize: 18}}>{client.item.business_name_customer}</Text>
          <Text style={{fontSize: 16}}>{client.item.rut_customer}</Text>
          <Text style={{fontSize: 16}}>{client.item.mail_customer}</Text>
        </View>

      </TouchableOpacity>

    )
  }


  return (
    <View style={styles.container}>
      <View stlye={styles.header}>
        <Text style={{textAlign: 'center', fontSize: 30}}>Seleccionar cliente</Text>
      </View>
      <View style={styles.clients}>
        {isLoading && <Text>loading...</Text>}
        {
          !isLoading && clients &&
          <FlatList
            data={clients}
            renderItem={renderItem}
            keyExtractor={client => client._id}
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
  header: {},
  clients: {
    marginTop: 20,
    height: 600
  },
  button: {
    flexDirection: 'row',
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
  }
});
