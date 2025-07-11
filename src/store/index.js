import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
store.subscribe(() => {
    localStorage.setItem('cart_items', JSON.stringify(store.getState().cart.items));
});

export default store;