import {Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator, FlatList} from "react-native";
import useGetInventory from "../hooks/useGetInventory";
import { useState } from 'react';
import {useSelector} from "../redux/store";
import ClientBox from "../components/ClientBox";
import ItemBox from "../components/ItemBox";

export default function SearchItemScreen({navigation}) {
  const { data, error, getItemInventory, loading } = useGetInventory()
  const [code, setCode] = useState('')
  const loginData = useSelector(state => state.login.loginData);

  async function getItemData() {
    await getItemInventory({ code: code, tenant: loginData.data[0].tenant })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 0.1}}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/icons/arrow-back.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.9}}>
          <Text style={{textAlign: 'center', fontSize: 30}}>Buscar Item</Text>
        </View>
      </View>
      <View style={styles.searchBox}>
        <View style={{flex: 0.9}}>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder='Buscar por codigo de item'
          />
        </View>
        <View style={{flex: 0.13}}>
          <TouchableOpacity style={styles.backButton} onPress={() => getItemData()}>
            <Image
              source={require('../assets/icons/search-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {
        !loading && data && data.length > 0 &&
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{width: 50, height: 50}}
            resizeMode='contain'
            source={{uri: data[0].imageUrl}}
          />
          <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{data[0].nameItem}</Text>
            <Text style={{ fontSize: 18 }}>{data[0].nameCategory}</Text>
          </View>
        </View>
      }
      <View style={styles.list}>
        {
          loading &&
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#311DEF" />
          </View>
        }
        {
          !loading && data && data.length > 0 &&
          <FlatList
            data={data}
            renderItem={(item) => ItemBox(item)}
            keyExtractor={item => item._id}
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
  list: {
    height: 530
  },
  backButton: {
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
  input: {
    height: 50,
    backgroundColor: '#fff',
    margin: 12,
    borderWidth: 0.2,
    borderRadius: 3,
    padding: 10,
  },
  searchBox: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
