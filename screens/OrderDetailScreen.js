import {StyleSheet, Text, View, Animated, TouchableOpacity, Image, ScrollView, FlatList} from "react-native";
import {useSelector} from "../redux/store";
import HeaderNavigation from "../components/HeaderNavigation";
import OrderDetailResume from "../components/orders/OrderDetailResume";
import {BarCodeScanner} from "expo-barcode-scanner";
import {useEffect, useRef, useState} from "react";
import {Audio} from "expo-av";
import OrderBox from "../components/orders/OrderBox";
import OrderItemBox from "../components/orders/OrderItemBox";
import useVerifyProductExist from "../hooks/useVerifyProductExist";

export default function OrderDetailScreen({navigation}) {
  const {selectedOrder, currentAmountPicked} = useSelector(state => state.orders);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [lastCode, setLastCode] = useState('');
  const [sound, setSound] = useState(null);
  const [animationLineHeight, setAnimationLineHeight] = useState(0)
  const [focusLineAnimation, setFocusLineAnimation] = useState(new Animated.Value(0),)
  const [scannedItems, setScannedItems] = useState([])
  const {data, consultItem, error, loading} = useVerifyProductExist()
  const [snackbar, setSnackbar] = useState({
    text: '',
    color: '#fff',
    icon: ''
  })
  const opacity = useRef(new Animated.Value(0)).current;

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
      require('../assets/codebar-sound.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  const stopScanner = async () => {
    await setScanned(!scanned);
  }

  const handleBarCodeScanned = async ({data}) => {
    setScanned(true);
    await playSound()
    await consultItem({code: data})
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
          color: data.status === 200 ? 'green' : data.status === 404 ? 'yellow' : 'red',
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


  function handleTouch(item) {
    console.log(item);
  }

  return (
    <View style={styles.container}>
      <HeaderNavigation navigation={navigation} title='Detalle de orden'/>
      <OrderDetailResume item={selectedOrder}/>
      <View style={{
        alignItems: 'center'
      }}>
        <Text style={{fontSize: 22}}>Items: {currentAmountPicked} / {selectedOrder.itemCount}</Text>
        <View style={styles.progressBar}>
          <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: "#95A9F7", width: `${currentAmountPicked * 100 / selectedOrder.itemCount }%`}]}/>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}> Ubicacion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}> Metadata</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => stopScanner()}>
          <Text style={{fontSize: 20, color: '#fff', textAlign: 'center'}}> Scanner</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.scannerContainer}>
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
                      source={require('../assets/images/rescan.png')}
                      style={{width: 50, height: 50}}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.unfocusedContainer}></View>
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Productos escaneados</Text>
          {/*<FlatList*/}
          {/*  data={order.items}*/}
          {/*  renderItem={(item) => OrderItemBox(item, handleTouch)}*/}
          {/*  keyExtractor={item => item.SKU}*/}
          {/*/>*/}
          {
            selectedOrder.items.map((item, index) => (
              <OrderItemBox item={item} index={index} length={selectedOrder.items.length} key={item.SKU} fn={handleTouch}/>
            ))
          }
        </View>
      </ScrollView>
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
        position: 'absolute',
        top: 0,
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
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressBar: {
    marginTop: 10,
    height: 20,
    flexDirection: "row",
    width: '95%',
    backgroundColor: 'white',
    borderColor: '#311DEF',
    borderWidth: 2,
    borderRadius: 5
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  actionButton: {
    width: 100,
    backgroundColor: '#311DEF',
    padding: 10,
    borderRadius: 10
  },
  scannerContainer: {
    marginTop: 30,
    height: 300,
    // width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
    // backgroundColor: 'rgba(0,0,0,0.7)',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },
  focusedContainer: {
    flex: 2.7,
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
  listContainer: {
    margin: 10
  }
});
