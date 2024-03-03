import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Modal, ModalBody, Row, Container, Alert } from 'reactstrap'
import { useOnClickOutside } from 'usehooks-ts'

import { ReactComponent as CaretDownIcon } from '@/assets/icons/caret-down.svg'

const timingFormSchema = yup.object({
  pavilionId: yup.string().required(),
  value: yup.number().required(),
})

type TimingFormValues = yup.InferType<typeof timingFormSchema>

type TimingModalProps = {
  pavilionOptions: Array<{
    entranceName: string
    pavilionName: string
    pavilionId: string
  }>
  initialValues: TimingFormValues
  isOpen: boolean
  onSubmit: (values: TimingFormValues) => void
  setIsOpen: (isOpen: boolean) => void
  submissionError?: string
}

export default function TimingModal(props: TimingModalProps) {
  const { pavilionOptions, initialValues, isOpen, onSubmit, setIsOpen, submissionError } = props

  const formRef = useRef<HTMLFormElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [showOptions, setShowOptions] = useState(false)

  useOnClickOutside(menuRef, () => {
    setShowOptions(false)
  })

  const {
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<TimingFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(timingFormSchema),
    reValidateMode: 'onBlur',
    values: initialValues,
  })

  watch('pavilionId')

  useEffect(() => {
    if (submissionError) {
      setError('root.serverError', { message: submissionError })
    }
  }, [setError, submissionError])

  const handleSelectTiming = (timing: number) => () => {
    setValue('value', timing)
    handleSubmit(onSubmit)()
  }

  const toggleModal = () => {
    setIsOpen(!props.isOpen)
  }

  return (
    <Modal
      autoFocus
      centered
      isOpen={isOpen}
      onClosed={() => {
        reset()
        setShowOptions(false)
      }}
      role="dialog"
      size="md"
      toggle={toggleModal}
      className="modal-scroll"
      contentClassName="tw-py-5"
    >
      <ModalBody className="py-0">
        <Container>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.serverError?.message && <Alert color="danger">{errors.root.serverError.message}</Alert>}
            <div ref={menuRef} className="tw-relative tw-flex tw-flex-col">
              <button
                type="button"
                className="tw-relative tw-h-28 tw-bg-[#E1E0DB] tw-border tw-border-[#707070] tw-px-10 tw-rounded-[32px] tw-text-[#495728]"
                onClick={() => setShowOptions((prevShow) => !prevShow)}
              >
                <span className="tw-flex tw-flex-col tw-justify-center">
                  <strong>{pavilionOptions.find((option) => option.pavilionId === getValues('pavilionId'))?.entranceName}</strong>
                  {pavilionOptions.find((option) => option.pavilionId === getValues('pavilionId'))?.pavilionName}
                </span>
                <CaretDownIcon className="tw-absolute tw-top-1/2 tw-right-0 -tw-translate-y-1/2 tw-w-6 tw-h-6 tw-mr-4" />
              </button>
              {showOptions && (
                <div className="tw-absolute tw-top-full tw-w-full tw-flex tw-flex-col">
                  {pavilionOptions
                    .filter((option) => option.pavilionId !== getValues('pavilionId'))
                    .map((option) => (
                      <button
                        key={option.pavilionId}
                        className="tw-relative tw-h-28 tw-bg-[#E1E0DB] tw-border tw-border-[#707070] tw-px-10 tw-rounded-[32px] tw-text-[#495728]"
                        onClick={() => {
                          setValue('pavilionId', option.pavilionId)
                          setShowOptions(false)
                        }}
                        type="button"
                      >
                        <span className="tw-flex tw-flex-col tw-justify-center">
                          <strong>{option.entranceName}</strong>
                          {option.pavilionName}
                        </span>
                      </button>
                    ))}
                </div>
              )}
            </div>
            {/* <InputController className='tw-text-[#495728]' name="pavilionId" control={control} required type="select">
                {pavilionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </InputController> */}
            <Row className="my-5">
              <div className="grid text-center px-6" style={{ columnGap: 0 }}>
                <div className="g-col-6">
                  <button
                    type="button"
                    className="d-inline-flex flex-column align-items-center justify-content-center timing-btn timing-btn-gray"
                    onClick={handleSelectTiming(0)}
                  >
                    <span>{'<15'}</span>
                    <span className="!tw-font-[Poppins]">min</span>
                  </button>
                </div>
                <div className="g-col-6">
                  <button
                    type="button"
                    className="d-inline-flex flex-column align-items-center justify-content-center timing-btn timing-btn-green"
                    onClick={handleSelectTiming(15)}
                  >
                    <span>15</span>
                    <span className="!tw-font-[Poppins]">min</span>
                  </button>
                </div>
                <div className="g-col-6">
                  <button
                    type="button"
                    className="d-inline-flex flex-column align-items-center justify-content-center timing-btn timing-btn-yellow"
                    onClick={handleSelectTiming(30)}
                  >
                    <span>30</span>
                    <span className="!tw-font-[Poppins]">min</span>
                  </button>
                </div>
                <div className="g-col-6">
                  <button
                    type="button"
                    className="d-inline-flex flex-column align-items-center justify-content-center timing-btn timing-btn-orange"
                    onClick={handleSelectTiming(60)}
                  >
                    <span>60</span>
                    <span className="!tw-font-[Poppins]">min</span>
                  </button>
                </div>
                <div className="g-col-6">
                  <button
                    type="button"
                    className="d-inline-flex flex-column align-items-center justify-content-center timing-btn timing-btn-red"
                    onClick={handleSelectTiming(90)}
                  >
                    <span>90</span>
                    <span className="!tw-font-[Poppins]">min</span>
                  </button>
                </div>
                <div className="g-col-6">
                  <button
                    type="button"
                    className="d-inline-flex flex-column align-items-center justify-content-center timing-btn timing-btn-purple"
                    onClick={handleSelectTiming(120)}
                  >
                    <span>{'>120'}</span>
                    <span className="!tw-font-[Poppins]">min</span>
                  </button>
                </div>
              </div>
            </Row>
          </form>
        </Container>
      </ModalBody>
    </Modal>
  )
}
