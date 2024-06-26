import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Layout from "./components/Layouts/Layout";
import CartProvider from "./context/CartProvider";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <React.StrictMode>
        <Layout>
          <App />
        </Layout>
      </React.StrictMode>
    </CartProvider>
  </BrowserRouter>
);
