import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Loader from './components/Loader';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
