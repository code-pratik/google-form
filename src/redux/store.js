import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import formSlice from "../slices/formSlice";
const persistConfig = { key: "root", storage };
const rootReducer = combineReducers({
  formData: formSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
