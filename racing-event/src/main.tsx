import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Importerer bootstrap til prosjektet (CSS og JS)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
