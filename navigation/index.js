import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotFoundScreen from "../screens/NotFoundScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import RegisterNavigator from '../navigation/RegisterNavigator';
import ScannerScreen from "../screens/ScannerScreen";
import RemoveScannerScreen from "../screens/RemoveScannerScreen";
import LoginScreen from "../screens/LoginScreen";
import RemoveItemScreen from "../screens/RemoveItemScreen";
import RemoveNavigation from "./RemoveNavigation";
import HomeNavigation from "./HomeNavigation";

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRoute='Login'
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="Scanner"
          component={ScannerScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="RemoveScanner"
          component={RemoveScannerScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        showLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#fff',
          borderRadius: 35,
          height: 90,
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
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4354DD' : '#BCC3D0'
                }}
              />
              <Text style={{ color: focused ? '#4354DD' : '#BCC3D0' }}>HOME</Text>
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
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Image
                source={require('../assets/icons/entry-icon.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4354DD' : '#BCC3D0'
                }}
              />
              <Text style={{ color: focused ? '#4354DD' : '#BCC3D0' }}>INGRESO</Text>
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
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4354DD' : '#BCC3D0'
                }}
              />
              <Text style={{ color: focused ? '#4354DD' : '#BCC3D0' }}>REMOVER</Text>
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
