import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

import { ReactComponent as BgCurve } from '@/assets/svg/bg-curve.svg'

export default function Layout() {
  const [topBar, setTopBar] = useState(null)

  return (
    <div className="min-h-full flex flex-col">
      <div className="fixed -z-10 w-full h-full md:flex justify-between">
        <BgCurve className="hidden md:block absolute -z-20 md:top-20 lg:top-28 left-0 -translate-x-[55%]" />
        <BgCurve className="hidden md:block absolute -z-20 md:top-16 lg:top-20 right-0 translate-x-[55%] -rotate-[25deg]" />
        <BgCurve className="md:hidden w-60 h-auto absolute -z-20 -top-24 -right-28 -rotate-[110deg]" />
      </div>
      <div className='sticky top-0 z-appBar w-full'>
        <Header />
        {topBar}
      </div>
      <div className="flex-1">
        <Outlet context={[topBar, setTopBar]} />
      </div>
      <Footer />
    </div>
  )
}
