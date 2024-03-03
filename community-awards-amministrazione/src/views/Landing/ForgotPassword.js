import React, { useState } from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import BackgroundImg from '../../components/landing/BackgroundImg';

import { sendForgotPasswordLink } from '../../redux/store/actions/userActions';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();

  const handleForgotPassword = (e) => {
    e.preventDefault();

    let data = {};
    data.email = email;

    dispatch(sendForgotPasswordLink(data));
  };

  return (
    <div className="container">
      <BackgroundImg />

      <Row
        style={{ position: 'absolute', left: 0, margin: 0, width: '100%' }}
        className=" white-sq-container ps-5 pe-5 ps-md-0 pe-md-0"
      >
        <Col xl={4} md={6} className="mx-auto bg-white pt-2">
          <Row className="mb-5">
            <Col className="text-primary text-end">
              <Link to="/login">Go Back</Link>
            </Col>
          </Row>
          <Col className="p-5 pt-4">
            <Col className="ps-1 ps-md-5 pe-1 pe-md-5 pt-2 pt-md-4 pb-2 pb-md-4">
              <form onSubmit={handleForgotPassword}>
                <Row className="mt-4">
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control form-control-login"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Row>

                <Row className="mt-4">
                  <Button type="submit" color="primary">
                    Request Password Reset
                  </Button>
                </Row>
              </form>
            </Col>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
