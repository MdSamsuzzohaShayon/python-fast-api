import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice.js';
import userReducer from './slices/userSlice.js';
import elementsReducer from './slices/elementsSlice.js';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        elements: elementsReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, }),
});

console.log("Initial state: ", store.getState());


export default store;