import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';
import request from '../../helpers/requestHelper';

import { useTranslation } from 'react-i18next';

const TicketsForm = () => {
  const { t } = useTranslation();

  const [barcode, setBarcode] = useState('');
  const [isValidTicket, setIsValidTicket] = useState(null);
  const [ticketDatas, setTicketDatas] = useState(null);
  const [error, setError] = useState(null);

  const checkTicketValidity = async (e) => {
    e.preventDefault();
    const res = await request({
      url: `tickets/${barcode}`,
      auth: true,
      method: 'GET',
    });
    if (!res.code) {
      setIsValidTicket(true);
      setTicketDatas(res.row?._attributes);
      setError(null);
    } else {
      setIsValidTicket(false);
      setTicketDatas(null);
      setError(res);
    }
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '50vh' }}
      >
        <Row>
          <Form onSubmit={checkTicketValidity}>
            <Col className="d-flex align-items-center justify-content-center">
              <FormGroup
                className="d-flex flex-row w-50"
                style={{ height: '40px' }}
              >
                <Input
                  type="text"
                  name="text"
                  id="ticketNumber"
                  placeholder={t('Enter ticket number...')}
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  required
                />
                <Button
                  style={{
                    width: '200px',
                    backgroundColor: '#F21A18',
                    border: '0',
                    marginLeft: '15px',
                  }}
                >
                  {t('Check ticket')}
                </Button>
              </FormGroup>
            </Col>
          </Form>
          {isValidTicket && ticketDatas ? (
            <div
              style={{
                border: '2px solid black',
                borderRadius: '20px',
                marginTop: '50px',
                padding: '25px',
              }}
            >
              <Container>
                <Row>
                  <Col
                    className="col-2 d-flex align-items-center justify-content-center"
                    style={{ borderRight: '2px dashed black' }}
                  >
                    <div
                      style={{
                        transform: 'rotate(90deg)',
                        marginRight: '50px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: `'barcode font', sans-serif`,
                          fontSize: '13em',
                        }}
                      >
                        {ticketDatas.barcode}
                      </p>
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-between align-items-center mx-3">
                    <div>
                      <h5>
                        <strong>ACCCTRLDATEFREE:</strong>
                      </h5>
                      <p>{ticketDatas.accctrldatefree}</p>
                      <h5>
                        <strong>LCCITY:</strong>
                      </h5>
                      <p>{ticketDatas.lccity}</p>
                      <h5>
                        <strong>LCNAME:</strong>
                      </h5>
                      <p>{ticketDatas.lcname}</p>
                      <h5>
                        <strong>MVMCTIME:</strong>
                      </h5>
                      <p>{ticketDatas.mvmctime}</p>
                      <h5>
                        <strong>MVMID:</strong>
                      </h5>
                      <p>{ticketDatas.mvmid}</p>
                      <h5>
                        <strong>MVMMTIME:</strong>
                      </h5>
                      <p>{ticketDatas.mvmmtime}</p>
                      <h5>
                        <strong>MVMQTY:</strong>
                      </h5>
                      <p>{ticketDatas.mvmqty}</p>
                    </div>
                    <div>
                      <h5>
                        <strong>MVMSTATUS:</strong>
                      </h5>
                      <p>{ticketDatas.mvmstatus}</p>
                      <h5>
                        <strong>OPRCODE:</strong>
                      </h5>
                      <p>{ticketDatas.oprcode}</p>
                      <h5>
                        <strong>OPREXTCODE:</strong>
                      </h5>
                      <p>{ticketDatas.oprextcode}</p>
                      <h5>
                        <strong>PRFACCRUALS:</strong>
                      </h5>
                      <p>{ticketDatas.prfaccruals}</p>
                      <h5>
                        <strong>PRFEND:</strong>
                      </h5>
                      <p>{ticketDatas.prfend}</p>
                      <h5>
                        <strong>PRFID:</strong>
                      </h5>
                      <p>{ticketDatas.prfid}</p>
                      <h5>
                        <strong>PRFID_EXT:</strong>
                      </h5>
                      <p>{ticketDatas.prfid_ext}</p>
                    </div>
                    <div>
                      <h5>
                        <strong>PRFSTART:</strong>
                      </h5>
                      <p>{ticketDatas.prfstart}</p>
                      <h5>
                        <strong>PRFTYPE:</strong>
                      </h5>
                      <p>{ticketDatas.prftype}</p>
                      <h5>
                        <strong>REDCODE:</strong>
                      </h5>
                      <p>{ticketDatas.redcode}</p>
                      <h5>
                        <strong>REDNAME:</strong>
                      </h5>
                      <p>{ticketDatas.redname}</p>
                      <h5>
                        <strong>RMCODE:</strong>
                      </h5>
                      <p>{ticketDatas.rmcode}</p>
                      <h5>
                        <strong>RMCODE_EXT:</strong>
                      </h5>
                      <p>{ticketDatas.rmcode_ext}</p>
                      <h5>
                        <strong>SHID:</strong>
                      </h5>
                      <p>{ticketDatas.shid}</p>
                    </div>
                    <div>
                      <h5>
                        <strong>TITLE:</strong>
                      </h5>
                      <p>{ticketDatas.title}</p>
                      <h5>
                        <strong>TKPRESALE:</strong>
                      </h5>
                      <p>{ticketDatas.tkpresale}</p>
                      <h5>
                        <strong>TKPRICE:</strong>
                      </h5>
                      <p>{ticketDatas.tkprice}</p>
                      <h5>
                        <strong>TKREDID:</strong>
                      </h5>
                      <p>{ticketDatas.tkredid}</p>
                      <h5>
                        <strong>TKZNCODE:</strong>
                      </h5>
                      <p>{ticketDatas.tkzncode}</p>
                      <h5>
                        <strong>TKZNDESC:</strong>
                      </h5>
                      <p>{ticketDatas.tkzndesc}</p>
                      <h5>
                        <strong>USEDACCRUALS:</strong>
                      </h5>
                      <p>{ticketDatas.usedaccruals}</p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            <div>
              {error ? (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                  <h1 className="text-danger">{t(error.message)}</h1>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center mt-5">
                  <h1>
                    {t('Enter a ticket code to view related information')}
                  </h1>
                </div>
              )}
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default TicketsForm;
