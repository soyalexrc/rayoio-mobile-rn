import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import SearchItemScreen from "../screens/home/SearchItemScreen";
import {Text, View, Image, TouchableOpacity, StyleSheet} from "react-native";

export default function HomeNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          // headerShown: false,
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            header: (props) => <HomeHeader {...props}/>
          }}
        />
        <Stack.Screen
          name="SearchItems"
          component={SearchItemScreen}
          options={{
            header: (props) => <SearchHeader {...props}/>
          }}
        />

      </Stack.Navigator>
    </>
  )
}


const HomeHeader = (props) => {
  return (
    <View style={styles.logoRow}>
      <Image
        source={require('../assets/icons/rayo-logo.png')}
        resizeMode='contain'
        style={{width: 120, marginTop: 15}}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.navigate('SearchItems')}>
        <Image
          source={require('../assets/icons/search-icon.png')}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  )
}
const SearchHeader = (props) => {
  return (
    <View style={styles.searchRow}>
      <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
        <Image
          source={require('../assets/icons/arrow-back.png')}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <View style={{ height: 35 }}/>
    </View>
  )
}


const styles  = StyleSheet.create({
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
    padding: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    backgroundColor: '#F7F7FA',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  searchRow: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  }
})

