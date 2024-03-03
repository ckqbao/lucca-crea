import _ from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Modal, ModalHeader, ModalBody, Row, Input, Container, FormGroup, Alert } from 'reactstrap'
import Button from 'react-bootstrap/Button'
import InputController from '../form-controllers/InputController'
import { useEffect } from 'react'

const userFormSchema = yup.object({
  id: yup.string(),
  active: yup.boolean().required(),
  email: yup.string().required(),
  name: yup.string().required(),
  role: yup.string().required(),
  surname: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().when('password', {
    is: (val: string | undefined) => (val && val.length > 0 ? true : false),
    then: (schema) => schema.oneOf([yup.ref('password')], 'Password not match'),
  }),
})

type UserFormValues = yup.InferType<typeof userFormSchema>

type UserModalProps = {
  initialValues: UserFormValues
  isOpen: boolean
  onSubmit: (values: UserFormValues) => void
  setIsOpen: (isOpen: boolean) => void
  submissionError?: string
}

export default function UserModal(props: UserModalProps) {
  const { initialValues, isOpen, onSubmit, setIsOpen, submissionError } = props
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setError,
  } = useForm<UserFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(userFormSchema),
    reValidateMode: 'onBlur',
    values: initialValues,
  })

  useEffect(() => {
    if (submissionError) {
      setError('root.serverError', { message: submissionError })
    }
  }, [setError, submissionError])

  const toggleModal = () => {
    setIsOpen(!props.isOpen)
  }

  return (
    <Modal autoFocus centered isOpen={isOpen} onClosed={() => reset()} role="dialog" size="md" toggle={toggleModal}>
      <ModalHeader> Add / Edit {t('User')}</ModalHeader>
      <ModalBody>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.serverError?.message && <Alert color="danger">{errors.root.serverError.message}</Alert>}
            <Row>
              <div className="col-12 mt-3">
                <b>Nota:</b> gli operatori possono fare accesso all'applicazione solo con il cognome quindi il codice operatore  <b>deve</b> essere inserito in quel campo.
              </div>
            </Row>
            <Row>
              <div className="col-6 mt-3">
                <div>
                  <label className="mb-2 p-0" htmlFor="role">
                    {t('Role')}
                  </label>
                </div>
                <InputController name="role" control={control} placeholder={t('Role')} required type="select">
                  <option value="" hidden></option>
                  <option value="admin">{t('Admin')}</option>
                  <option value="operator">{t('Operator')}</option>
                  <option value="app">{t('App')}</option>
                </InputController>
              </div>
            </Row>
            <Row className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="name">
                  {t('Name')}
                </label>
              </div>
              <InputController name="name" control={control} placeholder={t('Name')} required />
            </Row>
            <Row className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="surname">
                  {t('Surname')}
                </label>
              </div>
              <InputController name="surname" control={control} placeholder={t('Surname')} required />
            </Row>
            <Row className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="email">
                  {t('E-mail')}
                </label>
              </div>
              <InputController name="email" control={control} placeholder="example@example.com" required />
            </Row>
            <Row className="mt-3">
              <div className="col-8">
                <div>
                  <label className="mb-2 p-0" htmlFor="password">
                    {t('Password')}
                  </label>
                </div>
                <InputController name="password" control={control} placeholder={t('Password')} required type="password" />
              </div>
            </Row>
            <Row className="mt-3">
              <div className="col-8">
                <div>
                  <label className="mb-2 p-0" htmlFor="confirmPassword">
                    {t('Confirm Password')}
                  </label>
                </div>
                <InputController name="confirmPassword" control={control} placeholder={t('Confirm Password')} required type="password" />
              </div>
            </Row>
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
