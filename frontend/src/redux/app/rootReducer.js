import { combineReducers } from "@reduxjs/toolkit"
import { classesApi } from "../features/api/classesApi"
import { attendanceApi } from "../features/api/attendanceApi"
import { studentApi } from "../features/api/studentApi"
import { teacherApi } from "../features/api/teacherApi"
import { feeApi } from "../features/api/feeApi"
import { staffApi } from "../features/api/staffApi"


export const rootReducer = combineReducers({
    [classesApi.reducerPath]: classesApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [feeApi.reducerPath]: feeApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
})

// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage/session"; // Uses localStorage by default

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