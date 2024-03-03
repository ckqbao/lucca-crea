import React from 'react'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/theme.scss'

import { persistor, store } from './redux/store.ts'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
)
