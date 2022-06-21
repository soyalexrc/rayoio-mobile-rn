import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RemoveItemScreen from "../screens/exit/RemoveItemScreen";
import SelectSlotRemoveScreen from "../screens/exit/SelectSlotRemoveScreen";

export default function RemoveNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="RemoveItems"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SelectSlotRemove"
          component={SelectSlotRemoveScreen}
        />
        <Stack.Screen
          name="RemoveItems"
          component={RemoveItemScreen}
        />

      </Stack.Navigator>
    </>
  )
}
