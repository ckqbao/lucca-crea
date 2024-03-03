import React, { useState, useRef } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Input,
  Container,
  Button,
} from 'reactstrap';

import { useTranslation } from 'react-i18next';

const WarningModal = (props) => {
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
      <ModalHeader toggle={toggleModal}>Warning!</ModalHeader>
      <ModalBody>
        <Container>
          <div className="font-size-14">
            <div>
              {t(
                'Ci sono dei link associati a questo documento, si prega di rimuoverli prima di procedere con questa operazione'
              )}
            </div>
          </div>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default WarningModal;
