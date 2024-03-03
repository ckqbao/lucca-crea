import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Layout from './layouts/Layout'
import CategoriesPage from './pages/categories/CategoriesPage'
import CommissionsPage from './pages/commissions/CommissionsPage'
import ParticipantsPage from './pages/participants/ParticipantsPage'
import ProjectPage from './pages/project/ProjectPage'
import RulesPage from './pages/rules/RulesPage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId/participants" element={<ParticipantsPage />} />
          <Route path="/commissions" element={<CommissionsPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route index element={<Navigate to="/categories" />} />
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

export default App
