import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FulfillmentListScreen from "../screens/fulfillment/FulfillmentListScreen";
import OrderDetailScreen from "../screens/fulfillment/OrderDetailScreen";
import OrderDetailSlotsScreen from "../screens/fulfillment/OrderDetailSlotsScreen";
import CustomHeader from "../components/CustomHeader";

export default function FulfillmentNavigation() {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="FulfillmentList" >
      <Stack.Screen
        name="FulfillmentList"
        options={{
          header: (props) => <CustomHeader {...props} step={1} />
        }}
        component={FulfillmentListScreen}
      />
      <Stack.Screen
        name="OrderDetail"
        options={{
          header: (props) => <CustomHeader {...props} step={2} />
        }}
        component={OrderDetailScreen}
      />
      <Stack.Screen
        name="OrderDetailSlots"
        options={{
          header: (props) => <CustomHeader {...props} step={3} />
        }}
        component={OrderDetailSlotsScreen}
      />

    </Stack.Navigator>
  )
}
