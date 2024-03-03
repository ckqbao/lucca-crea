import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'

import App from './App.jsx'
import { store } from './redux/store.js'
import './i18n'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
)
