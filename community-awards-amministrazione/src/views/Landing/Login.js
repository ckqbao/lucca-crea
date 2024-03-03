import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Label } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/common/OverlaySpinner';

import BackgroundImg from '../../components/landing/BackgroundImg';
import Logo from '../../assets/images/Logo_Lucca_Crea_2021.png';

import { userLogin } from '../../redux/store/actions/userActions';
import { resetLoading } from '../../redux/store/actions/commonActions';

import { useTranslation } from 'react-i18next';

import '../../assets/css/login.css';

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    fromweb: 1,
    remember: false,
  });

  useEffect(() => {
    dispatch(resetLoading());
  }, [dispatch]);

  const onChangeHandler = (e) => {
    const { name, value, type } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? !formState.remember : value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let data = {};

    data.password = formState.password;
    data.email = formState.email;
    data.fromweb = formState.fromweb;

    dispatch(userLogin(data, formState.remember)).then((data) => {
      if (data?.access?.token) {
        history.push('/categories');
      }
    });
  };

  const { t } = useTranslation();

  return (
    <>
      <Loading isLoading={userDetails.isLoading} />
      <div className="container">
        <BackgroundImg className="img-fluid" />

        <Row
          style={{
            position: 'absolute',
            left: 0,
            margin: 0,
            width: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          className="ps-5 pe-5 ps-md-0 pe-md-0"
        >
          <Col xl={4} md={6} className="mx-auto bg-red p-3 rounded">
            <Col className="px-1 pt-1 pb-2 px-md-4 py-md-4">
              <Row>
                <Col className="text-center px-5">
                  <img src={Logo} alt="Logo" className="w-25" />
                </Col>
              </Row>
              <form onSubmit={handleLogin}>
                <Row className="mt-4">
                  <Label
                    className="ps-0 text-primary"
                    style={{ fontWeight: 500 }}
                  >
                    Username
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control form-control-login"
                    placeholder={t('Username')}
                    value={formState.email}
                    onChange={onChangeHandler}
                    required
                  />
                </Row>
                <Row className="mt-2">
                  <Label
                    className="ps-0 text-primary"
                    style={{ fontWeight: 500 }}
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-login"
                    placeholder={t('Password')}
                    value={formState.password}
                    onChange={onChangeHandler}
                    required
                  />
                </Row>
                <Row className="mt-3 pb-2">
                  <Col className="form-check " style={{ fontWeight: 500 }}>
                    <Input
                      type="checkbox"
                      className="rounded-check"
                      id="remember"
                      name="remember"
                      style={{
                        borderRadius: 50,
                        width: '1.22em',
                        height: '1.2em',
                        padding: 7,
                      }}
                      checked={formState.remember}
                      onChange={onChangeHandler}
                    />
                    <label
                      className="form-check-label ms-1 text-primary"
                      style={{ marginTop: 1 }}
                      htmlFor="remember"
                    >
                      {t('Remember Me')}
                    </label>
                  </Col>
                  <Col
                    className="ml-auto text-end text-primary p-0"
                    style={{ fontWeight: 500 }}
                  >
                    <Link to="/forgot-password">{t('Lost Password?')}</Link>
                  </Col>
                </Row>
                <Input type="hidden" id="fromweb" name="fromweb" value="1" />
                <Row className="mt-4">
                  <Button type="submit" color="light">
                    {t('Login')}
                  </Button>
                </Row>
              </form>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
