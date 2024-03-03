import _ from 'lodash'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Input, Row } from 'reactstrap'
import Button from 'react-bootstrap/Button'

import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg'
import { ReactComponent as DeleteIcon } from '@/assets/icons/trash.svg'
import { ReactComponent as EditIcon } from '@/assets/icons/pencil.svg'
import { ReactComponent as XIcon } from '@/assets/icons/x-lg.svg'

import { EntranceFormValues, PavilionFormValues } from './types'
import { useDeleteEntranceMutation, useEditEntranceMutation } from '@/services/api/entrances'

type EntranceFieldProps = {
  index: number
  initialValues?: EntranceFormValues
  pavilionId?: string
  remove: (index: number) => void
}

export default function EntranceField(props: EntranceFieldProps) {
  const {
    index,
    initialValues = { code: '', coordinates: '', name: '', threshold0: '', threshold1: '', threshold2: '', threshold3: '', threshold4: '', threshold5: '' },
    pavilionId,
    remove,
  } = props
  const { control, getValues, resetField } = useFormContext<PavilionFormValues>()
  const { t } = useTranslation()

  const [editable, setEditable] = useState(false)

  const [deleteEntrance] = useDeleteEntranceMutation()
  const [editEntrance] = useEditEntranceMutation()

  const handleCancelUpdate = () => {
    resetField(`entrances.${index}`, { defaultValue: initialValues })
    setEditable(false)
  }

  const handleUpdateEntrance = () => {
    const { _id: entranceId, code, coordinates, name, threshold0, threshold1, threshold2, threshold3, threshold4, threshold5 } = getValues(`entrances.${index}`)
    if (entranceId && pavilionId) {
      editEntrance({
        id: entranceId,
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
        .then(() => {
          setEditable(false)
        })
        .catch((error) => {
          toast.error(t(_.get(error, 'data.message', 'An unexpected error has occurred, please try again!')))
        })
    }
  }

  const handleDeleteEntrance = () => {
    const { _id: entranceId } = getValues(`entrances.${index}`)
    if (entranceId && pavilionId) {
      deleteEntrance({ entranceId, pavilionId })
        .unwrap()
        .then(() => {
          const entrances = getValues('entrances')
          if (entrances?.find((entrance) => entrance._id === entranceId)) remove(index)
        })
        .catch((error) => {
          toast.error(t(_.get(error, 'data.message', 'An unexpected error has occurred, please try again!')))
        })
    } else {
      remove(index)
    }
  }

  return (
    <Row className="gx-2 mt-3 align-items-center align-items-lg-end">
      <div className="col">
        <Row className="align-items-end gx-1 gy-1">
          <div className="col-lg-7">
            <Row className="align-items-end gx-2">
              <div className="col-4">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.name`}>
                    {t('Entrance Name')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.name`}
                    control={control}
                    render={({ field }) => <Input {...field} type="text" className="form-control" placeholder={t('Entrance Name')} readOnly={!editable} />}
                  />
                </div>
              </div>
              <div className="col-4">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.code`}>
                    {t('Entrance Code')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.code`}
                    control={control}
                    render={({ field }) => <Input {...field} type="text" className="form-control" placeholder={t('Entrance Code')} readOnly={!editable} />}
                  />
                </div>
              </div>
              <div className="col-4">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.coordinates`}>
                    {t('Entrance Coordinates')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.coordinates`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className="form-control" placeholder={t('Entrance Coordinates')} readOnly={!editable} />
                    )}
                  />
                </div>
              </div>
            </Row>
          </div>
          <div className="col-lg-5">
            <Row className="gx-1 align-items-end">
              <div className="col">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold0`} style={{ fontSize: '10px' }}>
                    {t('Gray THR')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.threshold0`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} readOnly={!editable} />
                    )}
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold1`} style={{ fontSize: '10px' }}>
                    {t('Green THR')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.threshold1`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} readOnly={!editable} />
                    )}
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold2`} style={{ fontSize: '10px' }}>
                    {t('Yellow THR')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.threshold2`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} readOnly={!editable} />
                    )}
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold3`} style={{ fontSize: '10px' }}>
                    {t('Orange THR')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.threshold3`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} readOnly={!editable} />
                    )}
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold4`} style={{ fontSize: '10px' }}>
                    {t('Red THR')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.threshold4`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} readOnly={!editable} />
                    )}
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label className="mb-2 p-0" htmlFor={`entrances.${index}.threshold5`} style={{ fontSize: '10px' }}>
                    {t('Purple THR')}
                  </label>
                </div>
                <div>
                  <Controller
                    name={`entrances.${index}.threshold5`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" className="form-control threshold-input" placeholder={t('Threshold in minute')} readOnly={!editable} />
                    )}
                  />
                </div>
              </div>
            </Row>
          </div>
        </Row>
      </div>
      <div className="col-auto d-flex">
        {editable && !!pavilionId && (
          <>
            <Button variant="warning" className="border-0 mb-1 me-1" onClick={handleUpdateEntrance} size="sm" aria-label="Check-lg">
              <CheckIcon width="20px" height="20px" fill="#FFF" />
            </Button>
            <Button variant="danger" className="bg-red border-0 mb-1" onClick={handleCancelUpdate} size="sm">
              <XIcon width="20px" height="20px" fill="#FFF" />
            </Button>
          </>
        )}
        {!editable && !!pavilionId && (
          <Button variant="warning" className="border-0 mb-1 me-1" onClick={() => setEditable(true)} size="sm">
            <EditIcon width="20px" height="20px" fill="#FFF" />
          </Button>
        )}
        {!editable && (
          <Button variant="danger" className="bg-red border-0 mb-1" onClick={handleDeleteEntrance} size="sm">
            <DeleteIcon width="20px" height="20px" fill="#FFF" />
          </Button>
        )}
      </div>
    </Row>
  )
}
