import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function CustomHeader ({step, ...props}) {
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
