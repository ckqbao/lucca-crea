import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Row, Col, Button, Input, Label } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import BgImg from '@/assets/images/bg-login-2.jpg'
import Logo from '@/assets/images/Logo_Lucca_Crea_2021.png'

import Loading from '@/components/loaders/OverlaySpinner'

import { useLoginMutation } from '@/services/api/auth'
import { persistor } from '@/redux/store'

const loginFormSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
  remember: yup.boolean(),
})

type LoginFormValues = yup.InferType<typeof loginFormSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '', remember: false },
    resolver: yupResolver(loginFormSchema),
  })

  const [login, { isLoading }] = useLoginMutation()

  const handleLogin = async (values: LoginFormValues) => {
    const { access } = await login({ email: values.email, password: values.password }).unwrap()
    if (!values.remember) {
      persistor.pause()
      await persistor.flush()
      await persistor.purge()
    }
    if (access?.token) {
      navigate('/')
    }
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="container">
        <div className="landing-img">
          <img src={BgImg} alt="Background" style={{ width: '100%', objectFit: 'cover', height: '100%' }} />
        </div>

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
              <form onSubmit={handleSubmit(handleLogin)}>
                <Row className="mt-4">
                  <Label className="ps-0 text-primary" style={{ fontWeight: 500 }}>
                    Username
                  </Label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => <Input {...field} type="text" className="form-control form-control-login" placeholder={t('Username')} required />}
                  />
                </Row>
                <Row className="mt-2">
                  <Label className="ps-0 text-primary" style={{ fontWeight: 500 }}>
                    Password
                  </Label>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <Input {...field} type="password" className="form-control form-control-login" placeholder={t('Password')} required />
                    )}
                  />
                </Row>
                <Row className="mt-3 pb-2">
                  <Col className="form-check " style={{ fontWeight: 500 }}>
                    <Controller
                      control={control}
                      name="remember"
                      render={({ field }) => (
                        <Input
                          id={field.name}
                          name={field.name}
                          type="checkbox"
                          className="rounded-check"
                          style={{
                            borderRadius: 50,
                            width: '1.22em',
                            height: '1.2em',
                            padding: 7,
                          }}
                          checked={field.value}
                          onChange={(event) => field.onChange(event.target.checked)}
                        />
                      )}
                    />
                    <label className="form-check-label ms-1 text-primary" style={{ marginTop: 1 }} htmlFor="remember">
                      {t('Remember Me')}
                    </label>
                  </Col>
                  <Col className="ml-auto text-end text-primary p-0" style={{ fontWeight: 500 }}>
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
  )
}
