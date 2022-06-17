import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectClientScreen from '../screens/SelectClientScreen';
import SelectSlotScreen from '../screens/SelectSlotScreen';
import ScannerListScreen from "../screens/ScannerListScreen";

export default function RegisterNavigator() {

  const Stack = createNativeStackNavigator();
  return (
      <>
        <Stack.Navigator
          initialRouteName="SelectClient"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="SelectClient"
            component={SelectClientScreen}
          />
          <Stack.Screen
            name="SelectSlot"
            component={SelectSlotScreen}
          />
          <Stack.Screen
            name="ScannerList"
            component={ScannerListScreen}
          />

        </Stack.Navigator>
      </>
  )
}
