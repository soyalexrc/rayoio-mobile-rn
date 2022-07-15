import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectClientScreen from "../screens/entry/SelectClientScreen";
import SelectSlotScreen from "../screens/entry/SelectSlotScreen";
import RegularScannerListScreen from "../screens/entry/RegularScannerListScreen";
import CustomHeader from "../components/CustomHeader";
import RemoveScannerListScreen from "../screens/entry/RemoveScannerListScreen";

export default function RemoveNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="SelectClient"
      >
        <Stack.Screen
          name="SelectClient"
          initialParams={{type: 'remove'}}
          component={SelectClientScreen}
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
          name="RemoveScannerList"
          component={RemoveScannerListScreen}
          options={{
            header: (props) => <CustomHeader {...props} step={3} />
          }}
        />

      </Stack.Navigator>
    </>
  )
}
