import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectClientScreen from '../screens/SelectClientScreen';
import SelectSlotScreen from '../screens/SelectSlotScreen';
import ScannerListScreen from "../screens/ScannerListScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchItemScreen from "../screens/SearchItemScreen";

export default function HomeNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="SearchItems"
          component={SearchItemScreen}
        />

      </Stack.Navigator>
    </>
  )
}
