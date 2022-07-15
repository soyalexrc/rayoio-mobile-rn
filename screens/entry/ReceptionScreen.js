import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
  Keyboard
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
import useGetClients from "../../hooks/useGetClients";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useState, useEffect} from 'react';

export default function ReceptionScreen({navigation}) {
  const {data, error, loading} = useGetClients()
  const [date, setDate] = useState('');
  const [client, setClient] = useState({});
  const [provider, setProvider] = useState({});
  const [payload, setPayload] = useState('');
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);


  function handleChangeDate(event, date) {
    setDisplayDatePicker(false);
    setDate(new Date(date).toLocaleDateString('en-US').toString());
  }

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShow(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShow(false);
    });

    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    }
  }, [])

  function handleValidation() {
    return !!(client && provider && payload && date);
  }

  function nextStep() {
    navigation.navigate('SelectSlot', {
      nextScreen: 'ScannerList'
    })
  }

  function prevStep() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <View style={{padding: 20}}>
          <Text style={{color: '#455C7E', fontSize: 16, fontWeight: 'bold'}}>Registrar nuevo producto</Text>
        </View>
        <SafeAreaView>
          {loading && <ActivityIndicator/>}
          {
            !loading && data && data.length > 0 &&
            <SelectDropdown
              data={data}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setProvider(selectedItem);
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    {selectedItem ? (
                      <Image source={{uri: selectedItem.image_customer}} style={styles.dropdown3BtnImage}/>
                    ) : (
                      <Image
                        source={require('../../assets/images/no-imagepng.png')}
                        style={{
                          width: 35,
                          height: 35
                        }}
                      />
                    )}
                    <Text
                      style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.name_customer : 'Selecciona proveedor'}</Text>
                    {/*<FontAwesome name="chevron-down" color={'#444'} size={18} />*/}
                  </View>
                );
              }}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Image source={{uri: item.image_customer}} style={styles.dropdownRowImage}/>
                    <Text style={styles.dropdown3RowTxt}>{item.name_customer}</Text>
                  </View>
                );
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.name_customer
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.name_customer
              }}
            />
          }
        </SafeAreaView>
        <SafeAreaView>
          {loading && <ActivityIndicator/>}
          {
            !loading && data && data.length > 0 &&
            <SelectDropdown
              data={data}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setClient(selectedItem)
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    {selectedItem ? (
                      <Image source={{uri: selectedItem.image_customer}} style={styles.dropdown3BtnImage}/>
                    ) : (
                      // <Ionicons name="md-earth-sharp" color={'#444'} size={32} />
                      <Image
                        source={require('../../assets/images/no-imagepng.png')}
                        style={{
                          width: 35,
                          height: 35
                        }}
                      />
                    )}
                    <Text
                      style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.name_customer : 'Selecciona cliente'}</Text>
                    {/*<FontAwesome name="chevron-down" color={'#444'} size={18} />*/}
                  </View>
                );
              }}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Image source={{uri: item.image_customer}} style={styles.dropdownRowImage}/>
                    <Text style={styles.dropdown3RowTxt}>{item.name_customer}</Text>
                  </View>
                );
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.name_customer
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.name_customer
              }}
            />
          }
        </SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setPayload}
          value={payload}
          placeholder="Tipo de cargamento"
        />
        {
          displayDatePicker &&
          <RNDateTimePicker
            value={new Date()}
            onChange={handleChangeDate}
            // display={"spinner"}
          />
        }
        <TouchableOpacity style={styles.dateInput} onPress={() => setDisplayDatePicker(true)}>
          <Text>{date ? date : 'Fecha de recepcion'}</Text>
        </TouchableOpacity>

      </View>
      <View style={[styles.buttonContainer, {display: keyboardShow ? 'none' : 'flex'}]}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={{color: '#161070', textAlign: 'center'}}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextStep}
                          style={[styles.nextButton, {backgroundColor: handleValidation() ? '#311DEF' : 'lightgray'}]}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Siguiente</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    flex: 0.3,
  },
  radioContainer: {
    width: 20,
    height: 20,
    borderColor: '#311DEF',
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioContent: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#311DEF',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 8,
  },
  dateInput: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 8,
  },


  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 35, height: 35, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: '#fff',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 35, height: 35, resizeMode: 'cover'},
  dropdown3RowTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 12,
  },
  dropdown3searchInputStyleStyle: {
    backgroundColor: 'slategray',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
})
