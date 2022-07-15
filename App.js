import {StatusBar} from 'expo-status-bar';
import {store} from "./redux/store";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider as ReduxProvider} from "react-redux";
import RootNavigation from "./navigation";
import {AuthProvider} from "./context/auth/AuthContext";
import {ClientsProvider} from "./context/clients/ClientsContext";
import {SlotsProvider} from "./context/slots/SlotsContext";
import {NavigationContainer} from "@react-navigation/native";
import {ScannerProvider} from "./context/scanner/ScannerContext";
import {FulfillmentProvider} from "./context/fulfillment/FulfillmentContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ReduxProvider store={store}>
          <AuthProvider>
            <ClientsProvider>
              <SlotsProvider>
                <FulfillmentProvider>
                  <ScannerProvider>
                    <RootNavigation/>
                    <StatusBar backgroundColor='#F7F7FA'/>
                  </ScannerProvider>
                </FulfillmentProvider>
              </SlotsProvider>
            </ClientsProvider>
          </AuthProvider>
        </ReduxProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
