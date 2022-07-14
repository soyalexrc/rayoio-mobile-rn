import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {getSlotsByWarehouse} from '../../redux/slices/slots';
import {useDispatch, useSelector} from '../../redux/store';
import {useEffect, useContext} from 'react';
import SlotBox from "../../components/SlotBox";
import HeaderNavigation from "../../components/HeaderNavigation";
import {AuthContext} from "../../context/auth/AuthContext";
import {SlotsContext} from "../../context/slots/SlotsContext";
import {ScannerContext} from "../../context/scanner/ScannerContext";
import ScannerItemBox from "../../components/ScannerItemBox";

const heightScreen = Dimensions.get('window').height;

export default function ScannerListScreen({navigation}) {
  const {items} = useContext(ScannerContext);


  const handleSlotSelection = (val) => {
    // console.log(val);
  }


  function nextStep() {
    // navigation.navigate('ScannerList')
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
          <FlatList
            data={items.recentScannedItems}
            renderItem={(item) => ScannerItemBox(item, handleSlotSelection)}
            keyExtractor={item => item._id}
          />
        <View>
          <TouchableOpacity style={styles.rescan} onPress={() => {navigation.navigate('Scanner')}}>
            <Image
              source={require('../../assets/images/rescan.png')}
              style={{
                width: 30,
                height: 30,
                margin: 5,
              }}
            />
            <Text>Continuar escaneando</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={prevStep}>
            <Text style={{color: '#161070'}}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextStep}
            style={[styles.nextButton]}>
            <Text style={{color: '#fff'}}>Guardar</Text>
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
