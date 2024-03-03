import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'

import awardsLogoAlt from '@/assets/img/awards-logo-alt.png'
import isybank from '@/assets/img/isybank_def.png'
import { ReactComponent as FacebookIcon } from '@/assets/svg/facebook.svg'
import { ReactComponent as InstagramIcon } from '@/assets/svg/instagram.svg'
import { ReactComponent as YoutubeIcon } from '@/assets/svg/youtube.svg'
import { ReactComponent as TwitchIcon } from '@/assets/svg/twitch.svg'
import { ReactComponent as AwardsLogo } from '@/assets/svg/awards-logo.svg'

import awardsVerticalLogo from '@/assets/img/Logo_LCG_CA-100.jpg'
import luccacVerticalLogo from '@/assets/img/Logo_LuccaCrea-100.jpg'
import footerLogo from '@/assets/img/footerlogo.png'

const socials = [
  { id: 'facebook', icon: <FacebookIcon />, link: 'https://www.facebook.com/luccacomicsandgames/' },
  { id: 'instagram', icon: <InstagramIcon />, link: 'https://www.instagram.com/luccacomicsandgames/' },
  { id: 'youtube', icon: <YoutubeIcon />, link: 'https://www.youtube.com/user/luccacandg' },
  { id: 'twitch', icon: <TwitchIcon />, link: 'https://www.twitch.tv/luccacomicsandgames' },
]

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer
      className={clsx(
        'flex flex-col items-center justify-center space-y-8 bg-white pt-6 pb-10 z-10',
        'md:flex-row md:items-start md:space-x-4 md:space-y-0 md:px-4',
        'lg:space-x-7 lg:px-12 lg:pt-14 lg:pb-16',
        'xl:px-24'
      )}
    >
      <div className="flex items-center justify-center md:flex flex-col space-y-0">
        <div className='flex flex-row'>
          <img className="h-18 flex-1" src={footerLogo} alt="isybank" />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2 md:hidden">
        <div className="font-bold text-xs text-center text-[#656565]">{t('Partner esclusivo')}</div>
        <Link to="https://www.isybank.com/" target="_blank" rel="noopener noreferrer">
          <img className="h-8 translate-x-0 text-center" src={isybank} alt="isybank" />
        </Link>
      </div>
      <div className="flex flex-col space-y-6 font-normal text-center text-xs text-[#184833] md:flex-row md:space-x-4 md:space-y-0 lg:space-x-7 lg:text-base lg:leading-[18px] xl:text-lg xl:leading-5">
        <div className="flex flex-col items-center justify-center px-12 md:items-start md:px-0 md:text-sm sm:text-xs">
          <p>Corso Garibaldi 53, 55100 Lucca</p>
          <div className="md:flex flex-row items-center justify-center md:flex-col md:items-start md:text-sm sm:text-xs">
            <p>Tel. +39 0583 401 711</p>
            <p>info@luccacomicsandgames.com</p>
          </div>
          <p>P.IVA 01966320465</p>
          <p>Copyright © 2023. Tutti i diritti riservati</p>
          <br />
          <p>
            <Link to="https://www.luccacrea.it/informativa-generale-privacy/" target="_blank" rel="noopener noreferrer">Privacy policy</Link> - <Link to="https://www.luccacrea.it/cookie-policy/" target="_blank" rel="noopener noreferrer">Cookie policy</Link>
            </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 md:items-start">
          <div className="flex items-center justify-center space-x-8 md:space-x-4">
            {socials.map((social) => (
              <Link key={social.id} to={social.link} target="_blank" rel="noopener noreferrer">
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="md:w-32 md:text-left lg:w-40 xl:w-48 text-xs">Credits: Art direction - Ciao! Studio | Web development - Lifetronic</p>
        </div>
      </div>
      <div className="hidden flex-1 md:flex justify-end">
        <div className="md:flex flex-col space-y-2 items-center">
          <div className="font-bold text-xs text-[#656565] sm:text-center text-center">{t('Partner Esclusivo')}</div>
          <div className="font-bold text-xs text-[#656565] sm:text-center text-center">&nbsp;</div>
          <Link to="https://www.isybank.com/" target="_blank" rel="noopener noreferrer">
            <img className="w-auto h-14" src={isybank} alt="isybank" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
