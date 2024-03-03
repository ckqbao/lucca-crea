import { Modal, ModalBody, Row, Container } from 'reactstrap'

import GreenCheckMark from '@/assets/images/green-check-mark.png'
import { useTranslation } from 'react-i18next'

type SubmittedTimingModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function SubmittedTimingModal(props: SubmittedTimingModalProps) {
  const { isOpen, setIsOpen } = props

  const { t } = useTranslation()

  const toggleModal = () => {
    setIsOpen(!props.isOpen)
  }

  return (
    <Modal autoFocus centered isOpen={isOpen} role="dialog" size="md" toggle={toggleModal} onClick={() => setIsOpen(false)}>
      <ModalBody>
        <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-11'>
          <p className='tw-w-full tw-text-4xl tw-leading-snug tw-text-[#495728] tw-text-center'>{t('Grazie per il tuo feedback!!')}</p>
          <img src={GreenCheckMark} alt="check" className='tw-w-20 tw-h-auto' />
        </div>
      </ModalBody>
    </Modal>
  )
}
