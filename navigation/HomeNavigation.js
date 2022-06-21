import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import SearchItemScreen from "../screens/home/SearchItemScreen";

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
