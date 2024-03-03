import _ from 'lodash'
import { FormEvent, useRef } from 'react'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Modal, ModalHeader, ModalBody, Row, Input, Container, FormGroup, Spinner } from 'reactstrap'
import Button from 'react-bootstrap/Button'

import AddEntrance, { AddEntranceHandle } from './AddEntrance'
import EntranceField from './EntranceField'
import { PavilionFormValues } from './types'

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

  const formProps = useForm<PavilionFormValues>({
    values: initialValues,
  })
  const { control, getValues, handleSubmit: submitPavilionForm, reset } = formProps
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
          <FormProvider {...formProps}>
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
                      {t('Pavilion Coordinates')}
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
                {entranceFields.map((field, index: number) => (
                  <EntranceField key={field.id} index={index} initialValues={initialValues.entrances?.[index]} pavilionId={initialValues.id} remove={remove} />
                ))}
                <div className="mt-3">
                  <AddEntrance ref={addEntranceRef} append={append} pavilionId={initialValues.id} />
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
          </FormProvider>
        </Container>
      </ModalBody>
    </Modal>
  )
}
