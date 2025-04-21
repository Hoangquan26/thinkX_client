import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

// import slice
import authReducer from "./features/auth/auth.slice";
import userReducer from "./features/user/user.slice"
console.log(authReducer)

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;