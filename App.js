import {StatusBar} from 'expo-status-bar';
import {store} from "./redux/store";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider as ReduxProvider} from "react-redux";
import Navigation from "./navigation";
import {AuthProvider} from "./context/auth/AuthContext";
import {ClientsProvider} from "./context/clients/ClientsContext";
import {SlotsProvider} from "./context/slots/SlotsContext";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ReduxProvider store={store}>
          <AuthProvider>
            <ClientsProvider>
              <SlotsProvider>
                <Navigation/>
                <StatusBar backgroundColor='#607CEE29'/>
              </SlotsProvider>
            </ClientsProvider>
          </AuthProvider>
        </ReduxProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
