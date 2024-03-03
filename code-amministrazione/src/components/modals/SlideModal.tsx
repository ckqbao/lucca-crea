import _ from 'lodash'
import { DragEvent, useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Modal, ModalHeader, ModalBody, Row, Input, Container, FormGroup, Alert, Label } from 'reactstrap'
import Button from 'react-bootstrap/Button'
import { FileDrop } from 'react-file-drop'

import { ReactComponent as UploadIcon } from '@/assets/icons/upload.svg'

import InputController from '@/components/form-controllers/InputController'

import { useAppSelector } from '@/redux/store'
import { selectAccessToken } from '@/redux/reducers/authReducer'

const slideFormSchema = yup.object({
  id: yup.string(),
  active: yup.boolean().required(),
  order: yup.number().required(),
  imageFileName: yup.string().when('type', {
    is: (val: string) => val === 'image',
    then: (schema) => schema.required(),
  }),
  title: yup.string().required(),
  type: yup.string().oneOf(['image', 'video']).required(),
  videoFileName: yup.string().when('type', {
    is: (val: string) => val === 'video',
    then: (schema) => schema.required(),
  }),
})

type SlideFormValues = yup.InferType<typeof slideFormSchema>

type SlideModalProps = {
  initialValues: SlideFormValues
  isLoading?: boolean
  isOpen: boolean
  onSubmit: (values: SlideFormValues & { image?: File }) => void
  setIsOpen: (isOpen: boolean) => void
  submissionError?: string
}

