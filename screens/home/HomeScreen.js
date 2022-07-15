import {StyleSheet, Image, View, Text, TouchableOpacity, ScrollView} from "react-native";
import {useEffect, useContext} from "react";

import useGetOrders from "../../hooks/useGetOrders";
import {AuthContext} from "../../context/auth/AuthContext";


export default function HomeScreen({navigation}) {
  const {authState, logout} = useContext(AuthContext);
  const {data, getOrders, loading} = useGetOrders()


  useEffect(() => {
    return navigation.addListener('focus', (event) => {
      getOrders({
        userMail: authState.user.email,
        idWarehouse: authState.user.idWarehouse
      })
    });
  }, [navigation])


  function getNameFromEmail(email) {
    return email.split('@')[0]
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <Image
            source={require('../../assets/images/rayouser.png')}
            resizeMode='contain'
            style={{width: 40}}
          />
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1
            }}>Hola, {getNameFromEmail(authState.user.email)}!</Text>
            <Text style={{color: '#B0B3BA', fontSize: 14}}>Bienvenido de vuelta</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <Image
              source={require('../../assets/icons/exit-icon.png')}
              style={{ width: 25, height: 25 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{
            fontSize: 18,
            color: '#311DEF',
            letterSpacing: 2,
            fontWeight: 'bold'
          }}>{authState.user.nameWarehouse}</Text>
        </View>
      </View>
      <View style={styles.notificationsContainer}>
        <View
          style={styles.notifications}>
          <Text style={{color: '#fff', fontSize: 18}}>Hoy debemos recibir nueva carga</Text>
          <Text style={{color: '#fff', fontSize: 14, marginTop: 15}}>Estan planificadas {loading && '...'} {!loading && data.length > 0 && data.length} paquetes</Text>
        </View>
      </View>
      <View style={styles.payloadContainer}>
        <View style={styles.payload}>
          <View style={styles.payloadBox}>
            <Text style={{color: '#B0B3BA'}}>CARGA INGRESADA</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>2 Bultos</Text>
          </View>
          <View style={styles.payloadBox}>
            <Text style={{color: '#B0B3BA'}}>CARGA ENTREGADA</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>0 Bultos</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
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
    marginTop: 20,
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
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  payload: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  payloadBox: {
    padding: 20,
    backgroundColor: '#fff',
    // marginLeft: 20,
    // marginRight: 20,
    marginHorizontal: 5,
    borderRadius: 15
  },
  chartContainer: {
    width: 300,
    height: 400
  },
  backButton: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
