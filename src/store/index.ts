import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
    },
});
