import { combineReducers } from "@reduxjs/toolkit"
import { classesApi } from "../features/api/classesApi"
import { attendanceApi } from "../features/api/attendanceApi"
import { studentApi } from "../features/api/studentApi"

// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage/session"; // Uses localStorage by default

export const rootReducer = combineReducers({
    [classesApi.reducerPath]: classesApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
})

// redux-persist used for store data in local storage
// export const rootReducer = combineReducers({
//     [studentApi.reducerPath]: studentApi.reducer,
//     [classesApi.reducerPath]: classesApi.reducer,
//     [attendanceApi.reducerPath]: attendanceApi.reducer,
// });

// // Persist config
// const persistConfig = {
//     key: "root",
//     storage, // Uses local storage (but only for persisting the Redux state)
//     whitelist: [studentApi.reducerPath], // Persist only studentApi data
// };

// // Create persisted reducer
// export const persistedReducer = persistReducer(persistConfig, rootReducer);