import React, { useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import { Modal, ModalBody, Input, Container } from 'reactstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg';

import { useTranslation } from 'react-i18next';

const PoapModal = (props) => {
  const { t } = useTranslation();

  const imgInputRef = useRef(null);
  const fallbackImageInputRef = useRef(null);

  const onImgInputChange = (event) => {
    const { files } = event.target;

    props.setFormState({
      ...props.formState,
      image: files[0],
    });

    const fileReader = new FileReader();
    fileReader.onload = () => {
      props.setPreviewImgUrl(fileReader.result);
    };
    fileReader.readAsDataURL(files[0]);
  };

  const onFallbackImageInputChange = (event) => {
    const { files } = event.target;

    props.setFormState({
      ...props.formState,
      fallbackImage: files[0],
    });

    const fileReader = new FileReader();
    fileReader.onload = () => {
      props.setPreviewFallbackImageUrl(fileReader.result);
    };
    fileReader.readAsDataURL(files[0]);
  };

  const onImgClick = () => {
    imgInputRef.current.click();
  };

  const onFallbackImageClick = () => {
    fallbackImageInputRef.current.click();
  };

  const onImgDrop = (files, event) => {
    for (var i = 0; i < files.length; i++) {
      let exe = files[i].name.split('.').pop();
      if (exe === 'gif' || exe === 'jpeg' || exe === 'png' || exe === 'apng') {
        props.setFormState({
          ...props.formState,
          image: files[i],
        });

        const fileReader = new FileReader();
        fileReader.onload = () => {
          props.setPreviewImgUrl(fileReader.result);
        };
        fileReader.readAsDataURL(files[i]);
        break;
      }
    }
  };

  const onFallbackImageDrop = (files, event) => {
    for (var i = 0; i < files.length; i++) {
      let exe = files[i].name.split('.').pop();
      if (exe === 'gif' || exe === 'jpeg' || exe === 'png') {
        props.setFormState({
          ...props.formState,
          fallbackImage: files[i],
        });

        const fileReader = new FileReader();
        fileReader.onload = () => {
          props.setPreviewFallbackImageUrl(fileReader.result);
        };
        fileReader.readAsDataURL(files[i]);
        break;
      }
    }
  };

  const toggleModal = () => {
    props.setIsOpen(!props.isOpen);
    props.setFormState({
      name: '',
      image: '',
      fallbackImage: '',
      startDate: '',
      endDate: '',
      description: '',
      isPoap: false,
      poapId: '',
      isRedeemable: false,
      redemptionCode: '',
    });
    props.setPreviewImgUrl();
    props.setPreviewFallbackImageUrl();
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'isPoap' || name === 'isRedeemable') {
      value = !value;
    }
    props.setFormState({
      ...props.formState,

      [name]: value,
    });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      tabIndex="-1"
      data-toggle="modal"
      toggle={toggleModal}
      size="lg"
    >
      <ModalBody>
        <Container>
          <div className="my-3">
            <h4>
              {t('Add / Edit')} {t(props.name)}
            </h4>
          </div>

          <form onSubmit={props.onSaveClick}>
            <Row className="mt-3 mb-2">
              <Col>
                <div>
                  <div>
                    <label className="mb-2 p-0" htmlFor="image">
                      {t('Primary Image')} *
                    </label>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={imgInputRef}
                      onChange={onImgInputChange}
                      name="image"
                      id="image"
                      accept=".jpeg, .png, .apng, .gif"
                      style={{ display: 'none' }}
                    />
                    {props.formState.image && props.previewImgUrl ? (
                      <FileDrop onTargetClick={onImgClick} onDrop={onImgDrop}>
                        <div>
                          <img
                            style={{ maxHeight: '90px' }}
                            src={props.previewImgUrl}
                          />
                        </div>
                      </FileDrop>
                    ) : props.formState.image && !props.previewImgUrl ? (
                      <FileDrop onTargetClick={onImgClick} onDrop={onImgDrop}>
                        <div>
                          <i className="bx bxs-image text-primary bx-lg"></i>
                          <div>
                            {props.formState.image.name
                              ? props.formState.image.name
                              : props.formState.image}
                          </div>
                        </div>
                      </FileDrop>
                    ) : (
                      <FileDrop onTargetClick={onImgClick} onDrop={onImgDrop}>
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
                    <div>
                      <strong style={{ fontSize: '12px', color: 'red' }}>
                        {props.errorMessage?.image}
                      </strong>
                    </div>
                  </div>
                </div>
              </Col>

              <Col>
                <div>
                  <div>
                    <label className="mb-2 p-0" htmlFor="fallbackImage">
                      {t('Alternative Image')}
                    </label>
                  </div>
                  <div>
                    <input
                      type="file"
                      name="fallbackImage"
                      id="fallbackImage"
                      accept=".jpeg, .png, .gif"
                      ref={fallbackImageInputRef}
                      onChange={onFallbackImageInputChange}
                      style={{ display: 'none' }}
                    />
                    {props.formState.fallbackImage &&
                    props.previewFallbackImageUrl ? (
                      <FileDrop
                        onTargetClick={onFallbackImageClick}
                        onDrop={onFallbackImageDrop}
                      >
                        <div>
                          <img
                            style={{ maxHeight: '90px' }}
                            src={props.previewFallbackImageUrl}
                          />
                        </div>
                      </FileDrop>
                    ) : props.formState.fallbackImage &&
                      !props.previewFallbackImageUrl ? (
                      <FileDrop
                        onTargetClick={onFallbackImageClick}
                        onDrop={onFallbackImageDrop}
                      >
                        <div>
                          <i className="bx bxs-image text-primary bx-lg"></i>
                          <div>
                            {props.formState.fallbackImage.name
                              ? props.formState.fallbackImage.name
                              : props.formState.fallbackImage}
                          </div>
                        </div>
                      </FileDrop>
                    ) : (
                      <FileDrop
                        onTargetClick={onFallbackImageClick}
                        onDrop={onFallbackImageDrop}
                      >
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
              </Col>
            </Row>
            <div>
              <div>
                <label className="mb-2 p-0" htmlFor="name">
                  {t('Name')}* {t('(Event title)')}
                </label>
              </div>

              <div>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={props.formState.name}
                  onChange={onChangeHandler}
                />
                <div>
                  <strong style={{ fontSize: '12px', color: 'red' }}>
                    {props.errorMessage?.name}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="description">
                  {t('Description')}*
                </label>
              </div>
              <div>
                <Input
                  type="textarea"
                  rows={5}
                  name="description"
                  id="description"
                  className="form-control"
                  value={props.formState.description}
                  onChange={onChangeHandler}
                />
                <div>
                  <strong style={{ fontSize: '12px', color: 'red' }}>
                    {props.errorMessage?.description}
                  </strong>
                </div>
              </div>
            </div>

            <Row className="mt-3">
              <Col>
                <div>
                  <div>
                    <label className="mb-2 p-0" htmlFor="eventStartDate">
                      {t('Start date')}*
                    </label>
                  </div>
                  <div>
                    <Input
                      type="date"
                      name="startDate"
                      id="eventStartDate"
                      className="form-control"
                      value={props.formState.startDate}
                      onChange={onChangeHandler}
                    />
                    <div>
                      <strong style={{ fontSize: '12px', color: 'red' }}>
                        {props.errorMessage?.startDate}
                      </strong>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <div>
                    <label className="mb-2 p-0" htmlFor="endDate">
                      {t('End date')}
                    </label>
                  </div>
                  <div>
                    <Input
                      type="date"
                      name="endDate"
                      id="endDate"
                      className="form-control"
                      value={props.formState.endDate}
                      onChange={onChangeHandler}
                    />
                    <div>
                      <strong style={{ fontSize: '12px', color: 'red' }}>
                        {props.errorMessage?.endDate}
                      </strong>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <div className="d-flex align-items-center mb-3">
                <Col className="d-flex align-items-center">
                  <Input
                    type="checkbox"
                    id="isPoap"
                    aria-label="Checkbox for following text input"
                    className="m-0"
                    checked={props.formState.isPoap}
                    onChange={() => {
                      props.setFormState({
                        ...props.formState,
                        isPoap: !props.formState.isPoap,
                      });
                    }}
                  />
                  <div className="ms-3">
                    {t('Has a POAP associated on the blockchain?')}
                  </div>
                </Col>
                <Col>
                  <label className="mb-2 p-0" htmlFor="poapId">
                    {t('POAP Reference')} *
                  </label>
                  <Input
                    disabled={!props.formState.isPoap}
                    type="text"
                    name="poapId"
                    id="poapId"
                    placeholder={t('POAP Reference')}
                    className="form-control"
                    value={props.formState.poapId}
                    onChange={onChangeHandler}
                  />
                  <div>
                    <strong style={{ fontSize: '12px', color: 'red' }}>
                      {props.errorMessage?.poapId}
                    </strong>
                  </div>
                </Col>
              </div>
            </Row>
            <Row>
              <div className="d-flex align-items-center mb-3">
                <Col className="d-flex align-items-center">
                  <Input
                    type="checkbox"
                    id="isRedeemable"
                    aria-label="Checkbox for following text input"
                    className="m-0"
                    checked={props.formState.isRedeemable}
                    onChange={() => {
                      props.setFormState({
                        ...props.formState,
                        isRedeemable: !props.formState.isRedeemable,
                      });
                    }}
                  />
                  <div className="ms-3">
                    {t('Is redeemable by a LC&G user?')}
                  </div>
                </Col>
                <Col>
                  <label className="mb-2 p-0" htmlFor="redemptionCode">
                    {t('Redemption code')} *
                  </label>
                  <Input
                    disabled={!props.formState.isRedeemable}
                    type="text"
                    name="redemptionCode"
                    id="redemptionCode"
                    placeholder={t('Redemption code')}
                    className="form-control"
                    value={props.formState.redemptionCode}
                    onChange={onChangeHandler}
                  />
                  <div>
                    <strong style={{ fontSize: '12px', color: 'red' }}>
                      {props.errorMessage?.redemptionCode}
                    </strong>
                  </div>
                </Col>
              </div>
            </Row>

            <Row>
              <div className="text-end mt-3">
                <Button type="submit" className="btn-sm me-2" variant="success">
                  {t('Save')}
                </Button>
                <Button
                  type="button"
                  className="btn-sm"
                  variant="danger"
                  onClick={toggleModal}
                >
                  {t('Cancel')}
                </Button>
              </div>
            </Row>
          </form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default PoapModal;
