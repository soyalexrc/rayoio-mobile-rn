import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SearchItemScreen from "../screens/SearchItemScreen";
import FulfillmentListScreen from "../screens/FulfillmentListScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";

export default function FulfillmentNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    <>
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

      </Stack.Navigator>
    </>
  )
}
