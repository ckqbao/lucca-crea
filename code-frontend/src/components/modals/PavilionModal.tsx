import _ from 'lodash'
import { FormEvent, Ref, forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Controller, FormState, UseFieldArrayAppend, UseFormGetValues, UseFormTrigger, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Modal, ModalHeader, ModalBody, Row, Input, Container, FormGroup, Spinner } from 'reactstrap'
import Button from 'react-bootstrap/Button'

import { ReactComponent as DeleteIcon } from '@/assets/icons/trash.svg'
import { ReactComponent as PlusAlterIcon } from '@/assets/icons/plus-alter.svg'

import InputController from '@/components/form-controllers/InputController'

const entranceFormSchema = yup.object({
  _id: yup.string(),
  code: yup.string().required(),
  coordinates: yup.string().required(),
  name: yup.string().required(),
  threshold1: yup.string().required(),
  threshold2: yup.string().required(),
  threshold3: yup.string().required(),
  threshold4: yup.string().required(),
  threshold5: yup.string().required(),
})

type EntranceFormValues = yup.InferType<typeof entranceFormSchema>

type AddEntranceHandle = {
  getValues: UseFormGetValues<EntranceFormValues>
  formState: FormState<EntranceFormValues>
  submit: () => Promise<void>
  trigger: UseFormTrigger<EntranceFormValues>
}

