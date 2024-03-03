import React, { useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { Container } from 'reactstrap'
import { useSelector } from 'react-redux'

import Login from '../views/Landing/Login'
import ForgotPassword from '../views/Landing/ForgotPassword'

import Users from '../views/Main/Users'

import Header from '../components/common/Header'
import Loading from '../components/common/OverlaySpinner'

import request from '../helpers/requestHelper'
import AuthenticateHelper from '../helpers/authenticateHelper'
import Home from '../views/Main/Home'
import Categories from '../views/Main/Categories'
import Participants from '../views/Main/Participants'
import Votes from '../views/Main/Votes'

const Routes = (props) => {
  const authorization = AuthenticateHelper
  const userDetails = useSelector((state) => state.user)
  const isLoading = useSelector((state) => state.user.isLoading)
  const userError = useSelector((state) => state.user.errorMsg)
  const userDetails2 = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.user : null
  )

  const [userImg, setUserImg] = useState()
  const authRoutes = useMemo(
    () => [
      { routePath: '/', comp: Home, header: true },
      { routePath: '/categories', comp: Categories, header: true },
      {
        routePath: '/categories/:categoryId/participants',
        comp: Participants,
        header: true,
      },
      { routePath: '/users', comp: Users, header: true },
      { routePath: '/votes', comp: Votes, header: true },
    ],
    []
  )

  useEffect(() => {
    authorization()
  }, [userDetails])

  useEffect(() => {
    if (userError && userError.code === 401) {
      authorization()
    }
  }, [userError])

  // useEffect(() => {
  //   if (userDetails2) {
  //     getPicture(userDetails2.avatar);
  //   } else if (localStorage.getItem('avatar')) {
  //     getPicture(localStorage.getItem('avatar'));
  //   }
  // }, []);

  useEffect(() => {
    if (userDetails2) {
      getPicture(userDetails2.avatar)
    } else if (localStorage.getItem('avatar')) {
      getPicture(localStorage.getItem('avatar'))
    }
  }, [userDetails2])

  const getPicture = async (avatarName) => {
    if (avatarName) {
      const res = await request({
        url: `files/${avatarName}/type/avatar`,
        auth: true,
        method: 'GET',
      })
      if (!res.code) {
        var objectURL = URL.createObjectURL(res)
        setUserImg(objectURL)
      }
    }
  }

  if (authorization()) {
    return (
      <div>
        <Loading isLoading={isLoading} />
        <Router basename={'/'}>
          <Switch>
            {authRoutes.map((item, id) => {
              return (
                <Route key={id} exact path={item.routePath}>
                  <div>
                    <Header userImg={userImg} />
                    <Container>
                      <item.comp />
                    </Container>
                  </div>
                </Route>
              )
            })}
          </Switch>
        </Router>
      </div>
    )
  } else {
    return (
      <div>
        <Loading isLoading={isLoading} />
        <Router basename={'/'}>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>

            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default Routes
