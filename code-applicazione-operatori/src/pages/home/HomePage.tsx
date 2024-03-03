import clsx from 'clsx'
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import { useMemo, useState } from 'react'
import { Location, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useInterval } from 'usehooks-ts'

import SuccessModal from '@/components/ui/modals/SuccessModal'

import { useAppSelector } from '@/redux/store'
import { selectOperator } from '@/redux/reducers/auth.reducer'

import { useGetPavilionsListQuery } from '@/services/api/pavilions'
import { Timing, useAddTimingMutation, useGetLastTimingByOperatorQuery } from '@/services/api/timings'

dayjs.extend(durationPlugin)

const timer = parseInt(import.meta.env.TIMER ?? 30) // minutes

export default function HomePage() {
  const location: Location<{ pavilionId: string; entranceId: string }> = useLocation()
  const { t } = useTranslation()

  const { pavilionId, entranceId } = location.state ?? {}

  const operator = useAppSelector(selectOperator)

  const { data: pavilionsListData } = useGetPavilionsListQuery()
  const { data: lastTiming } = useGetLastTimingByOperatorQuery(
    { entrance: entranceId, operator: operator!.id, pavilion: pavilionId },
    { skip: !entranceId || !operator || !pavilionId }
  )
  const [addTiming] = useAddTimingMutation()

  const { results: pavilions } = pavilionsListData ?? {}

  const pavilion = useMemo(() => pavilions?.find((pavilion) => pavilion.id === pavilionId), [pavilions, pavilionId])
  const entrance = useMemo(() => pavilion?.entrances.find((entrance) => entrance._id === entranceId), [entranceId, pavilion])
  const waitingTimeOptions = useMemo(
    () => [
      { color: 'gray', value: 15, label: '<15', unit: 'min' },
      { color: 'green', value: 30, label: '30', unit: 'min' },
      { color: 'yellow', value: 60, label: '60', unit: 'min' },
      { color: 'orange', value: 90, label: '90', unit: 'min' },
      { color: 'red', value: 120, label: '120', unit: 'min' },
      { color: 'purple', value: 150, label: '>120', unit: 'min' },
    ],
    []
  )
  
  const [currentTime, setCurrentTime] = useState(dayjs())
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedWaitingTime, setSelectedWaitingTime] = useState<number | null>(null)
  const [submittedTiming, setSubmittedTiming] = useState<Timing | null>(null)
  
  const timing = useMemo(() => submittedTiming ?? lastTiming, [lastTiming, submittedTiming])

  useInterval(() => {
    setCurrentTime(dayjs())
  }, 60 * 1000)

  const handleSelectTiming = (timing: number) => async () => {
    setSelectedWaitingTime(timing)
  }

  const handleSubmit = async () => {
    if (!selectedWaitingTime || !entrance || !operator || !pavilion) return

    const timing = await addTiming({ entrance: entrance._id, pavilion: pavilion.id, user: operator.id, value: selectedWaitingTime, operatorSampling: true }).unwrap()
    setIsSuccessModalOpen(true)
    setSubmittedTiming(timing)
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="relative w-full flex-1 max-w-xs mt-20 mb-32">
        <div className="flex h-full flex-col justify-between">
          <div
            className="flex flex-col space-y-6 border-2 border-[#171905] px-10 py-6 rounded-2xl text-[#DFDFDF] text-center"
            style={{ background: 'transparent radial-gradient(closest-side at 50% 50%, #92AD4F 0%, #495728 130%) 0% 0% no-repeat padding-box' }}
          >
            <div>{pavilion?.name}</div>
            <div>{entrance?.name}</div>
            {timing && (
              <div>
                {t('Last submitted at')} {dayjs(timing.updatedAt).format('DD/MM/YYYY HH:mm')}
              </div>
            )}
          </div>
          <div className="grid grid-rows-2 grid-cols-3 gap-7">
            {waitingTimeOptions.map((waitingTimeOption) => (
              <div key={waitingTimeOption.value}>
                <button
                  type="button"
                  className={clsx('inline-flex flex-col items-center justify-center timing-btn', {
                    'timing-btn-gray': waitingTimeOption.color === 'gray',
                    'timing-btn-green': waitingTimeOption.color === 'green',
                    'timing-btn-yellow': waitingTimeOption.color === 'yellow',
                    'timing-btn-orange': waitingTimeOption.color === 'orange',
                    'timing-btn-red': waitingTimeOption.color === 'red',
                    'timing-btn-purple': waitingTimeOption.color === 'purple',
                    'border-[#92AD4F]': waitingTimeOption.value === selectedWaitingTime,
                  })}
                  onClick={handleSelectTiming(waitingTimeOption.value)}
                >
                  <span>{waitingTimeOption.label}</span>
                  <span className="font-[Poppins]">{waitingTimeOption.unit}</span>
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="border-2 border-[#171905] px-14 py-8 rounded-xl text-2xl text-[#DFDFDF]"
              disabled={timing ? dayjs(timing.updatedAt).add(timer, 'minutes').isAfter(currentTime) : false}
              onClick={handleSubmit}
              style={{ background: 'transparent radial-gradient(closest-side at 50% 50%, #F10B1B 0%, #E80B1A 24%, #79060E 130%) 0% 0% no-repeat padding-box' }}
              type="button"
            >
              {timing && dayjs(timing.updatedAt).add(timer, 'minutes').isAfter(currentTime)
                ? t('Next submit in')+ ': ' + dayjs.duration(dayjs(timing.updatedAt).add(timer, 'minutes').diff(currentTime, 'minutes'), 'minutes').format('HH:mm')
                : t('Submit')}
            </button>
          </div>
        </div>
      </div>
      <SuccessModal open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </div>
  )
}
