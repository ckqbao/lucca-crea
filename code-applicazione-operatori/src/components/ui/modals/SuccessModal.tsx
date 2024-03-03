import { useTranslation } from 'react-i18next'

import { ReactComponent as CheckIcon } from '@/assets/svg/check.svg'

import Modal, { ModalProps } from './Modal'

type SuccessModalProps = ModalProps
export default function SuccessModal(props: SuccessModalProps) {
  const { onClose, open } = props
  const {t } = useTranslation()
  return (
    <Modal.Root onClose={onClose} open={open}>
      <Modal.Overlay />
      <Modal.Panel className="w-full p-6 sm:!p-8 lg:!p-10">
        <Modal.Description as="div" className="flex flex-col items-center space-y-2 py-7">
          <p className='text-4xl font-semibold text-[#171905]'>{t('Data updated')}</p>
          <CheckIcon className="h-24 w-auto text-[#92AD4F]" />
        </Modal.Description>
      </Modal.Panel>
    </Modal.Root>
  )
}
