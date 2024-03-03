import clsx from 'clsx'
import { Fragment, PropsWithChildren } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export type ModalProps = {
  onClose: () => void
  open: boolean
}

type ModalRootProps = PropsWithChildren & ModalProps

function ModalRoot(props: ModalRootProps) {
  const { children, open, onClose } = props

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        {children}
      </Dialog>
    </Transition.Root>
  )
}

function ModalOverlay() {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </Transition.Child>
  )
}

function ModalPanel({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center px-8 p-4 text-center sm:items-center sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel
            className={clsx(
              'relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6',
              className
            )}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}

const Modal = {
  Root: ModalRoot,
  Overlay: ModalOverlay,
  Panel: ModalPanel,
  Title: Dialog.Title,
  Description: Dialog.Description,
}

export default Modal
