import {StyleSheet, Button, View, Text, useWindowDimensions} from "react-native";
import CustomSnackBar from "../../components/CustomSnackBar";
// import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { PanGestureHandler } from 'react-native-gesture-handler';
// import CustomSnackBar from '../components/CustomSnackBar';

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500
}

export default function ScannerListScreen() {
  // const dimensions = useWindowDimensions();
  //
  // const top = useSharedValue(dimensions.height)
  //
  // const gestureHandler = useAnimatedGestureHandler({});
  //
  // const style = useAnimatedStyle(() => {
  //   return {
  //     top: top.value
  //   }
  // })
  //
  // const handlePress = () => {
  //   top.value = withSpring(
  //     dimensions.height / 2, //half screen
  //     SPRING_CONFIG
  //   )
  // }

  return (
    <>
    <View style={styles.container}>
      <Button title='Open Sheet' onPress={() => {}}/>
    </View>
      <CustomSnackBar />
      {/*<CustomSnackBar />*/}
    {/*<PanGestureHandler*/}
    {/*  onGestureEvent={gestureHandler}*/}
    {/*>*/}
    {/*  <Animated.View*/}
    {/*  style={[*/}
    {/*    styles.bottomSheet,*/}
    {/*    style*/}
    {/*  ]}>*/}
    {/*  <Text>Sheet</Text>*/}
    {/*  </Animated.View>*/}
    {/*</PanGestureHandler>*/}
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
