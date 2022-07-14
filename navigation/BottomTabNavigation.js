import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeNavigation from "./HomeNavigation";
import {Image, StyleSheet, Text, View} from "react-native";
import RegisterNavigator from "./RegisterNavigator";
import FulfillmentNavigation from "./FulfillmentNavigation";
import RemoveNavigation from "./RemoveNavigation";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        showLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 5,
          left: 5,
          right: 5,
          elevation: 0,
          backgroundColor: '#fff',
          borderRadius: 35,
          height: 60,
          ...styles.shadow
        }
      }}
    >
      <BottomTab.Screen
        name="Home"
        screenOptions={{headerShown:false }}
        component={HomeNavigation}
        options={({ navigation }) => ({
          headerShown: false,
          title: '',
          tabBarIcon: ({focused}) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/home.png')}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#4354DD' : '#BCC3D0'
                }}
              />
              <Text style={{ color: focused ? '#4354DD' : '#BCC3D0', fontSize: 10  }}>.</Text>
            </View>
          ),
          // ...horizontalAnimation
        })}
      />
      <BottomTab.Screen
        name="Register"
        screenOptions={{headerShown:false }}
        component={RegisterNavigator}
        options={({ navigation }) => ({
          tabBarStyle: {display: 'none'},
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/entry-icon.png')}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#4354DD' : '#BCC3D0'
                }}
              />
              <Text style={{ color: focused ? '#4354DD' : '#BCC3D0', fontSize: 10  }}>.</Text>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="Fulfillment"
        screenOptions={{headerShown:false }}
        component={FulfillmentNavigation}
        options={({ navigation }) => ({
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/fulfillment.png')}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#4354DD' : '#BCC3D0'
                }}
              />
              <Text style={{ color: focused ? '#4354DD' : '#BCC3D0', fontSize: 10  }}>.</Text>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="Remove"
        screenOptions={{headerShown:false }}
        component={RemoveNavigation}
        options={({ navigation }) => ({
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/remove-icon.png')}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#4354DD' : '#BCC3D0'
                }}
              />
              <Text style={{ color: focused ? '#4354DD' : '#BCC3D0', fontSize: 10 }}>.</Text>
            </View>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})
