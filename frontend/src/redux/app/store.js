import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { classesApi } from "../features/api/classesApi";
import { attendanceApi } from "../features/api/attendanceApi";
import { studentApi } from "../features/api/studentApi";

// import persistStore from "redux-persist/es/persistStore";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(classesApi.middleware, attendanceApi.middleware, studentApi.middleware),
});

// export const appStore = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }).concat(studentApi.middleware, classesApi.middleware, attendanceApi.middleware),
// });

// // Persist store
// export const persistor = persistStore(appStore);
