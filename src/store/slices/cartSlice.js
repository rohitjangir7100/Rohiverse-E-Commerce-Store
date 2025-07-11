import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cart_items')) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        clearCart: state => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;