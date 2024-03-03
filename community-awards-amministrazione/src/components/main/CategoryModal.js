import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Input,
  Container,
} from "reactstrap";
import Button from "react-bootstrap/Button";
import { FileDrop } from "react-file-drop";

import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import ColorPicker from "../common/ColorPicker";

export default function CategoryModal(props) {
  const { t } = useTranslation();

  const { control, getValues, handleSubmit, reset, setValue, watch } = useForm({
    values: {
      id: props.initialValues?.id,
      name: props.initialValues?.name ?? "",
      categoryColor: props.initialValues?.categoryColor ?? "",
      categoryTimeRemainingColor:
        props.initialValues?.categoryTimeRemainingColor ?? "",
      categoryImage: props.initialValues?.categoryImage ?? "",
      description: props.initialValues?.description ?? "",
      active: props.initialValues?.active ?? false,
    },
  });

  watch('categoryColor')
  const fileInputRef = useRef(null);

  const onFileDrop = (files, event) => {
    for (var i = 0; i < files.length; i++) {
      let exe = files[i].name.split(".").pop();
      if (exe === "jpg" || exe === "jpeg" || exe === "png") {
        setValue("image", files[i]);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          props.setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(files[i]);
        break;
      }
    }
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const toggleModal = () => {
    props.setIsOpen(!props.isOpen);
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
      onClosed={reset}
    >
      <ModalHeader>Add / Edit {props.title}</ModalHeader>
      <ModalBody className="pb-4">
        <Container>
          <form onSubmit={handleSubmit(props.onSave)}>
            <div>
              <div>
                <label className="mb-2 p-0" htmlFor="name">
                  {t("Name")}
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
                      placeholder={t("Name")}
                      required
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="name">
                  {t("Description")}
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
                      placeholder={t("Description")}
                      rows={5}
                      required
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="name">
                  {t("Category color")}
                </label>
              </div>
              <div className="w-25">
                <Controller
                  name="categoryColor"
                  control={control}
                  render={({ field }) => (
                    <ColorPicker
                      value={field.value}
                      onChange={(color) => {
                        setValue("categoryColor", color.hex);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="name">
                  {t("Time remaining color")}
                </label>
              </div>
              <div className="w-25">
                <Controller
                  name="categoryTimeRemainingColor"
                  control={control}
                  render={({ field }) => (
                    <ColorPicker
                      value={field.value}
                      onChange={(color) => {
                        setValue("categoryTimeRemainingColor", color.hex);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-3">
              <div>
                <label className="mb-2 p-0" htmlFor="avatar">
                  {t("Image")}
                </label>
              </div>
              <div>
                <Controller
                  control={control}
                  name="categoryImage"
                  render={({ field: { value, onChange, ...field } }) => (
                    <input
                      {...field}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      ref={fileInputRef}
                      onChange={(event) => {
                        const { files } = event.target;
                        if (!files[0]) return;

                        onChange(files[0]);
                        const fileReader = new FileReader();
                        fileReader.onload = () => {
                          props.setPreviewUrl?.(fileReader.result);
                        };
                        fileReader.readAsDataURL(files[0]);
                      }}
                      value={value?.fileName}
                      style={{ display: "none" }}
                    />
                  )}
                />
                {getValues("categoryImage") && props.previewUrl ? (
                  <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                    <div>
                      <img
                        style={{
                          maxHeight: "90px",
                          backgroundColor: getValues("categoryColor"),
                        }}
                        src={props.previewUrl}
                        alt="preview"
                      />
                    </div>
                  </FileDrop>
                ) : getValues("categoryImage") && !props.previewUrl ? (
                  <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
                    <div>
                      <i className="bx bxs-image text-primary bx-lg"></i>
                      <div>
                        {getValues("categoryImage")?.name
                          ? getValues("categoryImage").name
                          : getValues("categoryImage")}
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
                          "Drag a file in this area or select it from your device"
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
                      width: "1.22em",
                      height: "1.2em",
                      backgroundColor: "#808080",
                    }}
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    readOnly={getValues("id") ? false : true}
                  />
                )}
              />
              <label
                className="form-check-label ms-2"
                style={{ marginTop: 1 }}
                htmlFor="active"
              >
                {t("Active")}
              </label>
            </div>
            <Row>
              <div className="text-end mt-3">
                <Button
                  type="submit"
                  className="btn-sm bg-red border-0 me-2"
                  variant="danger"
                >
                  {t("Save")}
                </Button>
                <Button
                  type="button"
                  className="btn-sm border-0"
                  onClick={toggleModal}
                  variant="dark"
                >
                  {t("Cancel")}
                </Button>
              </div>
            </Row>
          </form>
        </Container>
      </ModalBody>
    </Modal>
  );
}
