import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/theme.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import './i18n';

// loading component for suspense fallback
const Loader = () => (
  <div className="App2">
    <img src="/loader.gif" className="app-loader" alt="loader" />
    <div>loading...</div>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
