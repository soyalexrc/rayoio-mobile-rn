import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator, Modal
} from "react-native";
import {useSelector} from "../redux/store";
import HeaderNavigation from "../components/HeaderNavigation";
import OrderDetailResume from "../components/orders/OrderDetailResume";
import {BarCodeScanner} from "expo-barcode-scanner";
import {useEffect, useRef, useState} from "react";
import {Audio} from "expo-av";
import OrderItemBox from "../components/orders/OrderItemBox";
import useVerifyProductExist from "../hooks/useVerifyProductExist";
import orderStatus from "../utils/orderStatus";
import {useDispatch} from "../redux/store";
import {resetAmount} from '../redux/slices/orders';
import useConsultSlots from "../hooks/useConsultSlots";

export default function OrderDetailScreen({navigation}) {
  const {selectedOrder, currentAmountPicked} = useSelector(state => state.orders);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [sound, setSound] = useState(null);
  const [animationLineHeight, setAnimationLineHeight] = useState(0)
  const [focusLineAnimation, setFocusLineAnimation] = useState(new Animated.Value(0),)
  const [completeOrderModal, setCompleteOrderModal] = useState(false)
  const [metaDataModal, setMetaDataModal] = useState(false)
  const {data, consultItem, changeStatus, error, loading} = useVerifyProductExist()
  const {indicator, getSlotsOrder, orderSlotsData, orderSlotsError, orderSlotsLoading} = useConsultSlots()
  const dispatch = useDispatch()
  const [snackbar, setSnackbar] = useState({
    text: '',
    color: '#fff',
    textColor: '#000',
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
    await consultItem({code: data})
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
          textColor: data.status === 200 ? '#fff' : data.status === 404 ? '#000' : '#fff',
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

  useEffect(() => {
    if (currentAmountPicked === Number(selectedOrder.itemCount) ) {
      setCompleteOrderModal(true);
    }
  }, [currentAmountPicked, selectedOrder])


  function handleTouch(item) {
    console.log(item);
  }

  async function handleFinishOrder() {
    await changeStatus(({
      idOrder: selectedOrder._id,
      idStatus: orderStatus.picked
    }))
    dispatch(resetAmount())
    navigation.goBack()
  }

  useEffect(() => {
    return navigation.addListener('focus', (event) => {
      getSlotsOrder({
        idOrder: selectedOrder._id
      })
    });
  }, [navigation])

  return (
    <View style={styles.container}>
      <HeaderNavigation navigation={navigation} title='Detalle de orden'/>
      {
        !orderSlotsLoading && orderSlotsData && orderSlotsData.length > 0 &&
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetailSlots', {idOrder: selectedOrder._id})} style={{ width: '100%', backgroundColor: indicator ? 'green' : 'yellow', padding: 10 }}>
          <Text style={{ color: indicator ? '#fff' : '#000', fontSize: 22, textAlign: 'center' }}>
            {indicator ?  'STOCK DISPONIBLE' : 'STOCK NO DISPONIBLE'}
          </Text>
        </TouchableOpacity>
      }
      {
        orderSlotsLoading &&
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' color='#311def' />
        </View>
      }
      <OrderDetailResume item={selectedOrder} fn={() => setMetaDataModal(!metaDataModal)}/>

      {
        selectedOrder.ff_statusOrder === orderStatus.picking &&
        <View style={{
          alignItems: 'center'
        }}>
          <Text style={{fontSize: 22}}>Items: {currentAmountPicked} / {selectedOrder.itemCount}</Text>
          <View style={styles.progressBar}>
            <Animated.View style={[StyleSheet.absoluteFill, {
              backgroundColor: "#95A9F7",
              width: `${currentAmountPicked * 100 / selectedOrder.itemCount}%`
            }]}/>
          </View>
        </View>
      }
      <ScrollView>
        {
          selectedOrder.ff_statusOrder === orderStatus.picking &&
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
        }
        <View style={styles.listContainer}>
          <Text style={{
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
            paddingTop: 10
          }}>Contenido de la orden</Text>
          {
            selectedOrder !== {} && selectedOrder.items.map((item, index) => (
              <OrderItemBox item={item} index={index} length={selectedOrder.items.length} key={item.SKU + index}
                            fn={handleTouch}/>
            ))
          }
        </View>
      </ScrollView>
      {
        !loading && selectedOrder.ff_statusOrder === orderStatus.assigned &&
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.initButton} onPress={() => {
            changeStatus(({
              idOrder: selectedOrder._id,
              idStatus: orderStatus.picking
            }))
          }}>
            <Text style={{color: '#fff', fontSize: 24}}>iniciar picking</Text>
          </TouchableOpacity>
        </View>
      }
      {
        loading &&
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large' color='#311DEF'/>
        </View>
      }
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
        top: 40,
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
        <Text style={{color: snackbar.textColor, fontSize: 18}}>{snackbar.message}</Text>
      </Animated.View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={completeOrderModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Se completo la orden!</Text>
            <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 10}}>El estado de la orden se cambiara a PICKED</Text>
            <TouchableOpacity style={{backgroundColor: '#311def', borderRadius: 10, marginBottom: 10}}
                       onPress={() => handleFinishOrder()}>
              <Text style={styles.loginText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={metaDataModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.metaDataModalView}>
            <Text style={styles.modalText}>MetaData</Text>
            <ScrollView style={{ height: 400 }}>
              <Text>
                {JSON.stringify(selectedOrder.metadata, null, 2)}
              </Text>
            </ScrollView>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              {/*<TouchableOpacity style={{backgroundColor: '#311def', borderRadius: 10, flex: 1}}*/}
              {/*           onPress={() => {}}>*/}
              {/*  <Text style={styles.loginText}>Copiar</Text>*/}
              {/*</TouchableOpacity>*/}
              <TouchableOpacity style={{backgroundColor: '#311def', borderRadius: 10, flex: 1}}
                         onPress={() => setMetaDataModal(false)}>
                <Text style={styles.loginText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
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
  },
  initButton: {
    backgroundColor: '#311DEF',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  modalText: {
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center"
  },
  metaDataModalView: {
    margin: 20,
    width: 350,
    height: 600,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalView: {
    margin: 20,
    width: 250,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
