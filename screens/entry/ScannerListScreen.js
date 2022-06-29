import { FlatList, StyleSheet, View, Text} from "react-native";
import HeaderNavigation from "../../components/HeaderNavigation";
import {useSelector} from "../../redux/store";


export default function ScannerListScreen({navigation}) {
  const scannedItems = useSelector(state => state.scannedItems.items);
  return (
    <View style={styles.container}>
      <HeaderNavigation navigation={navigation} title='Items escaneados' />
      <View style={styles.list}>
        {
          scannedItems.length < 1 &&
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>No hay items escaneados</Text>
          </View>
        }
        {
          scannedItems.length > 0 &&
          <FlatList
            data={scannedItems}
            renderItem={(item) => ScannedItemBox(item)}
            keyExtractor={item => item._id}
          />
        }
      </View>
    </View>
  )
}

function ScannedItemBox(item) {
  console.log(item)
  return (
    <Text>hello world</Text>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 20,
  },
});
