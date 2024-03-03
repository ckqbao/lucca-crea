import _ from 'lodash'
import { Ref, forwardRef, useEffect, useImperativeHandle } from 'react'
import { FormState, UseFieldArrayAppend, UseFormGetValues, UseFormTrigger, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'

import { Row } from 'reactstrap'
import Button from 'react-bootstrap/Button'

import { ReactComponent as PlusAlterIcon } from '@/assets/icons/plus-alter.svg'

import InputController from '@/components/form-controllers/InputController'

import { entranceFormSchema } from './schemas'
import { EntranceFormValues, PavilionFormValues } from './types'
import { useAddEntranceMutation } from '@/services/api/entrances'

export type AddEntranceHandle = {
  getValues: UseFormGetValues<EntranceFormValues>
  formState: FormState<EntranceFormValues>
  submit: () => Promise<void>
  trigger: UseFormTrigger<EntranceFormValues>
}

type AddEntranceProps = {
  append: UseFieldArrayAppend<PavilionFormValues, 'entrances'>
  pavilionId?: string
}

const AddEntrance = forwardRef(function AddEntrance(props: AddEntranceProps, ref: Ref<AddEntranceHandle>) {
  const { append, pavilionId } = props
  const { t } = useTranslation()

  const { clearErrors, control, formState, getValues, handleSubmit, reset, trigger, watch } = useForm<EntranceFormValues>({
    defaultValues: { code: '', coordinates: '', name: '', threshold0: '', threshold1: '', threshold2: '', threshold3: '', threshold4: '', threshold5: '' },
    reValidateMode: 'onBlur',
    resolver: yupResolver(entranceFormSchema),
  })
  const { getValues: getPavilionFormValues } = useFormContext<PavilionFormValues>()

  useImperativeHandle(ref, () => ({
    getValues,
    formState,
    submit: handleSubmit(handleAddEntrance),
    trigger,
  }))

  const [addEntrance] = useAddEntranceMutation()

  useEffect(() => {
    const subscription = watch((values) => {
      if (_.every(values, (value) => value === '')) {
        clearErrors()
      }
    })
    return () => subscription.unsubscribe()
  }, [clearErrors, watch])

  const handleAddEntrance = async (values: EntranceFormValues) => {
    const { code, coordinates, name, threshold0, threshold1, threshold2, threshold3, threshold4, threshold5 } = values
    if (pavilionId) {
      await addEntrance({
        pavilionId,
        code,
        coordinates,
        name,
        threshold0: parseInt(threshold0),
        threshold1: parseInt(threshold1),
        threshold2: parseInt(threshold2),
        threshold3: parseInt(threshold3),
        threshold4: parseInt(threshold4),
        threshold5: parseInt(threshold5),
      })
        .unwrap()
        .then((pavilion) => {
          const entrances = getPavilionFormValues('entrances')
          const addedEntrances = _.differenceBy(
            pavilion.entrances.map(
              (entrance) =>
                ({
                  ...entrance,
                  threshold0: entrance.threshold0 + '',
                  threshold1: entrance.threshold1 + '',
                  threshold2: entrance.threshold2 + '',
                  threshold3: entrance.threshold3 + '',
                  threshold4: entrance.threshold4 + '',
                  threshold5: entrance.threshold5 + '',
                } as EntranceFormValues)
            ),
            entrances ?? [],
            '_id'
          )

          for (const addedEntrance of addedEntrances) {
            append(addedEntrance)
          }
        })
    } else {
      append(values)
    }
    reset()
  }

  return (
    <Row className="gx-2 align-items-center align-items-lg-end">
      <div className="col">
        <Row className="align-items-end gx-1 gy-1">
          <div className="col-lg-7">
            <Row className="align-items-end gx-2">
              <div className="col-4">
                <div>
                  <label className="mb-2 p-0" htmlFor="name">
                    {t('Entrance Name')}
                  </label>
                </div>
                <InputController name="name" control={control} placeholder={t('Entrance Name')} />
              </div>
              <div className="col-4">
                <div>
                  <label className="mb-2 p-0" htmlFor="code">
                    {t('Entrance Code')}
                  </label>
                </div>
                <InputController name="code" control={control} placeholder={t('Entrance Code')} />
              </div>
              <div className="col-4">
                <div>
                  <label className="mb-2 p-0" htmlFor="coordinates">
                    {t('Entrance Coordinates')}
                  </label>
                </div>
                <InputController name="coordinates" control={control} placeholder={t('Entrance Coordinates')} />
              </div>
            </Row>
          </div>
          <div className="col-lg-5">
            <Row className="gx-1 align-items-end">
              <div className="col">
                <div>
                  <label className="mb-2 p-0" htmlFor="threshold0" style={{ fontSize: '10px' }}>
                    {t('Gray Threshold')}
                  </label>
                </div>
                <InputController className="threshold-input" name="threshold0" control={control} placeholder={t('Threshold in minute')} />
              </div>
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
          </div>
        </Row>
      </div>
      <div className="col-auto d-flex">
        <Button className="bg-red border-0 mb-1 me-1 invisible" size="sm">
          <div style={{ width: '20px', height: '20px' }} />
        </Button>
        <Button disabled={!formState.isValid} variant="danger" className="bg-red border-0 mb-1" onClick={handleSubmit(handleAddEntrance)} size="sm">
          <PlusAlterIcon width="20px" height="20px" fill="#FFF" />
        </Button>
      </div>
    </Row>
  )
})

export default AddEntrance
