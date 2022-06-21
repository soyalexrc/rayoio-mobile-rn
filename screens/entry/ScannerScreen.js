import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Animated, Image, TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Audio} from 'expo-av';
import useInsertProductInSlot from "../../hooks/useInsertProductInSlot";
import InsertManualCode from "../../components/InsertManualCode";
import {useSelector} from "../../redux/store";
import CustomSnackBar from "../../components/CustomSnackBar";
import HeaderNavigation from "../../components/HeaderNavigation";

export default function ScannerScreen({navigation, route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [sound, setSound] = useState(null);
  const {data, loading, addItem, error} = useInsertProductInSlot()
  const [animationLineHeight, setAnimationLineHeight] = useState(0)
  const [focusLineAnimation, setFocusLineAnimation] = useState(new Animated.Value(0),)
  const [snackbar, setSnackbar] = useState({
    text: '',
    color: '#fff',
    icon: ''
  })
  const opacity = useRef(new Animated.Value(0)).current;

  const selectedSlot = useSelector(state => state.slots.selectedSlot);
  const selectedClient = useSelector(state => state.clients.selectedClient);
  const loginData = useSelector(state => state.login.loginData);

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
      require('../../assets/codebar-sound.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  const stopScanner = async () => {
    await setScanned(true);
  }

  const handleBarCodeScanned = async ({data}) => {
    setScanned(true);
    await playSound()
    await addItem({
      code: data,
      idClient: selectedClient._id,
      idSlot: selectedSlot._id,
      userMail: loginData.data[0].email,
      amount: 1,
    })
  };

  const scanProductManual = async (data) => {
    await playSound()
    await addItem({
      code: data,
      idClient: selectedClient._id,
      idSlot: selectedSlot._id,
      userMail: loginData.data[0].email,
      amount: 1,
    })
  }

  const animateLine = () => {
    Animated.sequence([
      Animated.timing(focusLineAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true // Add This line
      }),
      Animated.timing(focusLineAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true // Add This line
      }),
    ]).start(animateLine)
  }

  useEffect(() => {
    let isMounted = true;
    if (snackbar.message) {
      if (isMounted) {
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.delay(1500),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }),
        ]).start(() => {
          setSnackbar({
            color: '#fff',
            message: '',
            icon: ''
          });
        })
      }
      return () => {
        isMounted = false
      }
    }
  }, [snackbar])

  useEffect(() => {
    let isMounted = true;
    if (data.status) {
      if (isMounted) {
        setSnackbar({
          message: data.message,
          color: data.status === 201 ? 'green' : 'red',
          icon: ''
        })
      }
    }
    return () => {
      isMounted = false;
    }
  }, [data])

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      animateLine()
    }
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderNavigation navigation={navigation} title='some title' />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}></View>
        <View style={styles.middleContainer}>
          <View style={styles.unfocusedContainer}></View>
          <View
            onLayout={e => setAnimationLineHeight(e.nativeEvent.layout.height)}
            style={styles.focusedContainer}>
            {!scanned && (
              <Animated.View
                style={[
                  styles.animationLineStyle,
                  {
                    transform: [
                      {
                        translateY: focusLineAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, animationLineHeight],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
            {scanned && (
              <TouchableOpacity
                onPress={() => setScanned(false)}
                style={styles.rescanIconContainer}>
                <Image
                  source={require('../../assets/images/rescan.png')}
                  style={{width: 50, height: 50}}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.unfocusedContainer}></View>
        </View>
        <View style={styles.unfocusedContainer}></View>
      </View>
      {/*<TouchableOpacity style={styles.routerLink} onPress={() => navigation.navigate('ScannerList')}>*/}
      {/*  <Image*/}
      {/*    source={require('../../assets/icons/home.png')}*/}
      {/*    resizeMode='contain'*/}
      {/*    style={{width: 30, marginBottom: -15}}*/}
      {/*  />*/}
      {/*  <Text style={{fontSize: 16, textAlign: 'center'}}>Listado de productos escaneados</Text>*/}
      {/*</TouchableOpacity>*/}
      <InsertManualCode stopScan={stopScanner} scanProduct={scanProductManual} loading={loading} result={data}/>
      <Animated.View style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],

        marginHorizontal: 20,
        marginVertical: 70,
        marginBottom: 5,
        backgroundColor: snackbar.color,
        padding: 20,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6
      }}>
        <Text style={{color: '#fff', fontSize: 18}}>{snackbar.message}</Text>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000000'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
  },
  animationLineStyle: {
    height: 2,
    width: '100%',
    backgroundColor: 'red',
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routerLink: {
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#fff',
    paddingBottom: 10,
    width: 150,
    height: 100,
    left: 20,
    borderRadius: 15,
  }
})
