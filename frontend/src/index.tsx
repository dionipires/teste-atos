// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log); // Passando console.log como callback
