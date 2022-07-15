import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {useContext} from 'react';
import {ScannerContext} from "../../context/scanner/ScannerContext";
import RegularScannerItemBox from "../../components/RegularScannerItemBox";
import {useEffect} from "react";

const heightScreen = Dimensions.get('window').height;

export default function RegularScannerListScreen({navigation}) {
  const {items, cleanList} = useContext(ScannerContext);

  useEffect(() => {
    cleanList();
  }, [])

  function nextStep() {
    // make something...
  }

  function prevStep() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={{padding: 20, alignItems: 'center'}}>
        <Text style={{color: '#455C7E', fontSize: 16, fontWeight: 'bold'}}>Scan</Text>
        <Text>Resumen de productos escaneados</Text>
      </View>
      <View style={styles.slots}>
        {
          items.recentScannedItems.length > 0 &&
          <FlatList
            data={items.recentScannedItems}
            renderItem={(item) => RegularScannerItemBox(item)}
            keyExtractor={item => item._id}
          />
        }
        {
          items.recentScannedItems.length < 1 &&
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>No hay elementos escaneados...</Text>
          </View>
        }
        <View >
          <TouchableOpacity style={styles.rescan} onPress={() => {navigation.navigate('RegularScanner')}}>
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
    // flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 35,
    backgroundColor: '#311DEF',
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
    justifyContent: 'center',
  },
  rescan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
  }
});
