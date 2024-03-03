import { Link, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Layout from './components/layout/Layout'

import HomePage from './pages/home/HomePage'
import MapPage from './pages/map/MapPage'
import TotemPage from './pages/totem/TotemPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/map" element={<MapPage />} />
        <Route path="/totem" element={<TotemPage />} />
        <Route path="*" element={<NoMatch />} />
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
