import _ from 'lodash'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useCookies } from 'react-cookie'

import PavilionCard from '@/components/cards/PavilionCard'
import TimingModal from '@/components/modals/TimingModal'
import SubmittedTimingModal from '@/components/modals/SubmittedTimingModal'

import { FAKE_USER_ID } from '@/constants/fake'

import { useGetAllDataQuery } from '@/services/api'
import { useAddTimingMutation } from '@/services/api/timings'

const blockSubmissionDuration = 60

export default function HomePage() {
  const { t } = useTranslation()

  const [cookies, setCookie, removeCookie] = useCookies(['last-submit-timing'])

  const [addTiming] = useAddTimingMutation()
  const { data } = useGetAllDataQuery()

  const pavilionsList = useMemo(() => data?.pavilions || [], [data])
  const pavilionOptions = useMemo(
    () =>
      pavilionsList.map((pavilion) => ({
        entranceName: pavilion.entrances.find((entrance) => entrance.entranceId)?.entranceName ?? '',
        pavilionName: pavilion.name,
        pavilionId: pavilion._id,
      })),
    [pavilionsList]
  )

  const [selectedPavilion, setSelectedPavilion] = useState<(typeof pavilionsList)[number]>()
  const [isTimingModalOpen, setIsTimingModalOpen] = useState(false)
  const [isSubmittedTimingModalOpen, setIsSubmittedTimingModalOpen] = useState(false)

  return (
    <Container className="tw-px-8 tw-pt-1 sm:tw-pt-2 md:tw-pt-3 lg:tw-pt-4 xl:tw-pt-5">
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3 md:tw-gap-4 lg:tw-gap-8 xl:tw-gap-10">
        {pavilionsList.map((pavilion) => (
          <PavilionCard
            key={pavilion._id}
            id={pavilion._id}
            name={pavilion.name}
            entranceName={pavilion.entrances.find((entrance) => entrance.entranceId === pavilion.entranceId)?.entranceName ?? ''}
            timingColor={pavilion.timingColor}
            onClick={() => {
              setSelectedPavilion(pavilion)
              setIsTimingModalOpen(true)
            }}
          />
        ))}
      </div>
      <TimingModal
        pavilionOptions={pavilionOptions}
        initialValues={{ pavilionId: selectedPavilion?._id ?? '', value: 0 }}
        isOpen={isTimingModalOpen}
        onSubmit={({ pavilionId, value }) => {
          const entranceId = pavilionsList.find((pavilion) => pavilion._id === pavilionId)?.entranceId
          if (!entranceId) return
          if (cookies['last-submit-timing'] && dayjs().isBefore(dayjs(cookies['last-submit-timing']).add(blockSubmissionDuration, 'minutes'))) {
            toast.error(
              <div className='tw-font-bold tw-text-base tw-font-["Poppins"]'>
                {t(`Devi aspettare ${blockSubmissionDuration} minuti per poter inviare di nuovo`)}
              </div>,
              { position: 'bottom-center' }
            )
          } else {
            addTiming({ entrance: entranceId, pavilion: pavilionId, value, user: FAKE_USER_ID, operatorSampling: false })
              .unwrap()
              .then(() => {
                setSelectedPavilion(undefined)
                setIsTimingModalOpen(false)
                setIsSubmittedTimingModalOpen(true)
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 60 minutes in milliseconds
                setCookie('last-submit-timing', new Date().toISOString(),{ expires: expirationDate })
              })
              .catch((error) => {
                toast.error(t(_.get(error, 'data.message', 'Something went wrong!')))
              })
          }
        }}
        setIsOpen={setIsTimingModalOpen}
      />
      <SubmittedTimingModal isOpen={isSubmittedTimingModalOpen} setIsOpen={setIsSubmittedTimingModalOpen} />
    </Container>
  )
}
