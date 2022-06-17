import {Image, StyleSheet, Text, TouchableOpacity, View, Modal, Alert, TextInput, Button, ActivityIndicator} from "react-native";
import {useState} from 'react';

export default function InsertManualCode({stopScan, scanProduct, loading}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');

  const handlePress = () => {
    stopScan()
    setModalVisible(!modalVisible);
    setCode('');
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.box}>
          <Image
            source={require('../assets/icons/home.png')}
            resizeMode='contain'
            style={{width: 30, marginBottom: -15}}
          />
          <Text style={{fontSize: 16, textAlign: 'center'}}>Ingresar codigo manualmente</Text>

        </View>

      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setCode}
              value={code}
              placeholder="Ingresar codigo del producto"
            />
            <Button style={styles.button} title='Ingresar codigo' onPress={() => scanProduct(code)}/>
            {
              loading &&
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#311DEF" />
              </View>
            }
            <TouchableOpacity style={styles.exitIcon} onPress={() => setModalVisible(!modalVisible)}>
              <Image
                source={require('../assets/icons/close-icon.png')}
                resizeMode='contain'
                style={{width: 50}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 50,
    width: 150,
    height: 100,
    right: 20,
    borderRadius: 15,
  },
  box: {
    alignItems: 'center',
    paddingBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: 300,
    height: 200,
    position: 'relative',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 0.1,
    borderRadius: 3,
    padding: 10,
  },
  exitIcon: {
    position: 'absolute',
    top: -15,
    right: -10
  },
  loader: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'red'
  }
});
