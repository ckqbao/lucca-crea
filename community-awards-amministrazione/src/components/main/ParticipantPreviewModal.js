import clsx from "clsx";
import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import Button from "react-bootstrap/Button";
import request from "../../helpers/requestHelper";
import { PARTICIPANTS_ENDPOINT } from "../../redux/store/actions/participantActions";

export default function ParticipantPreviewModal(props) {
  const [imgUrl, setImgUrl] = useState();
  const [isOpen, setIsOpen] = useState();

  const handleOpen = () => {
    setIsOpen(true);
    request({
      url: `${PARTICIPANTS_ENDPOINT}/${props.participant.id}/image`,
      auth: true,
      method: "GET",
    }).then((res) => {
      if (!res.code) {
        setImgUrl(URL.createObjectURL(res));
      }
    });
  };

  const toggleModal = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="primary">
        Preview
      </Button>
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus
        centered
        size="xl"
        tabIndex="-1"
        data-toggle="modal"
        toggle={toggleModal}
        contentClassName="participant-preview-modal bg-transparent border border-2 border-dark"
      >
        <ModalBody>
          <figure
            className={clsx(
              { "bg-[#B7B7B7]": !imgUrl }
            )}
          >
            {imgUrl && (
              <img
                src={imgUrl}
                alt="preview"
              />
            )}
          </figure>
          <div className="card-body">
            <div className="card-content flex flex-1 flex-col space-y-2 lg:space-y-3">
              <h2
                className="card-name"
                style={{ color: props.categoryColor }}
              >
                {props.participant.name}
              </h2>
              <p
                className="card-description"
                style={{ color: props.categoryColor }}
              >
                {props.participant.description}
              </p>
            </div>
            <div className="card-actions">
              <button
                className="vote-me-btn"
                style={{ backgroundColor: props.categoryColor }}
              >
                Vote me
              </button>
            </div>
          </div>
          {/* <Container>
            <Row>
              <div className="col-7">
                <div
                  className="ratio ratio-16x9 bg-white border"
                  style={{ borderColor: '#707070', borderRadius: '12px' }}
                >
                  <div className="d-flex justify-content-center">
                    <img src={imgUrl} height="100%" alt="preview" />
                  </div>
                </div>
              </div>
              <div className="col-5 d-flex flex-column">
                <div className="flex-grow-1">
                  <p
                    className=""
                    style={{
                      color: '#171905',
                      fontSize: '24px',
                      lineHeight: '35px',
                    }}
                  >
                    {props.participant.description}
                  </p>
                  <h3
                    className="text-end"
                    style={{
                      color: '#171905',
                      fontSize: '60px',
                      lineHeight: '86px',
                    }}
                  >
                    {props.participant.name}
                  </h3>
                </div>
                <div className='d-flex justify-content-center'>
                  <Button onClick={handleVote} variant="info">Vote me</Button>
                </div>
              </div>
            </Row>
          </Container> */}
        </ModalBody>
      </Modal>
    </>
  );
}