const AddEntrance = forwardRef(function AddEntrance(props: { append: UseFieldArrayAppend<PavilionFormValues, 'entrances'> }, ref: Ref<AddEntranceHandle>) {
  const { append } = props
  const { t } = useTranslation()

  const { clearErrors, control, formState, getValues, handleSubmit, reset, trigger, watch } = useForm<EntranceFormValues>({
    defaultValues: { code: '', coordinates: '', name: '', threshold1: '', threshold2: '', threshold3: '', threshold4: '', threshold5: '' },
    reValidateMode: 'onBlur',
    resolver: yupResolver(entranceFormSchema),
  })

  useImperativeHandle(ref, () => ({
    getValues,
    formState,
    submit: handleSubmit(handleAddEntrance),
    trigger,
  }))

  useEffect(() => {
    const subscription = watch((values) => {
      if (_.every(values, (value) => value === '')) {
        clearErrors()
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const handleAddEntrance = (values: EntranceFormValues) => {
    append(values)
    reset()
  }

  return (
    <Row className="gx-2">
      <div className="col-2">
        <div>
          <label className="mb-2 p-0" htmlFor="name">
            {t('Entrance Name')}
          </label>
        </div>
        <InputController name="name" control={control} placeholder={t('Entrance Name')} />
      </div>
      <div className="col-2">
        <div>
          <label className="mb-2 p-0" htmlFor="code">
            {t('Entrance Code')}
          </label>
        </div>
        <InputController name="code" control={control} placeholder={t('Entrance Code')} />
      </div>
      <div className="col-2">
        <div>
          <label className="mb-2 p-0" htmlFor="coordinates">
            {t('Entrance coordinate')}
          </label>
        </div>
        <InputController name="coordinates" control={control} placeholder={t('Entrance coordinate')} />
      </div>
      <Row className="col gx-1">
        <div className="col">
          <div>
            <label className="mb-2 p-0" htmlFor="threshold1" style={{ fontSize: '10px' }}>
              {t('Green Threshold')}
            </label>
          </div>
          <InputController className="threshold-input" name="threshold1" control={control} placeholder={t('Threshold in minute')} />
        </div>
        <div className="col">
          <div>
            <label className="mb-2 p-0" htmlFor="threshold2" style={{ fontSize: '10px' }}>
              {t('Yellow Threshold')}
            </label>
          </div>
          <InputController className="threshold-input" name="threshold2" control={control} placeholder={t('Threshold in minute')} />
        </div>
        <div className="col">
          <div>
            <label className="mb-2 p-0" htmlFor="threshold3" style={{ fontSize: '10px' }}>
              {t('Orange Threshold')}
            </label>
          </div>
          <InputController className="threshold-input" name="threshold3" control={control} placeholder={t('Threshold in minute')} />
        </div>
        <div className="col">
          <div>
            <label className="mb-2 p-0" htmlFor="threshold4" style={{ fontSize: '10px' }}>
              {t('Red Threshold')}
            </label>
          </div>
          <InputController className="threshold-input" name="threshold4" control={control} placeholder={t('Threshold in minute')} />
        </div>
        <div className="col">
          <div>
            <label className="mb-2 p-0" htmlFor="threshold5" style={{ fontSize: '10px' }}>
              {t('Purple Threshold')}
            </label>
          </div>
          <InputController className="threshold-input" name="threshold5" control={control} placeholder={t('Threshold in minute')} />
        </div>
      </Row>
      <div className="col-auto d-flex align-items-end">
        <Button disabled={!formState.isValid} variant="danger" className="bg-red border-0 mb-1" onClick={handleSubmit(handleAddEntrance)} size="sm">
          <PlusAlterIcon width="20px" height="20px" fill="#FFF" />
        </Button>
      </div>
    </Row>
  )
})

const pavilionFormSchema = yup.object({
  id: yup.string(),
  active: yup.boolean().required(),
  code: yup.string().required(),
  coordinates: yup.string().required(),
  entrances: yup.array().of(entranceFormSchema).min(1),
  name: yup.string().required(),
})

type PavilionFormValues = yup.InferType<typeof pavilionFormSchema>

type PavilionModalProps = {
  initialValues: PavilionFormValues
  isLoading?: boolean
  isOpen: boolean
  onSubmit: (values: PavilionFormValues) => void
  setIsOpen: (isOpen: boolean) => void
}

export default function PavilionModal(props: PavilionModalProps) {
  const { initialValues, isLoading = false, isOpen, onSubmit, setIsOpen } = props
  const { t } = useTranslation()

  const addEntranceRef = useRef<AddEntranceHandle>(null)

  const {
    control,
    getValues,
    handleSubmit: submitPavilionForm,
    reset,
  } = useForm<PavilionFormValues>({
    values: initialValues,
  })
  const { fields: entranceFields, append, remove } = useFieldArray({ control, name: 'entrances' })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const addEntranceValues = addEntranceRef.current?.getValues()
    if (!addEntranceValues) return
    if (_.every(addEntranceValues, (value) => value === '')) {
      submitPavilionForm(onSubmit)(event)
    } else {
      await addEntranceRef.current?.submit()
      if (addEntranceRef.current?.formState.isValid) {
        submitPavilionForm(onSubmit)(event)
      }
    }
  }

  const toggleModal = () => {
    setIsOpen(!props.isOpen)
  }

  return (
    <Modal autoFocus centered isOpen={isOpen} onClosed={() => reset()} role="dialog" size="xl" toggle={toggleModal}>
      <ModalHeader> Add / Edit {t('Pavilion')}</ModalHeader>
      <ModalBody>
        <Container>
          <form onSubmit={handleSubmit}>
            <Row>
              <div className="col-6 mt-3">
                <div>
                  <label className="mb-2 p-0" htmlFor="name">
                    {t('Pavilion Name')}
                  </label>
                </div>
                <div>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" className="form-control" placeholder={t('Pavilion Name')} required />}
                  />
                </div>
              </div>
            </Row>
            <Row className="mt-3">
              <div className="col-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="code">
                    {t('Pavilion Code')}
                  </label>
                </div>
                <div>
                  <Controller
                    name="code"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" className="form-control" placeholder={t('Pavilion Code')} required />}
                  />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="coordinates">
                    {t('Pavilion Coordinate')}
                  </label>
                </div>
                <div>
                  <Controller
                    name="coordinates"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" className="form-control" placeholder={t('Pavilion Coordinates')} required />}
                  />
                </div>
              </div>
            </Row>
            <div>
              {entranceFields.map((field, index) => (
                <Row key={field.id} className="gx-2 mt-3">
                  <div className="col-2">
                    <div>
                      <label className="mb-2 p-0" htmlFor={`entrances.${index}.name`}>
                        {t('Entrance Name')}
                      </label>
                    </div>
                    <div>
                      <Controller
                        name={`entrances.${index}.name`}
                        control={control}
                        render={({ field }) => <Input {...field} type="text" className="form-control" placeholder={t('Entrance Name')} />}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div>
                      <label className="mb-2 p-0" htmlFor={`entrances.${index}.code`}>
                        {t('Entrance Name')}
                      </label>
                    </div>
                    <div>
                      <Controller
                        name={`entrances.${index}.code`}
                        control={control}
                        render={({ field }) => <Input {...field} type="text" className="form-control" placeholder={t('Entrance Code')} />}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div>
                      <label className="mb-2 p-0" htmlFor={`entrances.${index}.coordinates`}>
                        {t('Entrance coordinate')}
                      </label>
                    </div>
                    <div>
                      <Controller
                        name={`entrances.${index}.coordinates`}
                        control={control}
                        render={({ field }) => <Input {...field} type="text" className="form-control" placeholder={t('Entrance coordinate')} />}
                      />
                    </div>
                  </div>
                  <Row className="col gx-1">
                    <div className="col">
                      <div>
                        <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold1`} style={{ fontSize: '10px' }}>
                          {t('Green Threshold')}
                        </label>
                      </div>
                      <div>
                        <Controller
                          name={`entrances.${index}.threshold1`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold2`} style={{ fontSize: '10px' }}>
                          {t('Yellow Threshold')}
                        </label>
                      </div>
                      <div>
                        <Controller
                          name={`entrances.${index}.threshold2`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold3`} style={{ fontSize: '10px' }}>
                          {t('Orange Threshold')}
                        </label>
                      </div>
                      <div>
                        <Controller
                          name={`entrances.${index}.threshold3`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold4`} style={{ fontSize: '10px' }}>
                          {t('Red Threshold')}
                        </label>
                      </div>
                      <div>
                        <Controller
                          name={`entrances.${index}.threshold4`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold5`} style={{ fontSize: '10px' }}>
                          {t('Purple Threshold')}
                        </label>
                      </div>
                      <div>
                        <Controller
                          name={`entrances.${index}.threshold5`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} />
                          )}
                        />
                      </div>
                    </div>
                  </Row>
                  <div className="col-auto d-flex align-items-end">
                    <Button variant="danger" className="bg-red border-0 mb-1" onClick={() => remove(index)} size="sm">
                      <DeleteIcon width="20px" height="20px" fill="#FFF" />
                    </Button>
                  </div>
                </Row>
              ))}
              <div className="mt-3">
                <AddEntrance ref={addEntranceRef} append={append} />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
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
                <Button type="submit" className="btn bg-red border-0 me-2 d-inline-flex align-items-center" disabled={isLoading} variant="danger">
                  {isLoading && (
                    <Spinner className="me-1" size="sm">
                      Loading...
                    </Spinner>
                  )}
                  <span>{t('Save')}</span>
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
