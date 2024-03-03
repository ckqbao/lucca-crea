import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import isybank from '@/assets/img/isybank.png'

import { ReactComponent as AwardsLogo } from '@/assets/svg/awards-logo.svg'
// import { ReactComponent as IsyBankLogo } from '@/assets/svg/isybank_svg_cropped.svg'

export default function Header() {
  const { t } = useTranslation()
  return (
    <header className=" bg-white shadow-card">
      <div className="px-6 pt-3 pb-7 sm:py-12 lg:px-12 xl:px-24">
        <div className="flex flex-col space-y-4">
          <div className="flex items-end justify-between md:items-center">
            <div className="flex items-center justify-center space-x-3 xl:space-x-4 2xl:space-x-8">
              <Link to="/">
                <AwardsLogo className="w-auto h-10 md:h-14 lg:h-20 xl:h-24" />
              </Link>
              <span className="hidden w-[1px] h-9 bg-[#6EC1CE] sm:block lg:w-1 lg:h-12" />
              <Link
                className="hidden font-CocoSharp font-bold text-xl text-[#184833] uppercase hover:font-extrabold sm:block lg:text-3xl xl:text-4xl"
                to="/project"
              >
                {t('theProject')}
              </Link>
            </div>
            <div className="flex flex-col items-end space-y-2 sm:flex-row sm:items-center sm:space-y-0">
              <div className="font-bold text-xs text-[#656565]">{t('Partner Esclusivo')}</div>
              <Link to="https://www.isybank.com/" target="_blank" rel="noopener noreferrer">
                <img className="h-6 translate-x-0 md:h-10 lg:h-14 xl:h-[72px] sm:translate-x-0" src={isybank} alt="isybank" />
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center sm:hidden">
            <Link className="font-CocoSharp font-bold text-xl text-[#184833] uppercase hover:font-extrabold" to="/project">
              {t('theProject')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
