import React, { useState, useRef, Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

import background from '@/assets/img/background.png'
import { ReactComponent as LoginIcon } from '@/assets/svg/login.svg'

import TextInput from '@/components/inputs/TextInput'

export default function VoteLoginModal(props) {
  const { t } = useTranslation()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const toggleModal = () => {
    props.setIsOpen(!props.isOpen)
    reset()
  }

  const forgotPasswordUrl = import.meta.env.VITE_FORGOT_PASSWORD_URL;
  const registerUrl = import.meta.env.VITE_REGISTER_URL;

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
          <div className="flex min-h-full items-center justify-center text-center px-4 sm:px-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full relative transform overflow-hidden flex flex-col space-y-4 sm:space-y-8 bg-white px-4 pb-4 pt-6 text-left shadow-card transition-all sm:my-8 sm:max-w-lg sm:p-6">
                <Dialog.Title className="font-bold text-center text-xl text-[#495057] sm:text-2xl">{t('Sign in to your MyLC&G account')}</Dialog.Title>
                {props.submissionError && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">{props.submissionError}</p>
                      </div>
                      <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                          <button
                            type="button"
                            className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                            onClick={props.onCloseError}
                          >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit(props.onSubmit)}>
                  <div>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { ref, ...fieldProps } }) => (
                        <TextInput
                          {...fieldProps}
                          inputRef={ref}
                          label={t('Username')}
                          type="text"
                          className="form-control"
                          placeholder={t('Username/Email')}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { ref, ...fieldProps } }) => (
                        <TextInput {...fieldProps} inputRef={ref} label={t('Password')} type="password" placeholder={t('Password')} required />
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <Controller
                        control={control}
                        name="remember"
                        render={({ field }) => (
                          <input
                            ref={field.ref}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-[#F46A6A]"
                            id={field.name}
                            name={field.name}
                            checked={field.value}
                            onChange={(event) => field.onChange(event.target.checked)}
                          />
                        )}
                      />
                      <div className="ml-2">
                        <label className="text-sm font-medium text-gray-900" htmlFor="remember">
                          {t('Remember Me')}
                        </label>
                      </div>
                    </div>
                    <Link to={forgotPasswordUrl} className="text-sm font-medium text-gray-900">
                      {t('Forgot your Password?')}
                    </Link>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 mt-10">
                    <button
                      type="submit"
                      className="ds-btn ds-btn-lg bg-[#F10B1B] border-0 rounded-2xl shadow-card font-normal text-2xl text-white normal-case hover:bg-[#F10B1B]"
                    >
                      {props.isLoading && <span className="ds-loading ds-loading-spinner"></span>}
                      {t('Sign in')}
                      <LoginIcon className="w-8 h-auto" />
                    </button>
                    <p>Non hai un account? <Link to={registerUrl} className="font-medium text-[#F10B1B]" target="_blank" rel="noopener noreferrer">
                      {t('Sign Up')}
                    </Link></p>
                    <button
                      type="button"
                      className="ds-btn h-auto min-h-0 bg-[#4E5136] border-1 border-[#171905] px-4 py-2 rounded-md font-normal text-xs text-white normal-case hover:bg-[#4E5136]"
                      onClick={toggleModal}
                    >
                      {t('Back')}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
