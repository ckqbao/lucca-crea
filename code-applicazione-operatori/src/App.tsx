import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { ReactComponent as WifiOffIcon } from '@/assets/svg/wifi-off.svg'

import Layout from './components/layout/Layout'

import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'

import { useAppSelector } from './redux/store'
import { selectIsAuthenticated } from './redux/reducers/auth.reducer'

function RequireAuth(props: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return props.children
}

function App() {
  const { t } = useTranslation()

  const previousOnline = useRef(navigator.onLine)

  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    function handleOnline() {
      setOnline(true)
    }
    function handleOffline() {
      setOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (!previousOnline.current && online) {
      toast(t("You're online now"))
    }
    if (!online) {
      toast(t('You need an internet connection to use the application'), {
        icon: <WifiOffIcon className="w-8 h-8" />,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        duration: 5000,
      })
    }
    previousOnline.current = online
  }, [online, t])

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
    </>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

export default App
