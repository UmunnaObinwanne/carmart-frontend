import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/Slices/UserSlice";
import authReducer from "../src/Slices/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import {
  advertsReducer,
  advertDetailReducer,
  userAdvertsReducer,
} from "../src/Slices/AdvertSlices";

const userPersistConfig = {
  key: "user",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const advertsPersistConfig = {
  key: "adverts",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedAdvertsReducer = persistReducer(
  advertsPersistConfig,
  advertsReducer
);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    auth: persistedAuthReducer,
    adverts: persistedAdvertsReducer,
    advertDetail: advertDetailReducer,
    userAdverts: userAdvertsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
