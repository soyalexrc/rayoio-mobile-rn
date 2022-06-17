import {
  StyleSheet,
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from '../redux/store';
import { loginWithEmail } from '../redux/slices/login';


export default function LoginScreen({ navigation }) {
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState('')
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loginData, isLoading } = useSelector((state) => state.login)

  const login = async() => {
    await dispatch(loginWithEmail({ email: email }))
  }

  useEffect(() => {
    if (loginData.status !== 200 && loginData.message) {
      setError(true)
      setModalMessage(loginData.message);
    } else if (loginData.status === 200) {
      navigation.navigate('Root');
    }
  }, [loginData])


  return (
    <View style={styles.container}>
      <View style={{ position: 'relative' }}>
        <Image
          source={require('../assets/images/gradient-bakground.png')}
          resizeMode='contain'
          style={{height: 300}}
        />
        <Image
          source={require('../assets/icons/white-logo.png')}
          resizeMode='contain'
          style={{width: 230, position: 'absolute', top: 80, left: 300}}
        />
      </View>
      <View style={styles.box}>
        <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>Iniciar sesion</Text>
        <View style={styles.googleButtonContainer}>
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require('../assets/icons/google-icon.png')}
              resizeMode='contain'
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 18 }}>o tu cuenta Rayo</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder='mail@rayoapp.com'
          />
        </View>
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22 }}>Ingresar</Text>
          </TouchableOpacity>
        {
          isLoading &&
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#311DEF" />
          </View>
        }
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={error}
        onRequestClose={() => {
          setError(!error);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}!</Text>
            <Pressable style={{backgroundColor: '#311def', borderRadius: 10}} onPress={() => setError(!error)}>
              <Text style={styles.loginText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 50
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    width: '80%',
    margin: 12,
    borderWidth: 0.2,
    borderRadius: 3,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    width: 300,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginTop: 22
  },
  box: {
    padding: 50,
    paddingTop: 80,
    alignSelf: 'stretch',
    borderRadius: 25,
    backgroundColor: '#fff',
    marginTop: -80,
    zIndex: 111,
  },
  googleButtonContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  googleButton: {
    alignItems: 'center',
    width: 80,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6
  },
  inputBox: {
    alignItems: 'center',
    marginVertical: 50
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#311DEF',
    padding: 20,
    borderRadius: 25
  },
  loader: {
    marginVertical: 20,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },

});
