'use client'
import { configureStore, Tuple, combineReducers} from '@reduxjs/toolkit'
import logger from "redux-logger";
//import counterSlice from '../reducerSlices/counterSlice';
//import boxSlice from '../reducerSlices/boxSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from '../reducerSlices/userSlice';



const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({ 
   // counter: counterSlice,
    //box: boxSlice,
   user: userSlice
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

 export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => new Tuple(logger),
})


export const persistor = persistStore(store)