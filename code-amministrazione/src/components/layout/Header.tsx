import { Link } from 'react-router-dom'
import { Row } from 'reactstrap'
import { useTranslation } from 'react-i18next'

import { ReactComponent as CategoriesIcon } from '@/assets/icons/listing.svg'
import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg'
import { ReactComponent as LogoutIcon } from '@/assets/icons/sign-out.svg'
import { ReactComponent as SlidersIcon } from '@/assets/icons/sliders.svg'
import { ReactComponent as UsersIcon } from '@/assets/icons/users.svg'
import { ReactComponent as VotesIcon } from '@/assets/icons/bar-graph.svg'
import Logo from '@/assets/images/Logo_Lucca_Crea_2021.png'

import { useLogoutMutation } from '@/services/api/auth'

import { useAppSelector } from '@/redux/store'
import { selectAuthUser } from '@/redux/reducers/authReducer'

type HeaderProps = {
  userImg?: string
}

export default function Header(props: HeaderProps) {
  const { t } = useTranslation()

  const refreshToken = useAppSelector((state) => state.auth.refresh?.token)
  const userDetails = useAppSelector(selectAuthUser)

  const [logout] = useLogoutMutation()


  const handleLogout = () => {
    if (!refreshToken) return
    logout({ refreshToken })
  }

  return (
    <div className="bg-primary">
      <div className="header ps-0 ps-md-5 pe-0 pe-md-5 pt-2 pb-2 pt-md-0 pb-md-0">
        <Row style={{ height: 'auto' }} className="m-0">
          <div className="d-md-flex flex-md-row pt-1 pb-1 row-md">
            <div className="d-md-flex header-logo-div me-auto col-2 float-start float-start">
              <div>
                <Link to="/">
                  <img style={{ height: 65, maxWidth: '100%', maxHeight: '100%' }} src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>

            <div className="d-md-flex flex-md-row ps-md-3">
              <div className="header-btn-menu justify-content-md-end justify-content-center d-flex flex-md-row col-9">
                <Link to="/">
                  <div>
                    <HomeIcon style={{ height: '100%', minWidth: '28', fill: '#fff' }} />
                  </div>
                  <div>{t('Home')}</div>
                </Link>

                <Link to="/dashboard">
                  <div>
                    <VotesIcon
                      style={{
                        height: '30px',
                        width: '30px',
                        fill: '#fff',
                      }}
                    />
                  </div>
                  <div>{t('Dashboard')}</div>
                </Link>
                <Link to="/pavilions">
                  <div>
                    <CategoriesIcon
                      style={{
                        height: '100%',
                        minWidth: '28',
                        fill: '#fff',
                        scale: '1.5',
                      }}
                    />
                  </div>
                  <div>{t('Pavilions')}</div>
                </Link>
                <Link to="/slides">
                  <div>
                    <SlidersIcon
                      style={{
                        height: '100%',
                        minWidth: '28px',
                        fill: '#fff',
                      }}
                    />
                  </div>
                  <div>{t('Slides')}</div>
                </Link>
                <Link to="/users">
                  <div>
                    <UsersIcon />
                  </div>
                  <div>{t('Users')}</div>
                </Link>
              </div>
              <div className="d-flex header-user-div">
                <div className={props.userImg ? 'avatar-md' : 'user-avatar-div avatar-md'}>
                  {props.userImg ? (
                    <img src={props.userImg} alt="User" className="rounded-circle profile-img" />
                  ) : (
                    <div>
                      {userDetails
                        ? userDetails.name[0].toUpperCase() + userDetails.surname[0].toUpperCase()
                        : localStorage.getItem('name') && localStorage.getItem('surname')
                        ? localStorage.getItem('name')![0].toUpperCase() + localStorage.getItem('surname')![0].toUpperCase()
                        : ''}
                    </div>
                  )}
                </div>
                <div className="text-white d-flex">
                  <div style={{ maxWidth: '120px', overflow: 'hidden' }}>
                    {(userDetails ? userDetails.name : localStorage.getItem('name') ? localStorage.getItem('name') : '') +
                      ' ' +
                      (userDetails ? userDetails.surname : localStorage.getItem('surname') ? localStorage.getItem('surname') : '')}
                  </div>
                  <div className="ms-md-3 clickable">
                    <LogoutIcon onClick={handleLogout} style={{ width: '20px', height: '20px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </div>
  )
}
