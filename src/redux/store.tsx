import { createStore } from "redux";
import { rootReducer } from "./reducer";
//@ts-expect-error
export const store =createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ / window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)