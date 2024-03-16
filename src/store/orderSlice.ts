import { createSlice } from "@reduxjs/toolkit";
import { Data } from "../utils/data";

const initialState = {
    orders: Data,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        deleteOrder: (state, action) => {
            const { id } = action.payload;
            state.orders = state.orders.filter(
                (order) => order.id !== id
            );
        },
        updateOrder: (state, action) => {
            const index = state.orders.findIndex(
                (order) => order.id === action.payload.id
            );
            state.orders[index] = action.payload;
        },
    },
});

export const { addOrder, deleteOrder, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;