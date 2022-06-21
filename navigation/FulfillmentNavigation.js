import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FulfillmentListScreen from "../screens/FulfillmentListScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import OrderDetailSlotsScreen from "../screens/OrderDetailSlotsScreen";

export default function FulfillmentNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="FulfillmentList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="FulfillmentList"
        component={FulfillmentListScreen}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
      />
      <Stack.Screen
        name="OrderDetailSlots"
        component={OrderDetailSlotsScreen}
      />

    </Stack.Navigator>
  )
}
