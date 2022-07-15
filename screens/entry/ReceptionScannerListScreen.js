import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {useEffect, useContext} from 'react';
import {ScannerContext} from "../../context/scanner/ScannerContext";
import ScannerItemBox from "../../components/ScannerItemBox";

const heightScreen = Dimensions.get('window').height;

export default function ReceptionScannerListScreen({navigation}) {
  const {items, removeItemFromList, cleanList} = useContext(ScannerContext);


  useEffect(() => {
    cleanList();
  }, [])

  const handleSlotSelection = (val) => {
    removeItemFromList(val._id);
  }


  function nextStep() {
  //  make something...
  }

  function prevStep() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={{padding: 20, alignItems: 'center'}}>
        <Text style={{color: '#455C7E', fontSize: 16, fontWeight: 'bold'}}>Scan</Text>
        <Text>Listado de productos escaneados</Text>
      </View>
      <View style={styles.slots}>
        {/*{*/}
        {/*  loading &&*/}
        {/*  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>*/}
        {/*    <ActivityIndicator size='large' color='#311def'/>*/}
        {/*  </View>*/}
        {/*}*/}
        {
          items.recentScannedItems.length > 0 &&
          <FlatList
            data={items.recentScannedItems}
            renderItem={(item) => ScannerItemBox(item, handleSlotSelection)}
            keyExtractor={item => item._id}
          />
        }
        {
          items.recentScannedItems.length < 1 &&
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>No hay elementos escaneados...</Text>
          </View>
        }
        <View>
          <TouchableOpacity style={styles.rescan} onPress={() => {navigation.navigate('ReceptionScanner')}}>
            <Image
              source={require('../../assets/images/rescan.png')}
              style={{
                width: 30,
                height: 30,
                margin: 5,
              }}
            />
            <Text>{items.recentScannedItems.length > 0 ? 'Continuar escaneando' : 'Comenzar a escanear'} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={{color: '#161070', textAlign: 'center'}}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextStep}
            style={[styles.nextButton]}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Guardar</Text>
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
    flex: 1,
    height: heightScreen * 0.63,
  },
  nextButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 35,
    backgroundColor: '#311DEF',
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
    justifyContent: 'center'
  },
  rescan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
  }
});
