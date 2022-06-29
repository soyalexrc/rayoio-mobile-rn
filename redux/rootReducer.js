import { combineReducers } from "redux";
// slices
import loginReducer from "./slices/login";
import ClientsReducer from "./slices/clients";
import SlotsReducer from "./slices/slots";
import OrdersReducer from "./slices/orders";
import ScannedItems from "./slices/scannedItems";

// ----------------------------------------------------------------------


const rootReducer = combineReducers({
  login: loginReducer,
  clients: ClientsReducer,
  slots: SlotsReducer,
  orders: OrdersReducer,
  scannedItems: ScannedItems,
});

export { rootReducer };
