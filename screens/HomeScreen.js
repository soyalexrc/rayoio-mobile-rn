import {StyleSheet, Image, View, Text, Animated, PanResponder} from "react-native";
import {useState} from "react";
{/*import HomeChart from "../components/HomeChart";*/}
import {useSelector} from '../redux/store';

const colors = ['#311DEF', '#95A9F7', '#BDC9F9'];

export default function HomeScreen() {
  const [cardsPan, setCardsPan] = useState(new Animated.ValueXY());
  const [cardsStackedAnim, setCardsStackedAnim] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0)
  const { loginData } = useSelector(state => state.login);

  console.log(loginData);

  const cardsPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event, gestureState) => {
      setCardsPan({x: gestureState.dx, y: cardsPan.y})
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (event, gestureState) => {
    },
  })

  const onPanResponderRelease = ( event, gestureState ) => {
    // bring the translationX back to 0
    Animated.timing( cardsPan, {
    toValue: 0,
    duration: 300,
  } ).start();
  // will be used to interpolate values in each view
  Animated.timing( cardsStackedAnim, {
    toValue: 1,
    duration: 300,
  } ).start( () => {
    // reset cardsStackedAnim's value to 0 when animation ends
    setCardsStackedAnim( 0 );
    // increment card position when animation ends
    setCurrentIndex(prevState => prevState + 1)
  } );
};

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image
          source={require('../assets/icons/rayo-logo.png')}
          resizeMode='contain'
          style={{width: 120, marginTop: 15}}
        />
        <Image
          source={require('../assets/icons/home.png')}
          resizeMode='contain'
          style={{width: 30,}}
        />
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/images/rayouser.png')}
            resizeMode='contain'
            style={{width: 40}}
          />
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={{fontSize: 22, fontWeight: 'bold', letterSpacing: 1}}>Hola, Miguel!</Text>
            <Text style={{color: '#B0B3BA', fontSize: 18}}>Bienvenido de vuelta</Text>
          </View>
          <Image
            source={require('../assets/icons/home.png')}
            resizeMode='contain'
            style={{width: 25,}}
          />
        </View>
        <View>
          <Text style={{ fontSize: 22, color: '#311DEF', letterSpacing: 2, fontWeight: 'bold'}}>{loginData.data[0].nameWarehouse}</Text>
        </View>
      </View>
      <View style={styles.notificationsContainer}>
          <View style={{
            ...styles.notifications,
            // width: 300, height: 150,
            position: 'absolute',
            zIndex: 1,
            bottom: 40,
            backgroundColor: colors[2], // Red
            opacity: 0.3,
            transform: [{scale: 0.80}],
          }}>
            <Text style={{color: '#fff', fontSize: 22}}>Hoy debemos recibir nueva carga</Text>
            <Text style={{color: '#fff', fontSize: 18, marginTop: 15}}>Estan planificadas 36 paquetes</Text>
          </View>
          <View style={{
            ...styles.notifications,
            // width: 300, height: 150,
            position: 'absolute',
            zIndex: 2,
            bottom: 20,
            backgroundColor: colors[1], // Green
            opacity: 0.6,
            transform: [{scale: 0.90}],
          }}>
            <Text style={{color: '#fff', fontSize: 22}}>Hoy debemos recibir nueva carga</Text>
            <Text style={{color: '#fff', fontSize: 18, marginTop: 15}}>Estan planificadas 36 paquetes</Text>
          </View>
          <Animated.View
            { ...cardsPanResponder.panHandlers }
            style={{
            ...styles.notifications,
            // width: 300, height: 150,
            position: 'absolute',
            zIndex: 3,
            bottom: 0,
            backgroundColor: colors[0], // Blue
            opacity: 1,
            transform: [
              { translateX: cardsPan.x },
              { scale: 1.0 },
            ],
          }}>
            <Text style={{color: '#fff', fontSize: 22}}>Hoy debemos recibir nueva carga</Text>
            <Text style={{color: '#fff', fontSize: 18, marginTop: 15}}>Estan planificadas 36 paquetes</Text>
          </Animated.View>
      </View>
      <View style={styles.payloadContainer}>
        <View style={styles.payload}>
          <View style={styles.payloadBox}>
            <Text style={{ color: '#B0B3BA' }}>CARGA INGRESADA</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>2 Bultos</Text>
          </View>
          <View style={styles.payloadBox}>
            <Text style={{ color: '#B0B3BA' }}>CARGA ENTREGADA</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>0 Bultos</Text>
          </View>
        </View>
      </View>
      {/*<HomeChart />*/}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FA',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 30,
    paddingRight: 20,
  },
  userInfoContainer: {
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  userInfo: {
    flexDirection: 'row',
    alignItems: "center",
  },
  notificationsContainer: {
    position: 'relative',
    marginTop: 180,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notifications: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#311DEF',
    borderRadius: 35
  },
  payloadContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  payload: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  payloadBox: {
    padding: 20,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15
  },
  chartContainer: {
    width: 300,
    height: 400
  }
});