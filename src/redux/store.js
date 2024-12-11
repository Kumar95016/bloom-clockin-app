import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/authSlice';
import loadingReducer from './slice/loadingSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        loader: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({

            serializableCheck: false,
        }),
});
