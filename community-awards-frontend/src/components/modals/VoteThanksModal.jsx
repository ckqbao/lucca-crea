import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Transition } from '@headlessui/react'

import checkSuccess from '@/assets/img/check-success.png'
import background from '@/assets/img/background.png'

export default function VoteThanksModal(props) {
  const { t } = useTranslation()

  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog onClose={() => props.setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed z-modal inset-0 bg-[#EFEFEF] flex items-center justify-center">
            <img className="!max-w-none" src={background} alt="background-curve" />
          </div>
        </Transition.Child>
        <div className="fixed inset-0 z-modal overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full relative transform overflow-hidden bg-white px-4 py-6 text-left shadow-card transition-all sm:my-8 sm:max-w-xl sm:p-6 md:p-10 lg:px-24 lg:py-20">
                <div className="flex flex-col items-center justify-center space-y-6 lg:space-y-11">
                  <h3 className="font-bold text-2xl lg:text-4xl text-[#495057]">{t('Thank you for voting')}</h3>
                  <div className="relative">
                    <img className="w-auto h-40" src={checkSuccess} alt="check" />
                  </div>
                  <button
                    type="button"
                    className="ds-btn h-auto min-h-0 bg-[#4E5136] border-1 border-[#171905] px-4 py-2 rounded-md font-normal text-xs text-white normal-case hover:bg-[#4E5136]"
                    onClick={() => props.setIsOpen(false)}
                  >
                    {t('Back')}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
