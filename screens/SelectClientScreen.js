import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getClients, selectClient} from '../redux/slices/clients';
import {useDispatch, useSelector} from '../redux/store';
import {useEffect} from 'react';
import ClientBox from "../components/ClientBox";


export default function SelectClientScreen({navigation}) {
  const dispatch = useDispatch();
  const {clients, isLoading} = useSelector(state => state.clients);

  const handleSelectClient = (val) => {
    dispatch(selectClient(val));
    navigation.navigate('SelectSlot');
  }


  useEffect(() => {
    return navigation.addListener('focus', (event) => {
      dispatch(getClients())
    });
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
          <Text style={{textAlign: 'center', fontSize: 30}}>Seleccionar cliente</Text>
        </View>
      </View>
      <View style={styles.clients}>
        {isLoading && <Text>loading...</Text>}
        {
          !isLoading && clients &&
          <FlatList
            data={clients}
            renderItem={(client) => ClientBox(client, handleSelectClient )}
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
  header: {
    marginTop: 50,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center'
  },
  clients: {
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
