import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './styles/index.css'; // Tailwind styles
import ErrorBoundary from './ErrorBoundary';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <ErrorBoundary>
        <App />
      </ErrorBoundary>
      </React.StrictMode>
    </Provider>
);
