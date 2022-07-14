import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectClientScreen from '../screens/entry/SelectClientScreen';
import SelectSlotScreen from '../screens/entry/SelectSlotScreen';
import ScannerListScreen from "../screens/entry/ScannerListScreen";
import TypeRegisterScreen from "../screens/entry/TypeRegisterScreen";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {StepperContext} from "../context/stepper/StepperContext";
import {  useContext} from 'react';
import ReceptionScreen from "../screens/entry/ReceptionScreen";

export default function RegisterNavigator() {

  const Stack = createNativeStackNavigator();
  return (
      <>
        <Stack.Navigator
          initialRouteName="TypeRegister"
          screenOptions={{
            // headerShown: false,
          }}
        >
          <Stack.Screen
            name="SelectClient"
            component={SelectClientScreen}
            options={{
              header: (props) => <CustomHeader {...props} step={1} />
            }}
          />
          <Stack.Screen
            name="TypeRegister"
            options={{
              header: (props) => <CustomHeader {...props} step={0} />
            }}
            component={TypeRegisterScreen}
          />
          <Stack.Screen
            name="Reception"
            options={{
              header: (props) => <CustomHeader {...props} step={1} />
            }}
            component={ReceptionScreen}
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
            component={ScannerListScreen}
            options={{
              header: (props) => <CustomHeader {...props} step={3} />
            }}
          />

        </Stack.Navigator>
      </>
  )
}

const CustomHeader = ({step, ...props}) => {
  console.log(step);
  // const {steps} = useContext(StepperContext);
  // console.log(steps.step);
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.backButton}>
        <Image source={require('../assets/icons/short-arrow-back.png')} style={{width: 16, height: 16}}/>
        <Text style={styles.backButtonText}>Home</Text>
      </TouchableOpacity>
      <View style={styles.stepperContainer}>
        {step === 0 && <Image source={require('../assets/images/stepper-disabled.png')}/>}
        {step === 1 && <Image source={require('../assets/images/stepper-1.png')}/>}
        {step === 2 && <Image source={require('../assets/images/stepper-2.png')}/>}
        {step === 3 && <Image source={require('../assets/images/stepper-3.png')}/>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,
    // backgroundColor: 'red',
    backgroundColor: '#F7F7FA',
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    margin: 10,
  },
  backButtonText: {
    color: '#2A1ED6',
    fontSize: 12
  },
  stepperContainer: {
    alignItems: 'center',
  }
})
