import { combineReducers, configureStore } from '@reduxjs/toolkit'
import serviceReducer from './serviceSlice.js'
import userReducer from './userSlice.js'
import menuReducer from './menuSlice.js'
import orderReducer from './orderSlice.js'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,

} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 2,
    storage,
}
const rootReducer = combineReducers({
    service: serviceReducer,
    user: userReducer,
    menu: menuReducer,
    order: orderReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export default store