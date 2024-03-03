import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Layout from './components/layout/Layout'

import HomePage from './pages/home/HomePage'
import DashboardPage from './pages/dashboard/DashboardPage'
import LoginPage from './pages/login/LoginPage'
import PavilionsPage from './pages/pavilions/PavilionsPage'
import SlidesPage from './pages/slides/SlidesPage'
import UsersPage from './pages/users/UsersPage'

import { useAppSelector } from './redux/store'
import { selectIsAuthenticated } from './redux/reducers/authReducer'

function RequireAuth(props: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return props.children
}

function App() {
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
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pavilions" element={<PavilionsPage />} />
          <Route path="slides" element={<SlidesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
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
