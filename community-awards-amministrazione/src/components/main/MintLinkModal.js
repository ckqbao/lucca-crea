import React, { useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import { Modal, ModalBody, Container } from 'reactstrap';

import Button from 'react-bootstrap/Button';

import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg';

import { useTranslation } from 'react-i18next';

const MintLinkModal = (props) => {
  const { t } = useTranslation();

  const fileInputRef = useRef(null);

  const onFileInputChange = (event) => {
    const { files } = event.target;

    props.setMintFormState({
      ...props.mintFormState,
      import: files[0],
    });

    const fileReader = new FileReader();
    fileReader.onload = () => {
      props.setPreviewFileUrl(fileReader.result);
    };
    fileReader.readAsDataURL(files[0]);
  };

  const onFileClick = () => {
    fileInputRef.current.click();
  };

  const onFileDrop = (files, event) => {
    for (var i = 0; i < files.length; i++) {
      let exe = files[i].name.split('.').pop();
      if (exe === 'csv') {
        props.setMintFormState({
          ...props.mintFormState,
          import: files[i],
        });

        const fileReader = new FileReader();
        fileReader.onload = () => {
          props.setPreviewFileUrl(fileReader.result);
        };
        fileReader.readAsDataURL(files[i]);
        break;
      }
    }
  };

  const toggleModal = () => {
    props.setPoapId();
    props.setMintFormState({
      import: '',
    });
    props.setPreviewFileUrl();
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
              {t('Add')} {t(props.name)}
            </h4>
          </div>
          <form onSubmit={props.onAddMintLinks}>
            <div>
              <label className="mb-2 p-0" htmlFor="import">
                {t('Mint Links')} *
              </label>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileInputChange}
                name="import"
                id="import"
                accept=".csv"
                style={{ display: 'none' }}
              />
              {props.mintFormState.import && props.previewFileUrl ? (
                <FileDrop onTargetClick={onFileClick} onDrop={onFileDrop}>
                  <div>
                    <img
                      style={{ maxHeight: '90px' }}
                      src={require('../../assets/icons/file.svg')}
                    />
                  </div>
                </FileDrop>
              ) : (
                <FileDrop onTargetClick={onFileClick} onDrop={onFileDrop}>
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
            <div className="mt-3 d-flex align-items-center justify-content-end">
              <Button
                onClick={props.onAddMintLinks}
                type="submit"
                className="btn-sm me-2"
                variant="success"
              >
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
          </form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default MintLinkModal;
