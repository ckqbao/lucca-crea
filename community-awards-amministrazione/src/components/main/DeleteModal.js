import React from 'react';
import { Modal, ModalHeader, ModalBody, Container } from 'reactstrap';

import Button from 'react-bootstrap/Button';

import { useTranslation } from 'react-i18next';

const DeleteModal = (props) => {
  const { t } = useTranslation();

  const toggleModal = () => {
    props.setIsOpen(!props.isOpen);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      role="dialog"
      autoFocus={true}
      tabIndex="-1"
      data-toggle="modal"
      toggle={toggleModal}
    >
      <ModalHeader>{t('Action Confirmation')}</ModalHeader>
      <ModalBody>
        <Container>
          <div className="font-size-14">
            <div>
              {t('You are about to delete')}{' '}
              {props.name === 'user' || props.name === 'additional link'
                ? t('an')
                : t('a')}{' '}
              {t(props.name)}.
            </div>
            <div>{t('Are you sure?')}</div>
          </div>
          <div className="text-end">
            <Button onClick={props.onDelete} variant="danger" className="me-2">
              {t('Yes')}
            </Button>
            <Button onClick={toggleModal} outline variant="secondary">
              {t('No')}
            </Button>
          </div>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
