import { Outlet } from 'react-router-dom'

import Header from './Header'

export default function Layout() {
  return (
    <div className="w-100 h-100">
      <Header />
      <Outlet />
    </div>
  )
}
