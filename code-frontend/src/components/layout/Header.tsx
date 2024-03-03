import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row } from 'reactstrap'

import logo from '@/assets/images/code-frontend-logo.png'

import LegendModal from '../modals/LegendModal'
import clsx from 'clsx'

type HeaderProps = {
  userImg?: string
}

export default function Header(props: HeaderProps) {
  const navigate = useNavigate()

  const [isLegendModalOpen, setIsLegendModalOpen] = useState(false)
  const [top, setTop] = useState(true)

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <div className={clsx('sticky-top tw-bg-[#f5f8e5]', { 'tw-shadow-md': !top })}>
      <div className="header bg-primary ps-0 ps-md-5 pe-0 pe-md-5 pt-2 pb-2 pt-md-0 pb-md-0">
        <Row style={{ height: 'auto' }} className="m-0">
          <div className="d-flex flex-row justify-content-between pt-1 pb-1">
            <button
              className="tw-flex tw-items-center tw-justify-center tw-bg-red-600 tw-border-2 tw-border-[#171905] tw-px-4 tw-py-2 tw-rounded-3xl tw-text-base tw-text-[#F5F8E5]"
              onClick={() => navigate('/map')}
            >
              Vai alla mappa
            </button>
            <Button className="bg-white text-red" onClick={() => setIsLegendModalOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                />
              </svg>
            </Button>
          </div>
        </Row>
      </div>
      <div className="d-flex align-items-center justify-content-center mb-1">
        <img src={logo} alt="logo" width="200" height="auto" />
      </div>
      <LegendModal isOpen={isLegendModalOpen} setIsOpen={setIsLegendModalOpen} />
    </div>
  )
}
