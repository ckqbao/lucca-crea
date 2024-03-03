import { store } from '../redux/ConfigureStore'

const AuthenticateHelper = () => {
  let token = localStorage.getItem('token')

  if (!token) {
    const user = store.getState().user
    token = user.userDetails?.access?.token ? user.userDetails.access.token : ''
  }

  if (!token) {
    return false
  } else {
    return true
  }
}

export default AuthenticateHelper
