import { combineReducers } from "redux";
// slices
import loginReducer from "./slices/login";
import ClientsReducer from "./slices/clients";
import SlotsReducer from "./slices/slots";

// ----------------------------------------------------------------------


const rootReducer = combineReducers({
  login: loginReducer,
  clients: ClientsReducer,
  slots: SlotsReducer
});

export { rootReducer };
