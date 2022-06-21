import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function ClientBox(client, fn) {
  return (
    <TouchableOpacity style={styles.button}
                      onPress={() => fn(client.item)}
    >
      <Image
        style={{width: 50, height: 50}}
        resizeMode='contain'
        source={{uri: client.item.image_customer}}
      />
      <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{client.item.name_customer}</Text>
        <Text style={{fontSize: 14}}>{client.item.business_name_customer}</Text>
        <Text style={{fontSize: 12}}>{client.item.rut_customer}</Text>
        <Text style={{fontSize: 12}}>{client.item.mail_customer}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 30,
    marginHorizontal: 20,
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
