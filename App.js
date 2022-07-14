import {StatusBar} from 'expo-status-bar';
import {store} from "./redux/store";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider as ReduxProvider} from "react-redux";
import RootNavigation from "./navigation";
import {AuthProvider} from "./context/auth/AuthContext";
import {ClientsProvider} from "./context/clients/ClientsContext";
import {SlotsProvider} from "./context/slots/SlotsContext";
import {NavigationContainer} from "@react-navigation/native";
import {StepperProvider} from "./context/stepper/StepperContext";
import {ScannerProvider} from "./context/scanner/ScannerContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ReduxProvider store={store}>
          <AuthProvider>
            <ClientsProvider>
              <SlotsProvider>
                <StepperProvider>
                  <ScannerProvider>
                    <RootNavigation/>
                    <StatusBar backgroundColor='#F7F7FA'/>
                  </ScannerProvider>
                </StepperProvider>
              </SlotsProvider>
            </ClientsProvider>
          </AuthProvider>
        </ReduxProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
