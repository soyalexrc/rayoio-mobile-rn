import {StatusBar} from 'expo-status-bar';
import {store} from "./redux/store";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider as ReduxProvider} from "react-redux";
import Navigation from "./navigation";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <Navigation/>
        <StatusBar/>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
