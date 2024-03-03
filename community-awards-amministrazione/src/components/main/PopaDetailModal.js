import React from 'react';
import { Modal, ModalBody, Container } from 'reactstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useTranslation } from 'react-i18next';

const PoapDetailModal = (props) => {
  const { t } = useTranslation();

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
          <Row className="mt-3 mb-3">
            <Col>
              <div>
                <h5>{t('Primary Image')}: </h5>
                <div>
                  <img
                    style={{ maxHeight: '90px' }}
                    src={props.previewImgUrl}
                  />
                </div>
              </div>
            </Col>

            <Col>
              <div>
                <h5>{t('Alternative Image')}:</h5>{' '}
                <div>
                  <img
                    style={{ maxHeight: '90px' }}
                    src={props.previewFallbackImageUrl}
                  />{' '}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3 mb-3">
            <Col>
              <div>
                <h5>{t('Name')}:</h5>
                <div>
                  <p>{props.formState.name}</p>
                </div>
              </div>

              <div>
                <h5>{t('Description')}:</h5>
                <div>
                  <p>{props.formState.description}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3 mb-3">
            <Col>
              <h5>{t('Start date')}:</h5>
              <div>
                <p>{props.formState.startDate}</p>
              </div>
            </Col>
            <Col>
              <h5>{t('End date')}:</h5>
              <div>
                <p>{props.formState.endDate}</p>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <h5>{t('Has a POAP associated on the blockchain?')}:</h5>
              <p>{JSON.stringify(props.formState.isPoap)}</p>
            </Col>
            <Col>
              <h5>{t('POAP Reference')}: </h5>
              <div>
                <p>{props.formState.poapId}</p>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col>
              <h5>{t('Is redeemable by a LC&G user?')}:</h5>
              <div>
                <p>{JSON.stringify(props.formState.isRedeemable)}</p>
              </div>
            </Col>
            <Col>
              <h5>{t('Redemption code')}: </h5>
              <div>
                <p>{props.formState.redemptionCode}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default PoapDetailModal;
