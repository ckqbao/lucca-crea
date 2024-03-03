import React, { useState, useRef } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Input,
  Container,
} from 'reactstrap';

import Button from 'react-bootstrap/Button';

import { FileDrop } from 'react-file-drop';

import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg';

import { users } from '../../constants/Data';

import { useTranslation } from 'react-i18next';

const UserModal = (props) => {
  const { t } = useTranslation();

  const fileInputRef = useRef(null);
  const [pwError, setPwError] = useState();

  const onFileInputChange = (event) => {
    const { files } = event.target;
    props.setFormState({
      ...props.formState,
      avatar: files[0],
    });

    const fileReader = new FileReader();
    fileReader.onload = () => {
      props.setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(files[0]);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const toggleModal = () => {
    props.setIsOpen(!props.isOpen);
    props.setFormState({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
      role: '',
      active: true,
    });
    props.setPreviewUrl();
    setPwError();
  };

  const onChangeHandler = (e) => {
    const { name, value, type } = e.target;
    props.setFormState({
      ...props.formState,
      [name]: type === 'checkbox' ? !props.formState.active : value,
    });
    if (name === 'password') {
      var test1 = /^(?=.*[0-9])/;
      var test2 = /^(?=.*[a-zA-Z])/;

      if (!value && props.formState.id && !props.formState.confirmPassword)
        setPwError();
      else if (value.length < 8 || !value.length)
        setPwError('Password must be at least 8 characters');
      else if (!value.match(test1))
        setPwError('Password must contain 1 number');
      else if (!value.match(test2))
        setPwError('Password must contain 1 letter');
      else setPwError();
    } else if (name === 'confirmPassword') {
      if (!pwError || pwError === 'Passwords should be match') {
        if (!props.formState.id) {
          if (props.formState.password !== value)
            setPwError('Passwords should be match');
          else setPwError();
        } else {
          if (
            (!props.formState.password && !value) ||
            props.formState.password === value
          )
            setPwError();
          else setPwError('Passwords should be match');
        }
      }
    }
    return false;
  };

  const onFileDrop = (files, event) => {
    for (var i = 0; i < files.length; i++) {
      let exe = files[i].name.split('.').pop();
      if (exe === 'jpg' || exe === 'jpeg' || exe === 'png') {
        props.setFormState({
          ...props.formState,
          avatar: files[i],
        });
        const fileReader = new FileReader();
        fileReader.onload = () => {
          props.setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(files[i]);
        break;
      }
    }
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
    >
      <ModalHeader> Add / Edit {props.name}</ModalHeader>
      <ModalBody>
        <Container>
          <form onSubmit={props.onSaveClick}>
            <Row>
              <div className="mt-3 col-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="name">
                    {t('Name')} *
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
                    required
                  />
                </div>
              </div>
              <div className="mt-3 col-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="surname">
                    {t('Surname')} *
                  </label>
                </div>
                <div>
                  <Input
                    type="text"
                    name="surname"
                    id="surname"
                    className="form-control"
                    value={props.formState.surname}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>
            </Row>
            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="email">
                  {t('Email')} *
                </label>
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={props.formState.email}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>
            <Row>
              <div className="mt-3 col-md-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="password">
                    {t('Password')} *
                  </label>
                </div>
                <div>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={props.formState.password}
                    onChange={onChangeHandler}
                    required={props.formState.id ? false : true}
                  />
                </div>
              </div>
              <div className="mt-3 col-md-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="confirmPassword">
                    {t('Confirm Password')} *
                  </label>
                </div>
                <div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control"
                    value={props.formState.confirmPassword}
                    onChange={onChangeHandler}
                    required={props.formState.id ? false : true}
                  />
                </div>
              </div>
            </Row>
            {pwError && <div className="text-primary mt-2">{pwError}</div>}
            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="avatar">
                  {t('Avatar')}
                </label>
              </div>
              <div>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept=".jpg, .jpeg, .png"
                  ref={fileInputRef}
                  onChange={onFileInputChange}
                  style={{ display: 'none' }}
                />
                {props.formState.avatar && props.previewUrl ? (
                  <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                    <div>
                      <img
                        style={{ maxHeight: '90px' }}
                        src={props.previewUrl}
                        alt="preview"
                      />
                    </div>
                  </FileDrop>
                ) : props.formState.avatar && !props.previewUrl ? (
                  <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                    <div>
                      <i className="bx bxs-image text-primary bx-lg"></i>
                      <div>
                        {props.formState.avatar.name
                          ? props.formState.avatar.name
                          : props.formState.avatar}
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
            <Row className="mt-2">
              <div className="col-6">
                <div>
                  <label className="mb-2 p-0" htmlFor="role">
                    {t('Role')} *
                  </label>
                </div>
                <Input
                  type="select"
                  name="role"
                  id="role"
                  className="form-select form-control"
                  value={props.formState.role}
                  onChange={onChangeHandler}
                  required
                >
                  <option hidden value="">
                    {t('Select a Role')}
                  </option>
                  {users.map((el, id) => (
                    <option key={'role-' + id} value={el.value}>
                      {t(el.name)}
                    </option>
                  ))}
                </Input>
              </div>
              <div
                className="col-6 form-check"
                style={{
                  fontWeight: 500,
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: 30,
                }}
              >
                <Input
                  type="checkbox"
                  className="rounded-check"
                  id="active"
                  name="active"
                  style={{
                    width: '1.22em',
                    height: '1.2em',
                    backgroundColor: '#808080',
                  }}
                  checked={props.formState.id ? props.formState.active : true}
                  onChange={props.formState.id ? onChangeHandler : null}
                  readOnly={props.formState.id ? false : true}
                />
                <label
                  className="form-check-label ms-2"
                  style={{ marginTop: 1 }}
                  htmlFor="active"
                >
                  {t('Active')}
                </label>
              </div>
            </Row>
            <Row>
              <div className="text-end mt-3">
                <Button
                  type="submit"
                  disabled={pwError ? true : false}
                  className="btn-sm me-2"
                  variant="success"
                >
                  {t('Save')} {t(props.name)}
                </Button>
                <Button
                  type="button"
                  className="btn-sm"
                  onClick={toggleModal}
                  variant="danger"
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

export default UserModal;
