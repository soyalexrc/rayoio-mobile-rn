import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotFoundScreen from "../screens/NotFoundScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigation";
import HomeNavigation from "./HomeNavigation";
import ReceptionScannerScreen from "../screens/scanner/ReceptionScannerScreen";
import RegularScannerScreen from "../screens/scanner/RegularScannerScreen";
import RemoveScannerScreen from "../screens/scanner/RemoveScannerScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRoute='Login'>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='SampleNavigator' component={HomeNavigation} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ReceptionScanner"
          component={ReceptionScannerScreen}
        />
        <Stack.Screen
          name="RegularScanner"
          component={RegularScannerScreen}
        />
        <Stack.Screen
          name="RemoveScanner"
          component={RemoveScannerScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
