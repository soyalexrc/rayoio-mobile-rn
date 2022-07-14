import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function ScannerItemBox(item, fn) {
  return (
    <View style={styles.button}>
      <Image
        style={{width: 50, height: 50}}
        resizeMode='contain'
        // source={{uri: item.item.image_customer}}
        source={require('../assets/images/no-imagepng.png')}
      />
      <View style={{marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.item.title}</Text>
          <Text style={{fontSize: 14}}>{item.item.units}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('../assets/icons/delete-icon.png')}
            style={{
              width: 15,
              height: 15
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    marginVertical: 10
  },
});
