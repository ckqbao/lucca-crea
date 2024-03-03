import React, { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Input,
  Container,
} from 'reactstrap'
import Button from 'react-bootstrap/Button'
import { FileDrop } from 'react-file-drop'

import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg'

export default function ParticipantModal(props) {
  const { t } = useTranslation()

  const { control, getValues, handleSubmit, reset, setValue } = useForm({
    values: {
      id: props.initialValues?.id,
      category: props.category,
      description: props.initialValues?.description ?? '',
      name: props.initialValues?.name ?? '',
      participantImage: props.initialValues?.participantImage,
      active: props.initialValues?.active ?? false,
    },
  })

  const fileInputRef = useRef(null)

  const onFileDrop = (files, event) => {
    for (var i = 0; i < files.length; i++) {
      let exe = files[i].name.split('.').pop()
      if (exe === 'jpg' || exe === 'jpeg' || exe === 'png') {
        setValue('image', files[i])
        const fileReader = new FileReader()
        fileReader.onload = () => {
          props.setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(files[i])
        break
      }
    }
  }

  const onTargetClick = () => {
    fileInputRef.current.click()
  }

  const toggleModal = () => {
    props.setIsOpen(!props.isOpen)
    reset()
  }

  return (
    <Modal
      isOpen={props.isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      tabIndex="-1"
      data-toggle="modal"
      toggle={toggleModal}
    >
      <ModalHeader> Add / Edit {props.title}</ModalHeader>
      <ModalBody>
        <Container>
          <form onSubmit={handleSubmit(props.onSave)}>
            <Row>
              <div className="col-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="name">
                    {t('Name')}
                  </label>
                </div>
                <div>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className="form-control"
                        placeholder={t('Name')}
                        required
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="name">
                    {t('Category')}
                  </label>
                </div>
                <div>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className="form-control"
                        readOnly
                      />
                    )}
                  />
                </div>
              </div>
            </Row>
            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="name">
                  {t('Description')}
                </label>
              </div>
              <div>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      className="form-control"
                      placeholder={t('Description')}
                      rows={5}
                      required
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="avatar">
                  {t('Image')}
                </label>
              </div>
              <div>
                <Controller
                  control={control}
                  name="participantImage"
                  render={({ field: { value, onChange, ...field } }) => (
                    <input
                      {...field}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      ref={fileInputRef}
                      onChange={(event) => {
                        const { files } = event.target
                        if (!files[0]) return

                        onChange(files[0])
                        const fileReader = new FileReader()
                        fileReader.onload = () => {
                          props.setPreviewUrl?.(fileReader.result)
                        }
                        fileReader.readAsDataURL(files[0])
                      }}
                      style={{ display: 'none' }}
                    />
                  )}
                />
                {getValues('participantImage') && props.previewUrl ? (
                  <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                    <div>
                      <img
                        style={{ maxHeight: '90px' }}
                        src={props.previewUrl}
                        alt="preview"
                      />
                    </div>
                  </FileDrop>
                ) : getValues('participantImage') && !props.previewUrl ? (
                  <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                    <div>
                      <i className="bx bxs-image text-primary bx-lg"></i>
                      <div>
                        {getValues('participantImage')?.name
                          ? getValues('participantImage').name
                          : getValues('participantImage')}
                      </div>
                    </div>
                  </FileDrop>
                ) : (
                  <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                    <div>
                      <div className="text-center">
                        <UploadIcon />
                      </div>
                      <div>
                        {t(
                          'Drag a file in this area or select it from your device'
                        )}
                      </div>
                    </div>
                  </FileDrop>
                )}
              </div>
            </div>
            <div className="form-check d-flex justify-content-end mt-3">
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
                    onChange={(event) => field.onChange(event.target.checked)}
                    readOnly={getValues('id') ? false : true}
                  />
                )}
              />
              <label
                className="form-check-label ms-2"
                style={{ marginTop: 1 }}
                htmlFor="active"
              >
                {t('Active')}
              </label>
            </div>
            <Row>
              <div className="text-end mt-3">
                <Button
                  type="submit"
                  className="btn-sm bg-red border-0 me-2"
                  variant="danger"
                >
                  {t('Save')}
                </Button>
                <Button
                  type="button"
                  className="btn-sm border-0"
                  onClick={toggleModal}
                  variant="dark"
                >
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
