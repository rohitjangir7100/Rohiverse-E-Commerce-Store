import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'; // adjust the path if needed
import './index.css'; // import your global styles
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CartProvider>
        <App />
    </CartProvider>
  </Provider>
);
