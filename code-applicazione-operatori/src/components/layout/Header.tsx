import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Logo from '@/assets/img/Logo_Lucca_Crea_2021.png'
import { ReactComponent as SignoutIcon } from '@/assets/svg/sign-out.svg'

import { useLogoutMutation } from '@/services/api/auth'

import { useAppSelector } from '@/redux/store'
import { selectIsAuthenticated, selectOperator } from '@/redux/reducers/auth.reducer'

export default function Header() {
  const { t } = useTranslation()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const refreshToken = useAppSelector((state) => state.auth.refresh?.token)
  const operator = useAppSelector(selectOperator)

  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    if (!refreshToken) return
    logout({ refreshToken })
  }

  return (
    <div style={{ background: 'transparent radial-gradient(closest-side at 50% 50%, #92AD4F 0%, #495728 130%) 0% 0% no-repeat padding-box' }}>
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center justify-center">
          <Link to="/categories">
            <img src={Logo} alt="Logo" className="w-auto h-14" />
          </Link>
        </div>
        {isAuthenticated && (
          <>
            <div>
              <button className="bg-[#FFCE00] border border-[#707070] px-5 py-2 rounded-lg text-sm text-[#171905]" onClick={handleLogout}>
                {t('Change Pavilion')}
              </button>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
                <div className="font-medium leading-none text-white">
                  {operator
                    ? operator.name[0].toUpperCase() + operator.surname[0].toUpperCase()
                    : localStorage.getItem('name') && localStorage.getItem('surname')
                    ? localStorage.getItem('name')![0].toUpperCase() + localStorage.getItem('surname')![0].toUpperCase()
                    : ''}
                </div>
              </div>
              <div className="text-white d-flex">
                <SignoutIcon onClick={handleLogout} style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
