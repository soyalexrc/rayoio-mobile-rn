import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {useState} from "react";

export default function TypeRegisterScreen({ navigation, route }) {
  const [typeRegister, setTypeRegister] = useState('');

  console.log('route', route);

  function initStepProcess() {
    if (typeRegister !== '') {
      if (typeRegister === 'regular') {
        navigation.navigate('SelectClient');
      } else {
        navigation.navigate('Reception')
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#455C7E', fontSize: 16, fontWeight: 'bold' }}>Registrar un nuevo producto</Text>
        <Text style={{  fontSize: 16 }}>Que tipo de registro deseas realizar?</Text>
        <View style={{
          flexDirection: 'row',
          marginVertical: 30,
        }}>
          <TouchableOpacity style={{ padding: 20, alignItems: 'center' }} onPress={() => setTypeRegister('provider')}>
            <View style={styles.radioContainer}>
              {
                typeRegister === 'provider' && <View style={styles.radioContent}/>
              }
            </View>
            <Text>Para proveedor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, alignItems: 'center' }} onPress={() => setTypeRegister('regular')}>
            <View style={styles.radioContainer}>
              {
                typeRegister === 'regular' && <View style={styles.radioContent}/>
              }
            </View>
            <Text>De mercancia</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/*<TouchableOpacity style={styles.backButton} onPress={() => prevStep()}>*/}
        {/*  <Text style={{ color: '#161070' }}>Volver</Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity style={[styles.nextButton, {     backgroundColor: typeRegister !== '' ?  '#311DEF' : 'lightgray'}]} onPress={initStepProcess}>
          <Text style={{ color: '#fff' }}>Siguiente</Text>
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
    backgroundColor: '#EAE8FC',
    padding: 20,
    margin: 10,
    borderRadius: 35,
    color: '#161070'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    flex: 1,
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
  }
})
