import { useTranslation } from 'react-i18next'

import { ReactComponent as ArrowsSpinSolidIcon } from '@/assets/icons/arrows-spin-solid.svg'
// import { ReactComponent as GroupIcon } from '@/assets/icons/group.svg'

// Icon by color
import { ReactComponent as GroupIcon_bianco } from '@/assets/icons/group_bianco.svg' // Bianco
import { ReactComponent as GroupIcon_verde } from '@/assets/icons/group_verde.svg' // Verde
import { ReactComponent as GroupIcon_giallo } from '@/assets/icons/group_giallo.svg' // Giallo
import { ReactComponent as GroupIcon_arancio } from '@/assets/icons/group_arancio.svg' // Arancio
import { ReactComponent as GroupIcon_rosso } from '@/assets/icons/group_rosso.svg' // Rosso
import { ReactComponent as GroupIcon_viola } from '@/assets/icons/group_viola.svg' // Viola
import clsx from 'clsx'

type PavilionCardProps = {
  id: string
  name: string
  entranceName: string
  timingColor: string
  onClick?: () => void
  variant?: 'normal' | 'totem'
}

export default function PavilionCard(props: PavilionCardProps) {
  const { name, entranceName, timingColor, onClick, variant = 'normal' } = props
  const { t } = useTranslation()

  // console.log(timingColor);
  const isGroupIcon_bianco = timingColor == 'FFFFFF'.toUpperCase() ? 1 : 0
  const isGroupIcon_verde = timingColor == '50C878'.toUpperCase() ? 1 : 0
  const isGroupIcon_giallo = timingColor == 'F7DC6F'.toUpperCase() ? 1 : 0
  const isGroupIcon_arancio = timingColor == 'F5B041'.toUpperCase() ? 1 : 0
  const isGroupIcon_rosso = timingColor == 'E74C3C'.toUpperCase() ? 1 : 0
  const isGroupIcon_viola = timingColor == '8E44AD'.toUpperCase() ? 1 : 0

  // console.log(timingColor)
  // console.log(entranceName)
  // console.log(isGroupIcon_bianco)
  // console.log(isGroupIcon_verde)
  // console.log(isGroupIcon_giallo)
  // console.log(isGroupIcon_arancio)
  // console.log(isGroupIcon_rosso)
  // console.log(isGroupIcon_viola)
  // console.log('---- ---- ')

  return (
    <div className="card !tw-bg-[#F5F8E5] border border-2 border-primary rounded-4 !tw-m-0">
      <div className={clsx('row g-0', { 'tw-flex-row-reverse': variant === 'totem' })}>
        <div className="col-4 d-flex align-items-center justify-content-center">
          <div className="ratio ratio-1x1 m-2 border border-3 border-black rounded-4" style={{ backgroundColor: '#' + timingColor, borderColor: '#92AD4F' }}>
            {isGroupIcon_bianco == 1 ? <GroupIcon_bianco className="w-100 h-auto p-2" /> : null}
            {isGroupIcon_verde == 1 ? <GroupIcon_verde className="w-100 h-auto p-2" /> : null}
            {isGroupIcon_giallo == 1 ? <GroupIcon_giallo className="w-100 h-auto p-2" /> : null}
            {isGroupIcon_arancio == 1 ? <GroupIcon_arancio className="w-100 h-auto p-2" /> : null}
            {isGroupIcon_rosso == 1 ? <GroupIcon_rosso className="w-100 h-auto p-2" /> : null}
            {isGroupIcon_viola == 1 ? <GroupIcon_viola className="w-100 h-auto p-2" /> : null}
          </div>
        </div>
        <div className="col-8">
          <div className="d-flex flex-row align-items-center h-100 tw-pr-1">
            <div className="flex-grow-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center totem:tw-px-4">
              <h2 className="tw-font-bold text-boldo totem:text-6xl tw-text-[#495728]">{entranceName}</h2>
              <p className="tw-text-[12px] tw-text-[#495728] totem:text-4xl">{name}</p>
            </div>
            {variant === 'normal' && (
              <div className="">
                <button className="position-relative bg-transparent border-0" onClick={onClick}>
                  <ArrowsSpinSolidIcon width="85px" height="85px" fill="#92AD4F" />
                  <span
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{ color: '#171905', fontSize: '14px', lineHeight: '14px', fontWeight: 700 }}
                  >
                    {t('Quanto hai atteso?')}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
