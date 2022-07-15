import React, {useState, useEffect, useRef, useContext} from 'react';
import {Text, View, StyleSheet, Animated, Image, TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Audio} from 'expo-av';
import useInsertProductInSlot from "../../hooks/useInsertProductInSlot";
import InsertManualCode from "../../components/InsertManualCode";
import {useSelector} from "../../redux/store";
import {ScannerContext} from "../../context/scanner/ScannerContext";
import {AuthContext} from "../../context/auth/AuthContext";
import {SlotsContext} from "../../context/slots/SlotsContext";
import {ClientsContext} from "../../context/clients/ClientsContext";

export default function RegularScannerScreen({navigation, route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [sound, setSound] = useState(null);
  const [animationLineHeight, setAnimationLineHeight] = useState(0)
  const [focusLineAnimation, setFocusLineAnimation] = useState(new Animated.Value(0),)
  const opacity = useRef(new Animated.Value(0)).current;
  const { snackbar, scanItemIntoSlot } = useContext(ScannerContext);
  const { authState } = useContext(AuthContext);
  const { slots } = useContext(SlotsContext);
  const { clients } = useContext(ClientsContext);

  // console.log(snackbar);

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
    const dataToSend = {
      code: data,
      idClient: clients.selectedClient._id,
      idSlot: slots.selectedSlot._id,
      amount: 1,
      userMail: authState.user.email
    }
    setScanned(true);
    await playSound()
    await scanItemIntoSlot(dataToSend);
  };

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
    if (isMounted) {
      animateLine()
    }
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true;
    if (snackbar.open) {
      if (isMounted) {
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          // Animated.delay(1500),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }),
        ]).start(() => {})
      }
      return () => {
        isMounted = false
      }
    }
  }, [snackbar])

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
      <InsertManualCode stopScan={stopScanner} scanProduct={() => {}}  result={{}}/>
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
        backgroundColor: snackbar.type === 'success' ? 'green' : 'red',
        display: snackbar.type ? 'flex' : 'none',
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
        <Text style={{color: '#fff', fontSize: 18}}>{snackbar.text}</Text>
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
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#fff',
    width: '90%',
    left: 20,
    borderRadius: 15,
  },
  box: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
