import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import itemSlice from "./ItemSlice";
import sessionStorage from "redux-persist/es/storage/session";
import userSlice from "./UserSlice";
import categorySlice from "./CategorySlice";
import responseSlice from "./ResponseSlice";
import  messageSlice  from "./MessageSlice";

const reducers = {
  items: itemSlice,
  users: userSlice,
  categories: categorySlice,
  responses: responseSlice,
  messages:messageSlice
}
const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['users'],
  
  //storage: storage,
  blacklist: ['someReducerToExclude'],
  //stateReconciler: autoMergeLevel2,
  serialize: false,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);