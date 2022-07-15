import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectClientScreen from '../screens/entry/SelectClientScreen';
import SelectSlotScreen from '../screens/entry/SelectSlotScreen';
import ReceptionScannerListScreen from "../screens/entry/ReceptionScannerListScreen";
import TypeRegisterScreen from "../screens/entry/TypeRegisterScreen";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import ReceptionScreen from "../screens/entry/ReceptionScreen";
import RegularScannerListScreen from "../screens/entry/RegularScannerListScreen";
import CustomHeader from "../components/CustomHeader";

export default function RegisterNavigator() {

  const Stack = createNativeStackNavigator();
  return (
      <>
        <Stack.Navigator initialRouteName="TypeRegister">
          <Stack.Screen
            name="SelectClient"
            initialParams={{ type: 'register' }}
            component={SelectClientScreen}
            options={{
              header: (props) => <CustomHeader {...props} step={1} />
            }}
          />
          <Stack.Screen
            name="TypeRegister"
            component={TypeRegisterScreen}
            options={{
              header: (props) => <CustomHeader {...props} step={0} />
            }}
          />
          <Stack.Screen
            name="Reception"
            component={ReceptionScreen}
            options={{
              header: (props) => <CustomHeader {...props} step={1} />
            }}
          />
          <Stack.Screen
            name="SelectSlot"
            component={SelectSlotScreen}
            options={{
              header: (props) => <CustomHeader {...props} step={2} />
            }}
          />
          <Stack.Screen
            name="ScannerList"
            component={ReceptionScannerListScreen}
            options={{
              header: (props) => <CustomHeader {...props} step={3} />
            }}
          />

          <Stack.Screen
            name="RegularScannerList"
            component={RegularScannerListScreen}
            options={{
              header: (props) => <CustomHeader {...props} step={3} />
            }}
          />

        </Stack.Navigator>
      </>
  )
}