export default function SlideModal(props: SlideModalProps) {
  const { initialValues, isOpen, onSubmit: onSubmitProp, setIsOpen, submissionError } = props
  const { t } = useTranslation()

  const { id: slideId, type: initialType } = initialValues

  const accessToken = useAppSelector(selectAccessToken)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<SlideFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(slideFormSchema),
    reValidateMode: 'onBlur',
    values: initialValues,
  })

  watch('type')

  useEffect(() => {
    if (!isOpen) {
      setImageFile(null)
      setPreviewUrl(null)
    }
  }, [isOpen])

  useEffect(() => {
    async function getPreviewUrl() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/slides/${slideId}/image`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const blob = await response.blob()
        const objectURL = URL.createObjectURL(blob)
        setPreviewUrl(objectURL)
      } catch (error) {
        console.log(error)
      }
    }
    if (slideId && initialType === 'image') {
      getPreviewUrl()
    }
  }, [accessToken, initialType, slideId])

  useEffect(() => {
    if (submissionError) {
      setError('root.serverError', { message: submissionError })
    }
  }, [setError, submissionError])

  const onFileDrop = (files: FileList | null, event: DragEvent<HTMLDivElement>) => {
    if (!files) return

    for (var i = 0; i < files.length; i++) {
      let exe = files[i].name.split('.').pop()
      if (exe === 'jpg' || exe === 'jpeg' || exe == 'png') {
        setImageFile(files[i])
        setValue('imageFileName', files[i].name)
        const fileReader = new FileReader()
        fileReader.onload = () => {
          setPreviewUrl?.(fileReader.result?.toString() ?? null)
        }
        fileReader.readAsDataURL(files[i])
        break
      }
    }
  }

  const onSubmit: SubmitHandler<SlideFormValues> = (values) => {
    if (values.type === 'image') {
      onSubmitProp({ ...values, image: imageFile ?? undefined })
    } else if (values.type === 'video') {
      onSubmitProp(values)
    }
  }

  const onTargetClick = () => {
    fileInputRef.current?.click()
  }

  const toggleModal = () => {
    setIsOpen(!props.isOpen)
  }

  return (
    <Modal autoFocus centered isOpen={isOpen} onClosed={() => reset()} role="dialog" size="md" toggle={toggleModal}>
      <ModalHeader> Add / Edit {t('Slide')}</ModalHeader>
      <ModalBody>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.serverError?.message && <Alert color="danger">{errors.root.serverError.message}</Alert>}
            <Row className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="title">
                  {t('Title')}
                </label>
              </div>
              <InputController name="title" control={control} placeholder={t('Title')} required />
            </Row>
            <div className="tw-flex tw-items-center tw-space-x-4 mt-3">
              <FormGroup check>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Input
                      checked={field.value === 'image'}
                      type="radio"
                      className="tw-cursor-pointer"
                      id={field.name}
                      name={field.name}
                      onChange={(event) => (event.target.checked ? setValue('type', 'image') : undefined)}
                      style={{
                        width: '1.22em',
                        height: '1.2em',
                      }}
                      value="image"
                    />
                  )}
                />
                <Label check className="form-check-label ms-2" style={{ marginTop: 1 }}>
                  {t('Image')}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Input
                      checked={field.value === 'video'}
                      type="radio"
                      className="tw-cursor-pointer"
                      id={field.name}
                      name={field.name}
                      onChange={(event) => (event.target.checked ? setValue('type', 'video') : undefined)}
                      style={{
                        width: '1.22em',
                        height: '1.2em',
                      }}
                      value="video"
                    />
                  )}
                />
                <Label check className="form-check-label ms-2" style={{ marginTop: 1 }}>
                  {t('Video')}
                </Label>
              </FormGroup>
            </div>
            {getValues('type') === 'image' && (
              <Row className="mt-3">
                <div>
                  <label className="mb-2 p-0" htmlFor="imageFileName">
                    {t('Image')}
                  </label>
                </div>
                <div>
                  <Controller
                    control={control}
                    name="imageFileName"
                    render={({ field: { value, onChange, ...field } }) => (
                      <input
                        {...field}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        ref={fileInputRef}
                        onChange={(event) => {
                          const { files } = event.target
                          if (!files?.[0]) return

                          setImageFile(files[0])
                          onChange(files[0].name)
                          const fileReader = new FileReader()
                          fileReader.onload = () => {
                            setPreviewUrl?.(fileReader.result?.toString() ?? null)
                          }
                          fileReader.readAsDataURL(files[0])
                        }}
                        style={{ display: 'none' }}
                      />
                    )}
                  />
                  {getValues('imageFileName') && previewUrl ? (
                    <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                      <div>
                        <img style={{ maxHeight: '90px' }} src={previewUrl} />
                      </div>
                    </FileDrop>
                  ) : getValues('imageFileName') && !previewUrl ? (
                    <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                      <div>
                        <i className="bx bxs-image text-primary bx-lg"></i>
                        <div>{getValues('imageFileName')}</div>
                      </div>
                    </FileDrop>
                  ) : (
                    <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                      <div>
                        <div className="tw-flex tw-justify-center">
                          <UploadIcon />
                        </div>
                        <div>{t('Drag a file in this area or select it from your device')}</div>
                      </div>
                    </FileDrop>
                  )}
                </div>
              </Row>
            )}
            {getValues('type') === 'video' && (
              <Row className="mt-3">
                <div>
                  <label className="mb-2 p-0" htmlFor="videoFileName">
                    {t('Video name')}
                  </label>
                </div>
                <InputController name="videoFileName" control={control} placeholder={t('Video name')} required />
              </Row>
            )}
            <Row className="mt-3">
              <div className="col-3">
                <label className="mb-2 p-0" htmlFor="order">
                  {t('Order')}
                </label>
                <InputController name="order" control={control} placeholder={t('Order')} required type="number" />
              </div>
            </Row>
            <div className="d-flex justify-content-start mt-3">
              <FormGroup check>
                <Controller
                  control={control}
                  name="active"
                  render={({ field }) => (
                    <Input
                      type="checkbox"
                      className="rounded-check"
                      id={field.name}
                      name={field.name}
                      style={{
                        width: '1.22em',
                        height: '1.2em',
                        backgroundColor: '#808080',
                      }}
                      checked={field.value}
                      onChange={getValues('id') ? (event) => field.onChange(event.target.checked) : undefined}
                      readOnly={getValues('id') ? false : true}
                    />
                  )}
                />
                <label className="form-check-label ms-2" style={{ marginTop: 1 }} htmlFor="active">
                  {t('Active')}
                </label>
              </FormGroup>
            </div>
            <Row>
              <div className="text-end mt-3">
                <Button type="submit" className="btn bg-red border-0 me-2" variant="danger">
                  {t('Save')}
                </Button>
                <Button type="button" className="btn border-0" onClick={toggleModal} variant="dark">
                  {t('Cancel')}
                </Button>
              </div>
            </Row>
          </form>
        </Container>
      </ModalBody>
    </Modal>
  )
}
