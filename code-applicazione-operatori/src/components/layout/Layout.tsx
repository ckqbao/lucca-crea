import { Outlet } from 'react-router-dom'

import Header from './Header'

export default function Layout() {
  return (
    <div className="h-full flex flex-col" style={{ background: 'transparent radial-gradient(closest-side at 50% 50%, #435136 0%, #0D100B 100%) 0% 0% no-repeat padding-box' }}>
      <Header />
      <Outlet />
    </div>
  )
}
