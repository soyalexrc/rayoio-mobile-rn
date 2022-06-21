import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getClients, selectClient} from '../../redux/slices/clients';
import {useDispatch, useSelector} from '../../redux/store';
import {useEffect} from 'react';
import ClientBox from "../../components/ClientBox";
import HeaderNavigation from "../../components/HeaderNavigation";


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
      <HeaderNavigation navigation={navigation} title='Seleccionar cliente' />
      <View style={styles.clients}>
        {
          isLoading &&
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='#311def' />
          </View>
        }
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
  clients: {
    marginTop: 20,
    height: 630
  },
});
